import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import MobileNavigation from "../../MobileNavigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { redirect } from "next/navigation";

async function fetchCourses() {
  const origin = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
  const res = await fetch(`${origin}/api/courses`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

type Course = { _id?: string; id?: string; name?: string };

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const courses = await fetchCourses();
  const course = courses.find((c: Course) => c._id === cid || c.id === cid);
  if (!course) {
    // if course id not found, redirect to Dashboard
    redirect("/Dashboard");
  }
  return (
    <div id="wd-courses">
      <MobileNavigation courseId={cid} />
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`}
      </h2>
      <Breadcrumb course={course} />
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
