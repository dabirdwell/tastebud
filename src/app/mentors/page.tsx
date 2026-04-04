import type { Metadata } from "next";
import MentorProfiles from "@/components/MentorProfiles";

export const metadata: Metadata = {
  title: "Cooking Mentors — TasteBud",
  description:
    "Choose from five AI cooking mentors — Julia Child, Jacques Pépin, Anthony Bourdain, Ferran Adrià, and Massimo Bottura — each with a unique teaching philosophy.",
};

export default function MentorsPage() {
  return <MentorProfiles />;
}
