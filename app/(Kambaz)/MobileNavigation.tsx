"use client";

import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "./store";

interface MobileNavigationProps {
  courseId?: string;
}

export default function MobileNavigation({ courseId }: MobileNavigationProps) {
  const [showKambazNav, setShowKambazNav] = useState(false);
  const [showCourseNav, setShowCourseNav] = useState(false);
  const pathname = usePathname();
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );

  // Determine Account link destination based on login status
  const accountHref = currentUser ? "/Account/Profile" : "/Account/Signin";

  const courseLinks = [
    { href: `/Courses/${courseId}/Home`, label: "Home" },
    { href: `/Courses/${courseId}/Modules`, label: "Modules" },
    { href: `/Courses/${courseId}/Piazza`, label: "Piazza" },
    { href: `/Courses/${courseId}/Zoom`, label: "Zoom Meetings" },
    { href: `/Courses/${courseId}/Assignments`, label: "Assignments" },
    { href: `/Courses/${courseId}/Quizzes`, label: "Quizzes" },
    { href: `/Courses/${courseId}/Grades`, label: "Grades" },
    { href: `/Courses/${courseId}/People`, label: "People" },
    { href: `/Courses/${courseId}/Settings`, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Navigation Bar - Only visible on small screens */}
      <div
        className="d-md-none bg-black text-white p-2 fixed-top d-flex justify-content-between align-items-center"
        style={{ zIndex: 1050, height: "50px" }}
      >
        <button
          className="btn btn-link text-white p-0"
          onClick={() => setShowKambazNav(true)}
        >
          <FaBars size={20} />
        </button>

        <div className="text-center">
          <Image
            src="/images/NEU.svg"
            alt="NEU"
            width={30}
            height={30}
            style={{
              filter:
                "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(83%) contrast(87%)",
            }}
          />
        </div>

        {courseId && (
          <button
            className="btn btn-link text-white p-0"
            onClick={() => setShowCourseNav(true)}
          >
            <HiOutlineDotsVertical size={20} />
          </button>
        )}

        {!courseId && <div style={{ width: "20px" }}></div>}
      </div>

      {/* Kambaz Navigation Offcanvas */}
      <Offcanvas
        show={showKambazNav}
        onHide={() => setShowKambazNav(false)}
        placement="start"
        style={{ width: "280px" }}
      >
        <OffcanvasHeader closeButton className="bg-black text-white">
          <div className="d-flex align-items-center">
            <Image
              src="/images/NEU.svg"
              alt="NEU"
              width={40}
              height={40}
              style={{
                marginRight: "10px",
                filter:
                  "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(83%) contrast(87%)",
              }}
            />
            <span className="text-danger fw-bold">Canvas</span>
          </div>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0 bg-white">
          <ListGroup className="rounded-0">
            <ListGroupItem className="border-0">
              <Link
                href="/Dashboard"
                className={`text-decoration-none ${pathname === "/Dashboard" ? "text-danger fw-bold" : "text-dark"}`}
                onClick={() => setShowKambazNav(false)}
              >
                Dashboard
              </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0">
              <Link
                href={accountHref}
                className={`text-decoration-none ${pathname.includes("/Account") ? "text-danger fw-bold" : "text-dark"}`}
                onClick={() => setShowKambazNav(false)}
              >
                Account
              </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0">
              <Link
                href="/Courses"
                className={`text-decoration-none ${pathname.includes("/Courses") ? "text-danger fw-bold" : "text-dark"}`}
                onClick={() => setShowKambazNav(false)}
              >
                Courses
              </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0">
              <Link
                href="/Calendar"
                className={`text-decoration-none ${pathname === "/Calendar" ? "text-danger fw-bold" : "text-dark"}`}
                onClick={() => setShowKambazNav(false)}
              >
                Calendar
              </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0">
              <Link
                href="/Inbox"
                className={`text-decoration-none ${pathname === "/Inbox" ? "text-danger fw-bold" : "text-dark"}`}
                onClick={() => setShowKambazNav(false)}
              >
                <div className="d-flex align-items-center">
                  Inbox
                  <span className="badge bg-danger ms-2">23</span>
                </div>
              </Link>
            </ListGroupItem>
            <ListGroupItem className="border-0">
              <Link
                href="/Labs"
                className={`text-decoration-none ${pathname.includes("/Labs") ? "text-danger fw-bold" : "text-dark"}`}
                onClick={() => setShowKambazNav(false)}
              >
                Labs
              </Link>
            </ListGroupItem>
          </ListGroup>
        </OffcanvasBody>
      </Offcanvas>

      {/* Course Navigation Offcanvas */}
      <Offcanvas
        show={showCourseNav}
        onHide={() => setShowCourseNav(false)}
        placement="end"
        style={{ width: "280px" }}
      >
        <OffcanvasHeader closeButton className="bg-light">
          <span className="fw-bold">Course Navigation</span>
        </OffcanvasHeader>
        <OffcanvasBody className="p-0">
          <ListGroup className="rounded-0">
            {courseLinks.map((link) => (
              <ListGroupItem
                key={link.href}
                className={`border-0 ${
                  pathname === link.href ? "text-danger fw-bold" : ""
                }`}
              >
                <Link
                  href={link.href}
                  className="text-decoration-none text-inherit"
                  onClick={() => setShowCourseNav(false)}
                >
                  {link.label}
                </Link>
              </ListGroupItem>
            ))}
          </ListGroup>
        </OffcanvasBody>
      </Offcanvas>
    </>
  );
}
