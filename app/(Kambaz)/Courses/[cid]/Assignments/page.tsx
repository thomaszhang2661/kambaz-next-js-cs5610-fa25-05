"use client";
import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { MdAssignment } from "react-icons/md";
import AssignmentsControls from "./AssignmentsControls";

export default function Assignments() {
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
            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-success" />
                <div>
                  <Link
                    href="/Courses/1234/Assignments/123"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <div className="wd-assignment-details small text-muted">
                    <div>
                      Multiple Modules | <strong>Not available until</strong>{" "}
                      May 6 at 12:00am
                    </div>
                    <div>
                      <strong>Due</strong> May 13 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <button className="btn btn-sm">⋮</button>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-success" />
                <div>
                  <Link
                    href="/Courses/1234/Assignments/124"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <div className="wd-assignment-details small text-muted">
                    <div>
                      Multiple Modules | <strong>Not available until</strong>{" "}
                      May 13 at 12:00am
                    </div>
                    <div>
                      <strong>Due</strong> May 20 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <button className="btn btn-sm">⋮</button>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-success" />
                <div>
                  <Link
                    href="/Courses/1234/Assignments/125"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <div className="wd-assignment-details small text-muted">
                    <div>
                      Multiple Modules | <strong>Not available until</strong>{" "}
                      May 20 at 12:00am
                    </div>
                    <div>
                      <strong>Due</strong> May 27 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <button className="btn btn-sm">⋮</button>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-success" />
                <div>
                  <Link
                    href="/Courses/1234/Assignments/126"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A4 - STATE + REDUX
                  </Link>
                  <div className="wd-assignment-details small text-muted">
                    <div>
                      Multiple Modules | <strong>Not available until</strong>{" "}
                      May 27 at 12:00am
                    </div>
                    <div>
                      <strong>Due</strong> Jun 3 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <button className="btn btn-sm">⋮</button>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-success" />
                <div>
                  <Link
                    href="/Courses/1234/Assignments/127"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A5 - NODE + SESSION
                  </Link>
                  <div className="wd-assignment-details small text-muted">
                    <div>
                      Multiple Modules | <strong>Not available until</strong>{" "}
                      Jun 3 at 12:00am
                    </div>
                    <div>
                      <strong>Due</strong> Jun 10 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <button className="btn btn-sm">⋮</button>
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-assignment-list-item p-3 ps-1 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <MdAssignment className="me-2 fs-3 text-success" />
                <div>
                  <Link
                    href="/Courses/1234/Assignments/128"
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    A6 - MONGO + MONGOOSE
                  </Link>
                  <div className="wd-assignment-details small text-muted">
                    <div>
                      Multiple Modules | <strong>Not available until</strong>{" "}
                      Jun 10 at 12:00am
                    </div>
                    <div>
                      <strong>Due</strong> Jun 17 at 11:59pm | 100 pts
                    </div>
                  </div>
                </div>
              </div>
              <div className="float-end">
                <button className="btn btn-sm">⋮</button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
