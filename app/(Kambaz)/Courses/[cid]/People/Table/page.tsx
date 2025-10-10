"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as db from "../../../../Database";

type User = {
  _id: string;
  firstName?: string;
  lastName?: string;
  loginId?: string;
  section?: string;
  role?: string;
  lastActivity?: string;
  totalActivity?: number;
};

type Enrollment = { _id: string; user: string; course: string };

export default function PeopleTable() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";

  const enrollments: Enrollment[] = (db.enrollments || []).filter(
    (e: Enrollment) => e.course === cid
  );

  const users: User[] = enrollments
    .map((e) => (db.users || []).find((u: User) => u._id === e.user))
    .filter(Boolean) as User[];

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{u.firstName}</span>{" "}
                <span className="wd-last-name">{u.lastName}</span>
              </td>
              <td className="wd-login-id">{u.loginId}</td>
              <td className="wd-section">{u.section}</td>
              <td className="wd-role">{u.role}</td>
              <td className="wd-last-activity">{u.lastActivity}</td>
              <td className="wd-total-activity">{u.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
