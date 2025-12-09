"use client";

import { Button, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaSearch } from "react-icons/fa";

interface QuizzesControlsProps {
  onAddQuiz: () => void;
  isFaculty: boolean;
}

export default function QuizzesControls({
  onAddQuiz,
  isFaculty,
}: QuizzesControlsProps) {
  return (
    <div
      id="wd-quizzes-controls"
      className="d-flex justify-content-between align-items-center mb-3"
    >
      <InputGroup style={{ maxWidth: "300px" }}>
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
      </InputGroup>

      {isFaculty && (
        <Button
          variant="danger"
          id="wd-add-quiz-btn"
          onClick={onAddQuiz}
          className="d-flex align-items-center gap-2"
        >
          <FaPlus /> Quiz
        </Button>
      )}
    </div>
  );
}

