import type { Metadata } from "next";
import CurriculumHub from "@/components/CurriculumHub";

export const metadata: Metadata = {
  title: "Learn — Curriculum — TasteBud",
  description:
    "5 modules, 15 lessons, and 25 challenges covering taste foundations, flavor combinations, cooking techniques, world cuisines, and recipe creation.",
};

export default function LearnPage() {
  return <CurriculumHub />;
}
