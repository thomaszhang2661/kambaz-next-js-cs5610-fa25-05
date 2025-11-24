"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import { BsGripVertical, BsTrash, BsPencil } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import AssignmentsControls from "./AssignmentsControls";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "../../../Assignments/reducer";
import * as db from "../../../Database";

type Assignment = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

type RootState = { assignmentsReducer: { assignments: Assignment[] } };

export default function Assignments() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";
  const dispatch = useDispatch();
  const router = useRouter();

  const { assignments } = useSelector(
    (state: RootState) =>
      state.assignmentsReducer || {
        assignments: (db.assignments || []) as Assignment[],
      }
  );

  const filteredAssignments = assignments.filter(
    (a: Assignment) => a.course === cid
  );

  const handleDelete = (assignmentId: string, title: string) => {
    if (confirm(`Delete assignment "${title}"?`)) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const handleEdit = (assignmentId: string) => {
    // Navigate to the assignment editor page
    router.push(`/Courses/${cid}/Assignments/${assignmentId}`);
  };

  return (
    <div id="wd-assignments">
      <AssignmentsControls />
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
            <button className="btn btn-outline-secondary">+</button>
          </div>

          <ListGroup className="wd-assignment-items rounded-0">
            {filteredAssignments.map((a) => (
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
                <div className="float-end">
                  <Button
                    variant="link"
                    size="sm"
                    className="text-primary me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleEdit(a._id);
                    }}
                  >
                    <BsPencil />
                  </Button>
                  <Button
                    variant="link"
                    size="sm"
                    className="text-danger me-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(a._id, a.title);
                    }}
                  >
                    <BsTrash />
                  </Button>
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
