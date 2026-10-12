/**
 * Open roles shown on /jobs. Add real openings from HR here; while the list is
 * empty the page invites a general application instead of showing roles.
 *
 * Every role needs responsibilities, experience, location and level.
 */
export type Job = {
  id: string;
  title: string;
  dept: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  level: string;
  experience: string;
  summary: string;
  responsibilities: string[];
};

export const JOBS: Job[] = [];
