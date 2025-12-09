"use client";
import Link from "next/link";
import { Card, Badge, Table } from "react-bootstrap";
import { FaGithub, FaServer, FaLaptopCode, FaArrowLeft } from "react-icons/fa";

export default function Team() {
  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      {/* Back Link */}
      <Link href="/Account/Signin" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft className="me-2" />
        Back to Sign In
      </Link>

      {/* Team Info Card */}
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">🎓 Kambaz Quizzes Project</h3>
          <p className="mb-0 mt-1">CS5610 Web Development - Fall 2025</p>
        </Card.Header>
        <Card.Body>
          {/* Team Members Section */}
          <h4 className="mb-3">👥 Team Members</h4>
          <Table striped bordered hover className="mb-4">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Section</th>
                <th>Responsibilities</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <Badge bg="success">1</Badge>
                </td>
                <td>
                  <strong>Weihang Zeng</strong>
                </td>
                <td>CS5610 Section 05</td>
                <td>QuizzesControls, Edit and other Frontend</td>
              </tr>
              <tr>
                <td>
                  <Badge bg="info">2</Badge>
                </td>
                <td>
                  <strong>Jian Zhang</strong>
                </td>
                <td>CS5610 Section 05</td>
                <td>Take, Preview & Backend</td>
              </tr>
            </tbody>
          </Table>

          {/* GitHub Repositories Section */}
          <h4 className="mb-3">🔗 GitHub Repositories</h4>

          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <FaLaptopCode className="me-2 text-primary fs-4" />
                <h5 className="mb-0">Frontend Repository</h5>
              </div>
              <p className="text-muted mb-2">
                Next.js + React + TypeScript + Bootstrap
              </p>
              <a
                href="https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05/tree/quizzes"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary"
              >
                <FaGithub className="me-2" />
                View Frontend Code (quizzes branch)
              </a>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <FaServer className="me-2 text-success fs-4" />
                <h5 className="mb-0">Backend Repository</h5>
              </div>
              <p className="text-muted mb-2">
                Node.js + Express + MongoDB + Mongoose
              </p>
              <a
                href="https://github.com/thomaszhang2661/kambaz-next-js-cs5610-fa25-05/tree/quizzes/kambaz-node-server-app"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-success"
              >
                <FaGithub className="me-2" />
                View Backend Code
              </a>
            </Card.Body>
          </Card>

          {/* Project Features */}
          <h4 className="mb-3 mt-4">✨ Quizzes Features</h4>
          <ul>
            <li>
              <strong>Quiz Management</strong> - Create, edit, delete quizzes
              (Faculty only)
            </li>
            <li>
              <strong>Question Types</strong> - Multiple Choice, True/False,
              Fill in the Blank
            </li>
            <li>
              <strong>Quiz Settings</strong> - Time limit, multiple attempts,
              shuffle answers
            </li>
            <li>
              <strong>Publish/Unpublish</strong> - Control quiz visibility for
              students
            </li>
            <li>
              <strong>Take Quiz</strong> - Students can take published quizzes
            </li>
            <li>
              <strong>Auto Grading</strong> - Automatic scoring upon submission
            </li>
            <li>
              <strong>Attempt History</strong> - View past quiz attempts and
              scores
            </li>
          </ul>
        </Card.Body>
      </Card>
    </div>
  );
}
