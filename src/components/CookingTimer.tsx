"use client";

import { useState, useRef } from "react";
import { useTimers } from "./TimerContext";

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

function parseTimeInput(value: string): number {
  // Accept "5" (minutes), "5:00", "5m", "90s", "1h30m"
  const trimmed = value.trim();
  // Try mm:ss
  const mmss = trimmed.match(/^(\d+):(\d+)$/);
  if (mmss) return parseInt(mmss[1]) * 60 + parseInt(mmss[2]);
  // Try 1h30m, 5m, 90s patterns
  const hms = trimmed.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (hms && (hms[1] || hms[2] || hms[3])) {
    return (
      (parseInt(hms[1] || "0") * 3600) +
      (parseInt(hms[2] || "0") * 60) +
      parseInt(hms[3] || "0")
    );
  }
  // Plain number = minutes
  const num = parseFloat(trimmed);
  if (!isNaN(num)) return Math.round(num * 60);
  return 0;
}

const PRESET_CHAINS = [
  {
    name: "Steak Dinner",
    steps: [
      { name: "Sear", duration: 180 },
      { name: "Rest", duration: 300 },
      { name: "Sauce", duration: 480 },
    ],
  },
  {
    name: "Pasta",
    steps: [
      { name: "Boil Water", duration: 600 },
      { name: "Cook Pasta", duration: 480 },
      { name: "Sauce Simmer", duration: 300 },
    ],
  },
  {
    name: "Soft Boiled Egg",
    steps: [
      { name: "Boil", duration: 390 },
      { name: "Ice Bath", duration: 120 },
    ],
  },
];

export default function CookingTimer() {
  const {
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
  } = useTimers();

  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"timers" | "chains">("timers");
  const [newName, setNewName] = useState("");
  const [newDuration, setNewDuration] = useState("");

  // Chain builder
  const [chainName, setChainName] = useState("");
  const [chainSteps, setChainSteps] = useState<
    { name: string; duration: string }[]
  >([{ name: "", duration: "" }]);

  const panelRef = useRef<HTMLDivElement>(null);

  const activeCount = timers.filter(
    (t) => t.status === "running" || t.status === "paused"
  ).length;
  const doneCount = timers.filter((t) => t.status === "done").length;

  function handleAddTimer(e: React.FormEvent) {
    e.preventDefault();
    const secs = parseTimeInput(newDuration);
    if (!newName.trim() || secs <= 0) return;
    addTimer(newName.trim(), secs);
    setNewName("");
    setNewDuration("");
  }

  function handleAddChain(e: React.FormEvent) {
    e.preventDefault();
    const steps = chainSteps
      .map((s) => ({ name: s.name.trim(), duration: parseTimeInput(s.duration) }))
      .filter((s) => s.name && s.duration > 0);
    if (!chainName.trim() || steps.length === 0) return;
    addChain(chainName.trim(), steps);
    setChainName("");
    setChainSteps([{ name: "", duration: "" }]);
  }

  function updateChainStep(
    idx: number,
    field: "name" | "duration",
    value: string
  ) {
    setChainSteps((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  }

  function addChainStep() {
    setChainSteps((prev) => [...prev, { name: "", duration: "" }]);
  }

  function removeChainStep(idx: number) {
    setChainSteps((prev) => prev.filter((_, i) => i !== idx));
  }

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-copper px-5 py-3 text-background font-medium shadow-lg transition-all hover:bg-copper-light hover:scale-105 active:scale-95"
        aria-label="Toggle cooking timers"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span className="hidden sm:inline">Timers</span>
        {activeCount > 0 && (
          <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-saffron text-xs text-background font-bold">
            {activeCount}
          </span>
        )}
        {doneCount > 0 && (
          <span className="ml-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold animate-pulse">
            {doneCount}
          </span>
        )}
      </button>

      {/* Timer panel */}
      {open && (
        <div
          ref={panelRef}
          className="fixed bottom-20 right-6 z-50 w-[360px] max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-surface shadow-2xl"
        >
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-4 py-3">
            <h2 className="text-lg font-bold text-copper">Cooking Timers</h2>
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-1 text-foreground/50 hover:bg-surface-light hover:text-foreground transition-colors"
              aria-label="Close timer panel"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setTab("timers")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === "timers"
                  ? "text-copper border-b-2 border-copper"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Timers
            </button>
            <button
              onClick={() => setTab("chains")}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                tab === "chains"
                  ? "text-copper border-b-2 border-copper"
                  : "text-foreground/50 hover:text-foreground"
              }`}
            >
              Chains
            </button>
          </div>

          <div className="p-4 space-y-4">
            {tab === "timers" && (
              <>
                {/* Add timer form */}
                <form onSubmit={handleAddTimer} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-copper"
                  />
                  <input
                    type="text"
                    placeholder="5m"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-20 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-copper"
                    title="Examples: 5 (min), 5:00, 5m, 90s, 1h30m"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-copper px-3 py-2 text-sm font-medium text-background hover:bg-copper-light transition-colors"
                  >
                    +
                  </button>
                </form>

                {/* Timer cards */}
                {timers.length === 0 && (
                  <p className="text-center text-sm text-foreground/40 py-6">
                    No timers yet. Add one above!
                  </p>
                )}

                {timers.map((timer) => {
                  const progress =
                    timer.duration > 0
                      ? ((timer.duration - timer.remaining) / timer.duration) *
                        100
                      : 0;
                  const isDone = timer.status === "done";
                  const isRunning = timer.status === "running";

                  return (
                    <div
                      key={timer.id}
                      className={`rounded-xl border p-4 transition-colors ${
                        isDone
                          ? "border-saffron/50 bg-saffron/5 animate-pulse"
                          : "border-border bg-surface-light"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium ${
                            isDone ? "text-saffron" : "text-foreground/70"
                          }`}
                        >
                          {timer.name}
                        </span>
                        <button
                          onClick={() => removeTimer(timer.id)}
                          className="text-foreground/30 hover:text-red-400 transition-colors"
                          aria-label="Remove timer"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>

                      {/* Big countdown */}
                      <div
                        className={`text-center font-mono text-4xl font-bold tracking-wider ${
                          isDone
                            ? "text-saffron"
                            : isRunning
                            ? "text-copper-light"
                            : "text-foreground"
                        }`}
                      >
                        {formatTime(timer.remaining)}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-1.5 rounded-full bg-background overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            isDone ? "bg-saffron" : "bg-copper"
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>

                      {/* Controls */}
                      <div className="mt-3 flex items-center justify-center gap-2">
                        {(timer.status === "idle" ||
                          timer.status === "paused") && (
                          <button
                            onClick={() => startTimer(timer.id)}
                            className="rounded-lg bg-copper/20 px-4 py-1.5 text-sm font-medium text-copper hover:bg-copper/30 transition-colors"
                          >
                            {timer.status === "paused" ? "Resume" : "Start"}
                          </button>
                        )}
                        {timer.status === "running" && (
                          <button
                            onClick={() => pauseTimer(timer.id)}
                            className="rounded-lg bg-amber/20 px-4 py-1.5 text-sm font-medium text-amber hover:bg-amber/30 transition-colors"
                          >
                            Pause
                          </button>
                        )}
                        <button
                          onClick={() => resetTimer(timer.id)}
                          className="rounded-lg bg-foreground/10 px-4 py-1.5 text-sm font-medium text-foreground/60 hover:bg-foreground/20 hover:text-foreground transition-colors"
                        >
                          Reset
                        </button>
                        {isDone && (
                          <span className="text-xs font-medium text-saffron">
                            Done!
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {tab === "chains" && (
              <>
                {/* Presets */}
                <div>
                  <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider mb-2">
                    Quick Presets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {PRESET_CHAINS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => addChain(preset.name, preset.steps)}
                        className="rounded-lg border border-border bg-surface-light px-3 py-1.5 text-xs font-medium text-foreground/70 hover:border-copper hover:text-copper transition-colors"
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chain builder */}
                <form onSubmit={handleAddChain} className="space-y-3">
                  <p className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                    Build a Chain
                  </p>
                  <input
                    type="text"
                    placeholder="Chain name"
                    value={chainName}
                    onChange={(e) => setChainName(e.target.value)}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-copper"
                  />
                  {chainSteps.map((step, i) => (
                    <div key={i} className="flex gap-2 items-center">
                      {i > 0 && (
                        <span className="text-copper text-xs font-bold">
                          &rarr;
                        </span>
                      )}
                      <input
                        type="text"
                        placeholder="Step name"
                        value={step.name}
                        onChange={(e) =>
                          updateChainStep(i, "name", e.target.value)
                        }
                        className="flex-1 rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-copper"
                      />
                      <input
                        type="text"
                        placeholder="3m"
                        value={step.duration}
                        onChange={(e) =>
                          updateChainStep(i, "duration", e.target.value)
                        }
                        className="w-16 rounded-lg border border-border bg-background px-2 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-copper"
                      />
                      {chainSteps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeChainStep(i)}
                          className="text-foreground/30 hover:text-red-400"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={addChainStep}
                      className="rounded-lg border border-dashed border-border px-3 py-1.5 text-xs text-foreground/50 hover:border-copper hover:text-copper transition-colors"
                    >
                      + Add Step
                    </button>
                    <button
                      type="submit"
                      className="rounded-lg bg-copper px-3 py-1.5 text-xs font-medium text-background hover:bg-copper-light transition-colors"
                    >
                      Create Chain
                    </button>
                  </div>
                </form>

                {/* Active chains */}
                {chains.map((chain) => (
                  <div
                    key={chain.id}
                    className="rounded-xl border border-border bg-surface-light p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-copper">
                        {chain.name}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startChain(chain.id)}
                          className="text-xs text-copper hover:text-copper-light transition-colors"
                        >
                          Start
                        </button>
                        <button
                          onClick={() => removeChain(chain.id)}
                          className="text-foreground/30 hover:text-red-400 transition-colors"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {chain.steps.map((step, i) => (
                        <span key={i} className="flex items-center gap-1">
                          {i > 0 && (
                            <span className="text-foreground/30 text-xs">
                              &rarr;
                            </span>
                          )}
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              i < chain.currentStep
                                ? "bg-copper/20 text-copper line-through"
                                : i === chain.currentStep
                                ? "bg-copper text-background font-medium"
                                : "bg-foreground/10 text-foreground/50"
                            }`}
                          >
                            {step.name} ({formatTime(step.duration)})
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
