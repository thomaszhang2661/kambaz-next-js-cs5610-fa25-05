import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import MobileNavigation from "../../MobileNavigation";
import { FaAlignJustify } from "react-icons/fa";
import { courses } from "../../Database";

type Course = { _id?: string; id?: string; name?: string };

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const course = courses.find((c: Course) => c._id === cid || c.id === cid);
  return (
    <div id="wd-courses">
      <MobileNavigation courseId={cid} />
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course ? course.name : `Course ${cid}`}
      </h2>
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
