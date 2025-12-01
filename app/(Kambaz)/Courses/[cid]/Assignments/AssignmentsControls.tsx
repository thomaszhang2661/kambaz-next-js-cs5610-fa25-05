import { Button, Form, InputGroup } from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaPlus, FaSearch } from "react-icons/fa";

type AssignmentsControlsProps = {
  onAddAssignment?: () => void;
};

export default function AssignmentsControls({
  onAddAssignment,
}: AssignmentsControlsProps) {
  return (
    <div id="wd-assignments-controls" className="text-nowrap mb-4">
      <div className="d-flex justify-content-between align-items-center">
        {/* Search Field on the Left */}
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

        {/* Buttons on the Right */}
        <div className="d-flex">
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            id="wd-group-btn"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
          <Button
            variant="danger"
            size="lg"
            id="wd-add-assignment-btn"
            onClick={onAddAssignment}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        </div>
      </div>
    </div>
  );
}
