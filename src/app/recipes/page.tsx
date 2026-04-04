import type { Metadata } from "next";
import RecipeExplorer from "@/components/RecipeExplorer";

export const metadata: Metadata = {
  title: "Recipes — TasteBud",
  description:
    "Explore recipes from around the world and see how their ingredients create unique flavor profiles.",
};

export default function RecipesPage() {
  return <RecipeExplorer />;
}
