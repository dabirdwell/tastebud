import type { Metadata } from "next";
import FlavorMap from "@/components/FlavorMap";

export const metadata: Metadata = {
  title: "Flavor Map — TasteBud",
  description:
    "Interactive radar chart mapping six taste axes — discover which cuisines and ingredients match your palate.",
};

export default function FlavorMapPage() {
  return <FlavorMap />;
}
