import type { Metadata } from "next";
import PantryMode from "@/components/PantryMode";

export const metadata: Metadata = {
  title: "Pantry Mode — TasteBud",
  description:
    "Select the ingredients you have on hand and discover recipes you can make with your pantry.",
};

export default function PantryPage() {
  return <PantryMode />;
}
