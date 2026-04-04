import type { Metadata } from "next";
import ProfileDashboard from "@/components/ProfileDashboard";

export const metadata: Metadata = {
  title: "My Progress — TasteBud",
  description:
    "Track your culinary education journey — recipes explored, flavor cards studied, mentor conversations, and more.",
};

export default function ProfilePage() {
  return <ProfileDashboard />;
}
