import Link from "next/link";
import { Nav } from "react-bootstrap";

export default function TOC() {
  return (
    <Nav variant="pills" className="flex-column" id="wd-toc-pills">
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab1" id="wd-lab1-link">
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab2" id="wd-lab2-link">
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/Labs/Lab3" id="wd-lab3-link">
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} href="/" id="wd-kambaz-link">
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05"
          id="wd-github"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub Repository
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
