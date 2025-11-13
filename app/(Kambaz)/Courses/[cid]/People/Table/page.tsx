"use client";

import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  findPeopleForCourse,
  createUserAdmin,
  enrollUserInCourse,
  unenrollUserFromCourseById,
  deleteUser,
} from "../../../client";

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

export default function PeopleTable() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";
  const [users, setUsers] = useState<User[]>([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Student");

  useEffect(() => {
    if (!cid) return;
    findPeopleForCourse(cid).then((data: User[]) => setUsers(data || []));
  }, [cid]);

  const refresh = () => {
    if (!cid) return;
    findPeopleForCourse(cid).then((data: User[]) => setUsers(data || []));
  };

  const handleAddPerson = async (e: any) => {
    e.preventDefault();
    const newUser = await createUserAdmin({
      firstName,
      lastName,
      username,
      password,
      role,
    });
    // enroll into course
    await enrollUserInCourse(cid, newUser._id);
    // clear form
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setRole("Student");
    refresh();
  };

  const handleRemoveFromCourse = async (userId: string) => {
    await unenrollUserFromCourseById(cid, userId);
    refresh();
  };

  const handleDeleteUser = async (userId: string) => {
    // first unenroll from this course to keep DB consistent
    await unenrollUserFromCourseById(cid, userId);
    await deleteUser(userId);
    refresh();
  };

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
              <td>
                <button
                  id={`wd-remove-${u._id}`}
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleRemoveFromCourse(u._id)}
                >
                  Remove
                </button>
                <button
                  id={`wd-delete-${u._id}`}
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteUser(u._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <hr />
      <form id="wd-add-person-form" onSubmit={handleAddPerson}>
        <div className="mb-2">
          <input
            id="wd-add-person-firstname"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            id="wd-add-person-lastname"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            id="wd-add-person-username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <input
            id="wd-add-person-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="mb-2">
          <select
            id="wd-add-person-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="form-select"
          >
            <option>Student</option>
            <option>TA</option>
            <option>Instructor</option>
          </select>
        </div>
        <button
          id="wd-add-person-submit"
          className="btn btn-primary"
          type="submit"
        >
          Add Person
        </button>
      </form>
    </div>
  );
}
