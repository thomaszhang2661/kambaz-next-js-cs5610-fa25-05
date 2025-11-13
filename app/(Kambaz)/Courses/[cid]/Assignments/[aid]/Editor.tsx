"use client";

import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAssignment, updateAssignment } from "../../../client";

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

  const [assignment, setAssignment] = useState<Assignment>({} as Assignment);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<number>(100);
  const [dueDate, setDueDate] = useState("");
  const [availableDate, setAvailableDate] = useState("");

  useEffect(() => {
    if (!aid) return;
    getAssignment(aid).then((a) => {
      const asn = a || ({} as Assignment);
      setAssignment(asn);
      setTitle(asn.title || "");
      setDescription(asn.description || "");
      setPoints(asn.points || 100);
      setDueDate(asn.dueDate || "");
      setAvailableDate(asn.availableDate || "");
    });
  }, [aid]);

  function onCancel() {
    router.push(`/Courses/${cid}/Assignments`);
  }

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value || "0"))}
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
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                  />
                </Form.Group>
                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <Form.Group controlId="wd-available-from" className="mb-3">
                      <Form.Label>Available from</Form.Label>
                      <Form.Control
                        type="date"
                        value={availableDate}
                        onChange={(e) => setAvailableDate(e.target.value)}
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
          onClick={async () => {
            // save via API
            try {
              const updated = {
                _id: assignment._id,
                title,
                description,
                points,
                dueDate,
                availableDate,
                course: cid,
              };
              await updateAssignment(updated);
              router.push(`/Courses/${cid}/Assignments`);
            } catch (err) {
              console.error(err);
            }
          }}
        >
          Save
        </Button>
      </Form>
    </div>
  );
}
