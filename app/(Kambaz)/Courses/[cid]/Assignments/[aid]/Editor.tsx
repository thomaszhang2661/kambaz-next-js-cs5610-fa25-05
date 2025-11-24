"use client";

import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewAssignment,
  updateAssignment,
} from "../../../../Assignments/reducer";
import { useState, useEffect } from "react";

type Assignment = {
  _id: string;
  course: string;
  title?: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

type RootState = {
  assignmentsReducer: { assignments: Assignment[] };
};

export default function Editor() {
  const params = useParams() as { cid?: string; aid?: string };
  const cid = params.cid || "";
  const aid = params.aid || "";
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer || { assignments: [] }
  );

  const existingAssignment = assignments.find(
    (a: Assignment) => a._id === aid && a.course === cid
  );

  const [assignment, setAssignment] = useState<Assignment>({
    _id: aid,
    course: cid,
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableDate: "",
  });

  useEffect(() => {
    if (existingAssignment) {
      setAssignment(existingAssignment);
    }
  }, [existingAssignment]);

  function onCancel() {
    router.push(`/Courses/${cid}/Assignments`);
  }

  function onSave() {
    if (aid === "new") {
      // Creating new assignment
      dispatch(
        addNewAssignment({
          ...assignment,
          _id: new Date().getTime().toString(),
        })
      );
    } else {
      // Updating existing assignment
      dispatch(updateAssignment(assignment));
    }
    router.push(`/Courses/${cid}/Assignments`);
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={assignment.title || ""}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={assignment.description || ""}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={2} className="d-flex align-items-center">
            <Form.Label>Points</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-points" className="mb-3">
              <Form.Control
                type="number"
                value={assignment.points || 100}
                onChange={(e) =>
                  setAssignment({
                    ...assignment,
                    points: parseInt(e.target.value),
                  })
                }
              />
            </Form.Group>
          </Col>
        </Row>

        {/* ...existing form fields remain the same... */}

        <Row className="mb-3">
          <Col md={2} className="d-flex align-items-center">
            <Form.Label>Assign</Form.Label>
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <Form.Group controlId="wd-assign-to" className="mb-3">
                  <Form.Label>Assign to</Form.Label>
                  <Form.Select defaultValue="Everyone">
                    <option>Everyone</option>
                    <option>Section 1</option>
                    <option>Section 2</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="wd-due-date" className="mb-3">
                  <Form.Label>Due</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.dueDate || ""}
                    onChange={(e) =>
                      setAssignment({ ...assignment, dueDate: e.target.value })
                    }
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <Form.Group controlId="wd-available-from" className="mb-3">
                      <Form.Label>Available from</Form.Label>
                      <Form.Control
                        type="date"
                        value={assignment.availableDate || ""}
                        onChange={(e) =>
                          setAssignment({
                            ...assignment,
                            availableDate: e.target.value,
                          })
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <Form.Group controlId="wd-available-until" className="mb-3">
                      <Form.Label>Until</Form.Label>
                      <Form.Control type="date" defaultValue={""} />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Button variant="secondary" className="me-2" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onSave}>
          Save
        </Button>
      </Form>
    </div>
  );
}
