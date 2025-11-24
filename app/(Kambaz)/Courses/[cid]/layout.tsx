"use client";
import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import MobileNavigation from "../../MobileNavigation";
import { FaAlignJustify } from "react-icons/fa";
import Breadcrumb from "./Breadcrumb";
import { redirect } from "next/navigation";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type Course = { _id?: string; id?: string; name?: string };

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((c: Course) => c._id === cid || c.id === cid);

  if (!course) {
    // if course id not found, redirect to Dashboard
    redirect("/Dashboard");
  }

  return (
    <div id="wd-courses">
      <MobileNavigation courseId={cid as string} />
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
