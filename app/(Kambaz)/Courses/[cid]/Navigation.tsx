"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "People/Table",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const pathSegment = label;
        const href = `/Courses/${cid}/${pathSegment}`;
        const isActive = pathname.includes(`/${pathSegment.split("/")[0]}`);
        const display = label.includes("/") ? label.split("/")[0] : label;
        return (
          <div key={href}>
            <Link
              href={href}
              id={`wd-course-${display.toLowerCase()}-link`}
              className={`list-group-item border-0 ${
                isActive ? "active" : "text-danger"
              }`}
            >
              {display}
            </Link>
            <br />
          </div>
        );
      })}
    </div>
  );
}
