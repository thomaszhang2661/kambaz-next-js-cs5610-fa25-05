// import Link from "next/link";
// export default function KambazNavigation() {
//   return (
//     <div id="wd-kambaz-navigation">
//       <Link
//         href="https://www.northeastern.edu/"
//         id="wd-neu-link"
//         target="_blank"
//       >
//         Northeastern
//       </Link>
//       <br />
//       <Link href="/Account" id="wd-account-link">
//         Account
//       </Link>
//       <br />
//       <Link href="/Dashboard" id="wd-dashboard-link">
//         Dashboard
//       </Link>
//       <br />
//       <Link href="/Courses/1234" id="wd-course-link">
//         Courses
//       </Link>
//       <br />
//       <Link href="/Calendar" id="wd-calendar-link">
//         Calendar
//       </Link>
//       <br />
//       <Link href="/Inbox" id="wd-inbox-link">
//         Inbox
//       </Link>
//       <br />
//       <Link href="/Labs" id="wd-labs-link">
//         Labs
//       </Link>
//       <br />
//     </div>
//   );
// }

"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import Image from "next/image";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { href: "/Account", label: "Account", icon: FaRegCircleUser },
    { href: "/Dashboard", label: "Dashboard", icon: AiOutlineDashboard },
    { href: "/Courses/1234", label: "Courses", icon: LiaBookSolid },
    { href: "/Calendar", label: "Calendar", icon: IoCalendarOutline },
    { href: "/Inbox", label: "Inbox", icon: FaInbox },
    { href: "/Labs", label: "Labs", icon: LiaCogSolid },
  ];

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem className="bg-black border-0 text-center">
        <Link
          href="https://www.northeastern.edu/"
          target="_blank"
          id="wd-neu-link"
          className="text-decoration-none"
        >
          <Image
            src="/images/NEU.svg"
            alt="NEU"
            width={75}
            height={75}
            style={{
              padding: "10px",
              filter:
                "brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%)",
            }}
          />
        </Link>
      </ListGroupItem>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive =
          pathname.startsWith(link.href) ||
          (link.href === "/Courses/1234" && pathname.includes("/Courses/"));

        return (
          <ListGroupItem
            key={link.href}
            className={`border-0 text-center ${
              isActive ? "bg-white" : "bg-black"
            }`}
          >
            <Link
              href={link.href}
              id={`wd-${link.label.toLowerCase()}-link`}
              className={`text-decoration-none ${
                isActive ? "text-danger" : "text-white"
              } d-flex flex-column align-items-center`}
            >
              <Icon
                className={`fs-1 ${isActive ? "text-danger" : "text-white"}`}
              />
              <div className="mt-1">{link.label}</div>
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
