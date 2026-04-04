import type { Metadata } from "next";
import MealPlanner from "@/components/MealPlanner";

export const metadata: Metadata = {
  title: "Meal Planner — TasteBud",
  description:
    "Plan your weekly meals with recipes from around the world. Drag, drop, and discover new flavor combinations.",
};

export default function PlannerPage() {
  return <MealPlanner />;
}
