import type { Metadata } from "next";
import { JobsView } from "@/components/jobs/JobsView";

export const metadata: Metadata = {
  title: "Open Roles",
  description: "Careers at Shri Maa Group: current openings and general applications across operations, sales, trade, technology and finance.",
  openGraph: {
    title: "Open Roles at SMG",
    description: "Join one of India's most dynamic commerce and distribution organizations.",
  },
  alternates: {
    canonical: "/jobs",
  },
};

export default function JobsPage() {
  return <JobsView />;
}
