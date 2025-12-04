"use client";

import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Button,
  InputGroup,
  Form,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import { FaTrash, FaSearch } from "react-icons/fa";
import AssignmentsControls from "./AssignmentsControls";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  findAssignmentsForCourse,
  createAssignmentForCourse,
  deleteAssignment,
} from "../../client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

export default function Assignments() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!cid) return;
      const data = await findAssignmentsForCourse(cid);
      setAssignments(data || []);
    };
    fetchAssignments();
  }, [cid]);

  const handleCreateAssignment = async () => {
    try {
      const newAssignment = {
        title: "New Assignment",
        description: "New Assignment Description",
        points: 100,
        dueDate: "2025-12-01",
        availableDate: "2025-11-01",
      };
      const created = await createAssignmentForCourse(cid, newAssignment);
      setAssignments([...assignments, created]);
      router.push(`/Courses/${cid}/Assignments/${created._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!confirm("Are you sure you want to delete this assignment?")) return;
    try {
      await deleteAssignment(assignmentId);
      setAssignments(assignments.filter((a) => a._id !== assignmentId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="wd-assignments">
      {currentUser?.role === "FACULTY" && (
        <AssignmentsControls onAddAssignment={handleCreateAssignment} />
      )}
      {currentUser?.role !== "FACULTY" && (
        <div id="wd-assignments-controls" className="text-nowrap mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-grow-1 me-3">
              <InputGroup>
                <InputGroupText>
                  <FaSearch />
                </InputGroupText>
                <Form.Control
                  id="wd-search-assignment"
                  placeholder="Search for Assignments"
                  className="form-control"
                />
              </InputGroup>
            </div>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-assignments-list">
        <ListGroupItem className="wd-assignment-group p-0 mb-4 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            {currentUser?.role === "FACULTY" && (
              <Button variant="outline-light" onClick={handleCreateAssignment}>
                +
              </Button>
            )}
          </div>

          <ListGroup className="wd-assignment-items rounded-0">
            {assignments.map((a) => (
              <ListGroupItem
                key={a._id}
                className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <BsGripVertical className="me-2 fs-3" />
                  <MdAssignment className="me-2 fs-3 text-success" />
                  <div>
                    <Link
                      href={`/Courses/${cid}/Assignments/${a._id}`}
                      className="wd-assignment-link text-decoration-none text-dark fw-bold"
                    >
                      {a.title}
                    </Link>
                    <div className="wd-assignment-details small text-muted">
                      <div>
                        Multiple Modules | <strong>Not available until</strong>{" "}
                        {a.availableDate}
                      </div>
                      <div>
                        <strong>Due</strong> {a.dueDate} | {a.points} pts
                      </div>
                    </div>
                  </div>
                </div>
                <div className="float-end d-flex align-items-center">
                  {currentUser?.role === "FACULTY" && (
                    <Button
                      variant="danger"
                      size="sm"
                      className="me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteAssignment(a._id);
                      }}
                    >
                      <FaTrash />
                    </Button>
                  )}
                  <button className="btn btn-sm">⋮</button>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
