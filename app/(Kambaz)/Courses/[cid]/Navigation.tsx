"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";

  const links = [
    { label: "Home", path: "Home" },
    { label: "Modules", path: "Modules" },
    { label: "Piazza", path: "Piazza" },
    { label: "Zoom", path: "Zoom" },
    { label: "Assignments", path: "Assignments" },
    { label: "Quizzes", path: "Quizzes" },
    { label: "Grades", path: "Grades" },
    { label: "People", path: "People" },
  ];

  // derive the current section segment from pathname: /Courses/<cid>/<section>
  const parts = pathname.split("/").filter(Boolean); // ['Courses','<cid>','<section>']
  const currentSection = parts.length >= 3 ? parts[2] : "";

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = `/Courses/${cid}/${link.path}`;
        const sectionSegment = link.path.split("/")[0];
        const isActive =
          (sectionSegment.toLowerCase() === "home" &&
            (currentSection === "" ||
              currentSection.toLowerCase() === "home")) ||
          currentSection.toLowerCase() === sectionSegment.toLowerCase();
        const id = `wd-course-${link.label.toLowerCase()}-link`;
        return (
          <div key={href}>
            <Link
              href={href}
              id={id}
              className={`list-group-item border-0 ${
                isActive ? "active" : "text-danger"
              }`}
            >
              {link.label}
            </Link>
            <br />
          </div>
        );
      })}
    </div>
  );
}
