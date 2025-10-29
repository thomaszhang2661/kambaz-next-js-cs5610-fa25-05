"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills" className="mb-2">
      <NavItem>
        <NavLink href="/Labs" as={Link} active={pathname === "/Labs"}>
          Labs
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab1" as={Link} active={pathname.includes("Lab1")}>
          Lab 1
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab2" as={Link} active={pathname.includes("Lab2")}>
          Lab 2
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab3" as={Link} active={pathname.includes("Lab3")}>
          Lab 3
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/Labs/Lab4" as={Link} active={pathname.includes("Lab4")}>
          Lab 4
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/" as={Link}>
          Kambaz
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          href="https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05"
          id="wd-github"
        >
          My GitHub
        </NavLink>
      </NavItem>
    </Nav>
  );
}
