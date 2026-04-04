import type { Metadata } from "next";
import ShoppingList from "@/components/ShoppingList";

export const metadata: Metadata = {
  title: "Shopping List — TasteBud",
  description:
    "Auto-generated shopping list from your meal plan. Ingredients grouped by category with smart pantry deduction.",
};

export default function ShoppingPage() {
  return <ShoppingList />;
}
