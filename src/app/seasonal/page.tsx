import type { Metadata } from "next";
import SeasonalCalendar from "@/components/SeasonalCalendar";

export const metadata: Metadata = {
  title: "Seasonal Calendar — What's in Season — TasteBud",
  description:
    "Discover what's in season month by month in Oklahoma and the Southern US. Peak ingredients, cooking notes, and harvest timing for your region.",
};

export default function SeasonalPage() {
  return <SeasonalCalendar />;
}
