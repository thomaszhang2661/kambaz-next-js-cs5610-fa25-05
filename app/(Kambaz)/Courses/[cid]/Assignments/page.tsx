"use client";

import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import AssignmentsControls from "./AssignmentsControls";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { findAssignmentsForCourse } from "../../client";

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
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    if (!cid) return;
    findAssignmentsForCourse(cid).then((data) => setAssignments(data || []));
  }, [cid]);

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
                <div className="float-end">
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
