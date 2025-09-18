"use client";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div className="wd-assignment-details">
            <div>
              Multiple Modules | <strong>Not available until</strong> May 6 at
              12:00am
            </div>
            <div>
              <strong>Due</strong> May 13 at 11:59pm | 100 pts
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/124"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-details">
            <div>
              Multiple Modules | <strong>Not available until</strong> May 13 at
              12:00am
            </div>
            <div>
              <strong>Due</strong> May 20 at 11:59pm | 100 pts
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/125"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </Link>
          <div className="wd-assignment-details">
            <div>
              Multiple Modules | <strong>Not available until</strong> May 20 at
              12:00am
            </div>
            <div>
              <strong>Due</strong> May 27 at 11:59pm | 100 pts
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/126"
            className="wd-assignment-link"
          >
            A4 - STATE + REDUX
          </Link>
          <div className="wd-assignment-details">
            <div>
              Multiple Modules | <strong>Not available until</strong> May 27 at
              12:00am
            </div>
            <div>
              <strong>Due</strong> Jun 3 at 11:59pm | 100 pts
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/127"
            className="wd-assignment-link"
          >
            A5 - NODE + SESSION
          </Link>
          <div className="wd-assignment-details">
            <div>
              Multiple Modules | <strong>Not available until</strong> Jun 3 at
              12:00am
            </div>
            <div>
              <strong>Due</strong> Jun 10 at 11:59pm | 100 pts
            </div>
          </div>
        </li>

        <li className="wd-assignment-list-item">
          <Link
            href="/Courses/1234/Assignments/128"
            className="wd-assignment-link"
          >
            A6 - MONGO + MONGOOSE
          </Link>
          <div className="wd-assignment-details">
            <div>
              Multiple Modules | <strong>Not available until</strong> Jun 10 at
              12:00am
            </div>
            <div>
              <strong>Due</strong> Jun 17 at 11:59pm | 100 pts
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}
