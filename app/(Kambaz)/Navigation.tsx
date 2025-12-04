"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();
  return (
    <div
      className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      {/* Northeastern Logo */}
      <a
        className="list-group-item bg-black border-0 text-center py-3"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img
          src="/images/NEU.svg"
          width="65px"
          alt="Northeastern University"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(24%) sepia(90%) saturate(7482%) hue-rotate(355deg) brightness(95%) contrast(106%)",
          }}
        />
      </a>

      {/* Account */}
      <Link
        href="/Account/Signin"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname.includes("/Account") ? "bg-white" : "bg-black"
        }`}
        id="wd-account-link"
      >
        <div className="d-flex flex-column align-items-center">
          <FaRegCircleUser
            className={`mb-1 text-danger`}
            style={{ fontSize: "2.2rem" }}
          />
          <span
            className={
              pathname.includes("/Account") ? "text-danger" : "text-white"
            }
            style={{ fontSize: "14px" }}
          >
            Account
          </span>
        </div>
      </Link>

      {/* Dashboard */}
      <Link
        href="/Dashboard"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname === "/Dashboard" ? "bg-white" : "bg-black"
        }`}
        id="wd-dashboard-link"
      >
        <div className="d-flex flex-column align-items-center">
          <AiOutlineDashboard
            className={`mb-1 text-danger`}
            style={{ fontSize: "2.2rem" }}
          />
          <span
            className={pathname === "/Dashboard" ? "text-danger" : "text-white"}
            style={{ fontSize: "14px" }}
          >
            Dashboard
          </span>
        </div>
      </Link>

      {/* Courses */}
      <Link
        href="/Courses/1234/Home"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname.includes("/Courses") ? "bg-white" : "bg-black"
        }`}
        id="wd-course-link"
      >
        <div className="d-flex flex-column align-items-center">
          <LiaBookSolid
            className={`mb-1 text-danger`}
            style={{ fontSize: "2.2rem" }}
          />
          <span
            className={
              pathname.includes("/Courses") ? "text-danger" : "text-white"
            }
            style={{ fontSize: "14px" }}
          >
            Courses
          </span>
        </div>
      </Link>

      {/* Calendar */}
      <Link
        href="/Calendar"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname === "/Calendar" ? "bg-white" : "bg-black"
        }`}
        id="wd-calendar-link"
      >
        <div className="d-flex flex-column align-items-center">
          <IoCalendarOutline
            className={`mb-1 text-danger`}
            style={{ fontSize: "2.2rem" }}
          />
          <span
            className={pathname === "/Calendar" ? "text-danger" : "text-white"}
            style={{ fontSize: "14px" }}
          >
            Calendar
          </span>
        </div>
      </Link>

      {/* Inbox */}
      <Link
        href="/Inbox"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname === "/Inbox" ? "bg-white" : "bg-black"
        }`}
        id="wd-inbox-link"
      >
        <div className="d-flex flex-column align-items-center">
          <FaInbox
            className={`mb-1 text-danger`}
            style={{ fontSize: "2.2rem" }}
          />
          <span
            className={pathname === "/Inbox" ? "text-danger" : "text-white"}
            style={{ fontSize: "14px" }}
          >
            Inbox
          </span>
        </div>
      </Link>

      {/* Labs */}
      <Link
        href="/Labs"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname.includes("/Labs") ? "bg-white" : "bg-black"
        }`}
        id="wd-labs-link"
      >
        <div className="d-flex flex-column align-items-center">
          <MdOutlineScience
            className={`mb-1 text-danger`}
            style={{ fontSize: "2.2rem" }}
          />
          <span
            className={
              pathname.includes("/Labs") ? "text-danger" : "text-white"
            }
            style={{ fontSize: "14px" }}
          >
            Labs
          </span>
        </div>
      </Link>
    </div>
  );
}
