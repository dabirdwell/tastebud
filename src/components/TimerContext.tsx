"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";

export interface Timer {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  status: "idle" | "running" | "paused" | "done";
}

export interface TimerChain {
  id: string;
  name: string;
  steps: { name: string; duration: number }[];
  currentStep: number;
}

interface TimerContextValue {
  timers: Timer[];
  chains: TimerChain[];
  addTimer: (name: string, duration: number) => void;
  removeTimer: (id: string) => void;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  resetTimer: (id: string) => void;
  addChain: (name: string, steps: { name: string; duration: number }[]) => void;
  removeChain: (id: string) => void;
  startChain: (id: string) => void;
}

const TimerContext = createContext<TimerContextValue | null>(null);

export function useTimers() {
  const ctx = useContext(TimerContext);
  if (!ctx) throw new Error("useTimers must be used within TimerProvider");
  return ctx;
}

let nextId = 1;

function playBeep() {
  try {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 440;
    osc.type = "sine";
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.8);
    // Play a second beep after a short gap
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.frequency.value = 440;
    osc2.type = "sine";
    gain2.gain.setValueAtTime(0.3, ctx.currentTime + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.1);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.3);
    osc2.stop(ctx.currentTime + 1.1);
  } catch {
    // Web Audio not available
  }
}

export function TimerProvider({ children }: { children: React.ReactNode }) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [chains, setChains] = useState<TimerChain[]>([]);
  const intervalsRef = useRef<Map<string, ReturnType<typeof setInterval>>>(
    new Map()
  );

  const clearTimerInterval = useCallback((id: string) => {
    const interval = intervalsRef.current.get(id);
    if (interval) {
      clearInterval(interval);
      intervalsRef.current.delete(id);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    const intervals = intervalsRef.current;
    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, []);

  const startTicking = useCallback(
    (id: string) => {
      clearTimerInterval(id);
      const interval = setInterval(() => {
        setTimers((prev) => {
          const idx = prev.findIndex((t) => t.id === id);
          if (idx === -1) {
            clearTimerInterval(id);
            return prev;
          }
          const timer = prev[idx];
          if (timer.remaining <= 1) {
            clearTimerInterval(id);
            playBeep();
            // Check if this timer is part of a chain
            setChains((prevChains) => {
              const chainIdx = prevChains.findIndex((c) =>
                c.steps.some(
                  (s, i) =>
                    i === c.currentStep &&
                    s.name === timer.name &&
                    s.duration === timer.duration
                )
              );
              if (chainIdx === -1) return prevChains;
              const chain = prevChains[chainIdx];
              const nextStep = chain.currentStep + 1;
              if (nextStep < chain.steps.length) {
                // Start next step
                const step = chain.steps[nextStep];
                const nextTimerId = `timer-${nextId++}`;
                const newTimer: Timer = {
                  id: nextTimerId,
                  name: step.name,
                  duration: step.duration,
                  remaining: step.duration,
                  status: "running",
                };
                setTimers((pt) => [...pt, newTimer]);
                // Schedule ticking for next timer
                setTimeout(() => startTicking(nextTimerId), 0);
                return prevChains.map((c, i) =>
                  i === chainIdx ? { ...c, currentStep: nextStep } : c
                );
              } else {
                // Chain complete, remove it
                return prevChains.filter((_, i) => i !== chainIdx);
              }
            });
            const updated = [...prev];
            updated[idx] = { ...timer, remaining: 0, status: "done" };
            return updated;
          }
          const updated = [...prev];
          updated[idx] = {
            ...timer,
            remaining: timer.remaining - 1,
            status: "running",
          };
          return updated;
        });
      }, 1000);
      intervalsRef.current.set(id, interval);
    },
    [clearTimerInterval]
  );

  const addTimer = useCallback((name: string, duration: number) => {
    const id = `timer-${nextId++}`;
    setTimers((prev) => [
      ...prev,
      { id, name, duration, remaining: duration, status: "idle" },
    ]);
  }, []);

  const removeTimer = useCallback(
    (id: string) => {
      clearTimerInterval(id);
      setTimers((prev) => prev.filter((t) => t.id !== id));
    },
    [clearTimerInterval]
  );

  const startTimer = useCallback(
    (id: string) => {
      setTimers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "running" as const } : t))
      );
      startTicking(id);
    },
    [startTicking]
  );

  const pauseTimer = useCallback(
    (id: string) => {
      clearTimerInterval(id);
      setTimers((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "paused" as const } : t))
      );
    },
    [clearTimerInterval]
  );

  const resetTimer = useCallback(
    (id: string) => {
      clearTimerInterval(id);
      setTimers((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, remaining: t.duration, status: "idle" as const }
            : t
        )
      );
    },
    [clearTimerInterval]
  );

  const addChain = useCallback(
    (name: string, steps: { name: string; duration: number }[]) => {
      if (steps.length === 0) return;
      const chainId = `chain-${nextId++}`;
      setChains((prev) => [...prev, { id: chainId, name, steps, currentStep: 0 }]);
      // Add first timer
      const timerId = `timer-${nextId++}`;
      const first = steps[0];
      setTimers((prev) => [
        ...prev,
        {
          id: timerId,
          name: first.name,
          duration: first.duration,
          remaining: first.duration,
          status: "idle",
        },
      ]);
    },
    []
  );

  const removeChain = useCallback(
    (id: string) => {
      setChains((prev) => prev.filter((c) => c.id !== id));
    },
    []
  );

  const startChain = useCallback(
    (id: string) => {
      const chain = chains.find((c) => c.id === id);
      if (!chain) return;
      const step = chain.steps[chain.currentStep];
      // Find the matching idle timer for this chain step
      const timer = timers.find(
        (t) =>
          t.name === step.name &&
          t.duration === step.duration &&
          t.status === "idle"
      );
      if (timer) {
        startTimer(timer.id);
      }
    },
    [chains, timers, startTimer]
  );

  return (
    <TimerContext.Provider
      value={{
        timers,
        chains,
        addTimer,
        removeTimer,
        startTimer,
        pauseTimer,
        resetTimer,
        addChain,
        removeChain,
        startChain,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}
