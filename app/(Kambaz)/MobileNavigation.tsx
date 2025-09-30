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
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

interface MobileNavigationProps {
  courseId?: string;
}

export default function MobileNavigation({ courseId }: MobileNavigationProps) {
  const [showKambazNav, setShowKambazNav] = useState(false);
  const [showCourseNav, setShowCourseNav] = useState(false);
  const pathname = usePathname();

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
          <img
            src="/images/NEU.svg"
            alt="NEU"
            style={{
              width: "30px",
              height: "30px",
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
            <img
              src="/images/NEU.svg"
              alt="NEU"
              style={{
                width: "40px",
                height: "40px",
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
            <ListGroupItem className="text-danger fw-bold border-0 bg-light">
              Dashboard
            </ListGroupItem>
            <ListGroupItem className="border-0">Account</ListGroupItem>
            <ListGroupItem className="border-0">Courses</ListGroupItem>
            <ListGroupItem className="border-0">Calendar</ListGroupItem>
            <ListGroupItem className="border-0">
              <div className="d-flex align-items-center">
                Inbox
                <span className="badge bg-danger ms-2">23</span>
              </div>
            </ListGroupItem>
            <ListGroupItem className="border-0">History</ListGroupItem>
            <ListGroupItem className="border-0">Help</ListGroupItem>
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
