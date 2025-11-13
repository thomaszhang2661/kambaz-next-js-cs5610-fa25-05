import { redirect } from "next/navigation";

type Course = { _id?: string; id?: string };

async function fetchCourses(): Promise<Course[]> {
  const origin = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
  const res = await fetch(`${origin}/api/courses`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function CoursesIndex() {
  const courses = await fetchCourses();
  const first = courses && courses.length ? (courses[0] as Course) : null;
  if (!first) {
    // nothing to show — fall back to Dashboard
    redirect("/Dashboard");
  }
  const id = first?._id || first?.id || "";
  // redirect to the first course's Home
  redirect(`/Courses/${id}/Home`);
}
