"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function AccountNavigation() {
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = pathname?.split("/").pop() || "";
    setActiveLink(currentPath);
  }, [pathname]);

  const links = [
    { label: "Signin", href: "/Account/Signin" },
    { label: "Signup", href: "/Account/Signup" },
    { label: "Profile", href: "/Account/Profile" },
  ];

  return (
    <div id="wd-account-navigation" style={{ width: "200px" }}>
      <ListGroup>
        {links.map((link) => {
          const linkName = link.href.split("/").pop();
          const isActive = activeLink === linkName;

          return (
            <ListGroupItem
              key={link.href}
              className={`border-0 ${
                isActive ? "text-danger bg-white" : "text-black bg-white"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setActiveLink(linkName || "")}
            >
              <Link
                href={link.href}
                className={`text-decoration-none ${
                  isActive ? "text-danger" : "text-black"
                }`}
                id={`wd-${linkName?.toLowerCase()}-link`}
              >
                {link.label}
              </Link>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
