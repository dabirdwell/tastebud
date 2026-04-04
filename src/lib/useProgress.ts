"use client";

import { useState, useEffect, useCallback } from "react";

export interface UserProgress {
  recipesViewed: string[];
  flavorCardsStudied: string[];
  mentorConversations: { mentorId: string; count: number }[];
  pantryItems: string[];
  flavorMapCompleted: boolean;
  tourCompleted: boolean;
  firstVisit: string;
  lastVisit: string;
}

const STORAGE_KEY = "tastebud_progress";

const DEFAULT_PROGRESS: UserProgress = {
  recipesViewed: [],
  flavorCardsStudied: [],
  mentorConversations: [],
  pantryItems: [],
  flavorMapCompleted: false,
  tourCompleted: false,
  firstVisit: new Date().toISOString(),
  lastVisit: new Date().toISOString(),
};

function loadProgress(): UserProgress {
  if (typeof window === "undefined") return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS, firstVisit: new Date().toISOString() };
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // storage full or unavailable
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const p = loadProgress();
    p.lastVisit = new Date().toISOString();
    saveProgress(p);
    setProgress(p);
    setLoaded(true);
  }, []);

  const update = useCallback((updater: (prev: UserProgress) => UserProgress) => {
    setProgress((prev) => {
      const next = updater(prev);
      next.lastVisit = new Date().toISOString();
      saveProgress(next);
      return next;
    });
  }, []);

  const trackRecipe = useCallback(
    (recipeId: string) =>
      update((p) => ({
        ...p,
        recipesViewed: p.recipesViewed.includes(recipeId)
          ? p.recipesViewed
          : [...p.recipesViewed, recipeId],
      })),
    [update]
  );

  const trackFlavorCard = useCallback(
    (cardId: string) =>
      update((p) => ({
        ...p,
        flavorCardsStudied: p.flavorCardsStudied.includes(cardId)
          ? p.flavorCardsStudied
          : [...p.flavorCardsStudied, cardId],
      })),
    [update]
  );

  const trackMentorChat = useCallback(
    (mentorId: string) =>
      update((p) => {
        const existing = p.mentorConversations.find((m) => m.mentorId === mentorId);
        if (existing) {
          return {
            ...p,
            mentorConversations: p.mentorConversations.map((m) =>
              m.mentorId === mentorId ? { ...m, count: m.count + 1 } : m
            ),
          };
        }
        return {
          ...p,
          mentorConversations: [...p.mentorConversations, { mentorId, count: 1 }],
        };
      }),
    [update]
  );

  const trackPantryItem = useCallback(
    (item: string) =>
      update((p) => ({
        ...p,
        pantryItems: p.pantryItems.includes(item)
          ? p.pantryItems
          : [...p.pantryItems, item],
      })),
    [update]
  );

  const setFlavorMapCompleted = useCallback(
    () => update((p) => ({ ...p, flavorMapCompleted: true })),
    [update]
  );

  const setTourCompleted = useCallback(
    () => update((p) => ({ ...p, tourCompleted: true })),
    [update]
  );

  return {
    progress,
    loaded,
    trackRecipe,
    trackFlavorCard,
    trackMentorChat,
    trackPantryItem,
    setFlavorMapCompleted,
    setTourCompleted,
  };
}
