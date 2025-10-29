"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Labs() {
  const pathname = usePathname() || "";

  const makeClass = (path: string) =>
    `nav-link ${pathname === path ? "active" : ""}`;

  return (
    <div id="wd-labs" className="container py-3">
      <h1>Labs</h1>
      <h2>Student: Jian Zhang</h2>

      <ul className="nav nav-pills">
        <li className="nav-item">
          <Link
            href="/Labs/Lab1"
            id="wd-lab1-link"
            className={makeClass("/Labs/Lab1")}
          >
            Lab 1: HTML Examples
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/Labs/Lab2"
            id="wd-lab2-link"
            className={makeClass("/Labs/Lab2")}
          >
            Lab 2: CSS Basics
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/Labs/Lab3"
            id="wd-lab3-link"
            className={makeClass("/Labs/Lab3")}
          >
            Lab 3: JavaScript Fundamentals
          </Link>
        </li>
        <li className="nav-item">
          <Link
            href="/Labs/Lab4"
            id="wd-lab4-link"
            className={makeClass("/Labs/Lab4")}
          >
            Lab 4: Maintaining State
          </Link>
        </li>
      </ul>
    </div>
  );
}
