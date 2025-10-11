import { redirect } from "next/navigation";
import { courses } from "../Database";

type Course = { _id?: string; id?: string };

export default function CoursesIndex() {
  const first = courses && courses.length ? (courses[0] as Course) : null;
  if (!first) {
    // nothing to show — fall back to Dashboard
    redirect("/Dashboard");
  }
  const id = first?._id || first?.id || "";
  // redirect to the first course's Home
  redirect(`/Courses/${id}/Home`);
}
