"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { MdOutlineScience } from "react-icons/md";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import type { ElementType } from "react";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links: { label: string; path: string; Icon: ElementType }[] = [
    { label: "Dashboard", path: "/Dashboard", Icon: AiOutlineDashboard },
    { label: "Courses", path: "/Dashboard", Icon: LiaBookSolid },
    { label: "Calendar", path: "/Calendar", Icon: IoCalendarOutline },
    { label: "Inbox", path: "/Inbox", Icon: FaInbox },
    { label: "Labs", path: "/Labs", Icon: MdOutlineScience },
  ];

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
        <Image
          src="/images/NEU.svg"
          width={65}
          height={65}
          alt="Northeastern University"
          style={{
            filter:
              "brightness(0) saturate(100%) invert(24%) sepia(90%) saturate(7482%) hue-rotate(355deg) brightness(95%) contrast(106%)",
          }}
        />
      </a>

      {/* Account (keep as first interactive item) */}
      <Link
        href="/Account/Signin"
        className={`list-group-item border-0 text-center text-decoration-none py-3 ${
          pathname.includes("/Account") ? "bg-white" : "bg-black"
        }`}
        id="wd-account-link"
      >
        <div className="d-flex flex-column align-items-center">
          <FaRegCircleUser
            className={`mb-1 ${
              pathname.includes("/Account") ? "text-danger" : "text-white"
            }`}
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

      {/* Dynamic links from array */}
      {links.map((link) => {
        const isActive =
          link.label === "Dashboard"
            ? pathname === link.path
            : pathname.includes(link.path.split("/")[1] || "");
        const Icon = link.Icon;
        return (
          <Link
            href={link.path}
            key={`${link.path}-${link.label}`}
            className={`list-group-item border-0 text-center text-decoration-none py-3 ${
              isActive ? "bg-white" : "bg-black"
            }`}
          >
            <div className="d-flex flex-column align-items-center">
              <Icon
                className={`mb-1 ${isActive ? "text-danger" : "text-white"}`}
                style={{ fontSize: "2.2rem" }}
              />
              <span
                className={isActive ? "text-danger" : "text-white"}
                style={{ fontSize: "14px" }}
              >
                {link.label}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
