"use client";

import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import * as db from "../../../../Database";

type Assignment = {
  _id: string;
  course: string;
  title?: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
};

export default function Editor() {
  const params = useParams() as { cid?: string; aid?: string };
  const cid = params.cid || "";
  const aid = params.aid || "";
  const router = useRouter();

  const assignment: Assignment =
    (db.assignments || []).find(
      (a: Assignment) => a._id === aid && a.course === cid
    ) || ({} as Assignment);

  function onCancel() {
    router.push(`/Courses/${cid}/Assignments`);
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={(assignment && assignment.title) || ""} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            defaultValue={(assignment && assignment.description) || ""}
          />
        </Form.Group>

        <Row className="mb-3">
          <Col md={2} className="d-flex align-items-center">
            <Form.Label>Points</Form.Label>
          </Col>
          <Col md={4}>
            <Form.Group controlId="wd-points" className="mb-3">
              <Form.Control
                defaultValue={(assignment && assignment.points) || 100}
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
                    defaultValue={(assignment && assignment.dueDate) || ""}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <Form.Group controlId="wd-available-from" className="mb-3">
                      <Form.Label>Available from</Form.Label>
                      <Form.Control
                        type="date"
                        defaultValue={
                          (assignment && assignment.availableDate) || ""
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
        <Button
          variant="danger"
          onClick={() => {
            // minimal save behaviour: navigate back to assignments list
            router.push(`/Courses/${cid}/Assignments`);
          }}
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
