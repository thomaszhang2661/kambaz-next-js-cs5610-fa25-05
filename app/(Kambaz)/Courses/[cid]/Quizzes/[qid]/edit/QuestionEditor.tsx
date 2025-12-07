"use client";

import { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
} from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

type Choice = {
  _id: string;
  text: string;
  isCorrect: boolean;
};

type Question = {
  _id: string;
  type: "mcq" | "tf" | "fill";
  title: string;
  body: string;
  points: number;
  choices: Choice[];
  blanks?: { _id: string; answers: string[] }[];
};

interface QuestionEditorProps {
  question: Question;
  questionIndex: number;
  onUpdate: (question: Question) => void;
  onDelete: () => void;
  isNew?: boolean;
}

export default function QuestionEditor({
  question,
  questionIndex,
  onUpdate,
  onDelete,
  isNew = false,
}: QuestionEditorProps) {
  const [isEditing, setIsEditing] = useState(isNew);
  const [editedQuestion, setEditedQuestion] = useState<Question>({ ...question });

  useEffect(() => {
    setEditedQuestion({ ...question });
  }, [question]);

  const handleTypeChange = (newType: "mcq" | "tf" | "fill") => {
    let newQuestion: Question = {
      ...editedQuestion,
      type: newType,
    };

    if (newType === "tf") {
      newQuestion.choices = [
        { _id: "true", text: "True", isCorrect: true },
        { _id: "false", text: "False", isCorrect: false },
      ];
      newQuestion.blanks = undefined;
    } else if (newType === "mcq") {
      newQuestion.choices = [
        { _id: uuidv4(), text: "", isCorrect: true },
        { _id: uuidv4(), text: "", isCorrect: false },
        { _id: uuidv4(), text: "", isCorrect: false },
        { _id: uuidv4(), text: "", isCorrect: false },
      ];
      newQuestion.blanks = undefined;
    } else if (newType === "fill") {
      newQuestion.choices = [];
      newQuestion.blanks = [{ _id: uuidv4(), answers: [""] }];
    }

    setEditedQuestion(newQuestion);
  };

  const handleChange = (field: string, value: any) => {
    setEditedQuestion({ ...editedQuestion, [field]: value });
  };

  const handleChoiceChange = (index: number, field: string, value: any) => {
    const choices = [...editedQuestion.choices];
    if (field === "isCorrect" && value === true) {
      choices.forEach((c, i) => {
        choices[i] = { ...c, isCorrect: i === index };
      });
    } else {
      choices[index] = { ...choices[index], [field]: value };
    }
    setEditedQuestion({ ...editedQuestion, choices });
  };

  const addChoice = () => {
    const choices = [
      ...editedQuestion.choices,
      { _id: uuidv4(), text: "", isCorrect: false },
    ];
    setEditedQuestion({ ...editedQuestion, choices });
  };

  const deleteChoice = (index: number) => {
    if (editedQuestion.choices.length <= 2) return;
    const choices = editedQuestion.choices.filter((_, i) => i !== index);
    if (!choices.some((c) => c.isCorrect)) {
      choices[0].isCorrect = true;
    }
    setEditedQuestion({ ...editedQuestion, choices });
  };

  // For fill in blank - manage individual answers
  const addBlankAnswer = () => {
    const currentAnswers = editedQuestion.blanks?.[0]?.answers || [];
    const blanks = [
      {
        _id: editedQuestion.blanks?.[0]?._id || uuidv4(),
        answers: [...currentAnswers, ""],
      },
    ];
    setEditedQuestion({ ...editedQuestion, blanks });
  };

  const updateBlankAnswer = (index: number, value: string) => {
    const currentAnswers = editedQuestion.blanks?.[0]?.answers || [];
    const newAnswers = [...currentAnswers];
    newAnswers[index] = value;
    const blanks = [
      {
        _id: editedQuestion.blanks?.[0]?._id || uuidv4(),
        answers: newAnswers,
      },
    ];
    setEditedQuestion({ ...editedQuestion, blanks });
  };

  const deleteBlankAnswer = (index: number) => {
    const currentAnswers = editedQuestion.blanks?.[0]?.answers || [];
    if (currentAnswers.length <= 1) return;
    const newAnswers = currentAnswers.filter((_, i) => i !== index);
    const blanks = [
      {
        _id: editedQuestion.blanks?.[0]?._id || uuidv4(),
        answers: newAnswers,
      },
    ];
    setEditedQuestion({ ...editedQuestion, blanks });
  };

  const handleSave = () => {
    onUpdate(editedQuestion);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedQuestion({ ...question });
    setIsEditing(false);
  };

  const getHelpText = () => {
    switch (editedQuestion.type) {
      case "mcq":
        return "Enter your question and multiple answers, then select the one correct answer.";
      case "tf":
        return "Enter your question text, then select if True or False is the correct answer.";
      case "fill":
        return "Enter your question text, then define all possible correct answers for the blank. Students will see the question followed by a small text box to type their answer.";
      default:
        return "";
    }
  };

  // Preview Mode
  if (!isEditing) {
    return (
      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-between align-items-start">
          <div>
            <strong>Question {questionIndex + 1}:</strong>{" "}
            {editedQuestion.title || "Untitled"} ({editedQuestion.type.toUpperCase()})
            <div className="text-muted small mt-1">
              {editedQuestion.body || "No question text"}
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="text-muted">{editedQuestion.points} pts</span>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button variant="outline-danger" size="sm" onClick={onDelete}>
              <FaTrash />
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Edit Mode
  return (
    <Card className="mb-3">
      <Card.Body>
        {/* Header Row: Title | Type Dropdown | Points */}
        <div className="d-flex align-items-center gap-3 mb-3">
          <Form.Control
            type="text"
            value={editedQuestion.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Question Title"
            style={{ maxWidth: "200px" }}
          />
          <Form.Select
            value={editedQuestion.type}
            onChange={(e) =>
              handleTypeChange(e.target.value as "mcq" | "tf" | "fill")
            }
            style={{ maxWidth: "180px" }}
          >
            <option value="mcq">Multiple Choice</option>
            <option value="tf">True/False</option>
            <option value="fill">Fill In the Blank</option>
          </Form.Select>
          <div className="d-flex align-items-center gap-2 ms-auto">
            <span>pts:</span>
            <Form.Control
              type="number"
              min={0}
              value={editedQuestion.points}
              onChange={(e) =>
                handleChange("points", parseInt(e.target.value) || 0)
              }
              style={{ width: "60px" }}
            />
          </div>
        </div>

        {/* Help Text */}
        <p className="text-muted small mb-3">{getHelpText()}</p>

        {/* Question Label and Toolbar */}
        <div className="mb-2">
          <strong>Question:</strong>
        </div>
        <div className="border rounded-top p-2 bg-light d-flex gap-3 small text-muted">
          <span>Edit</span>
          <span>View</span>
          <span>Insert</span>
          <span>Format</span>
          <span>Tools</span>
          <span>Table</span>
        </div>

        {/* Question Text */}
        <Form.Control
          as="textarea"
          rows={3}
          value={editedQuestion.body}
          onChange={(e) => handleChange("body", e.target.value)}
          placeholder="Enter your question here..."
          className="mb-4 rounded-top-0 border-top-0"
        />

        {/* Answers Section */}
        <div className="mb-3">
          <strong>Answers:</strong>
        </div>

        {/* Multiple Choice Answers */}
        {editedQuestion.type === "mcq" && (
          <div className="mb-3">
            {editedQuestion.choices.map((choice, idx) => (
              <div
                key={choice._id}
                className="d-flex align-items-center gap-3 mb-3"
              >
                <div
                  style={{ width: "120px", cursor: "pointer" }}
                  onClick={() => handleChoiceChange(idx, "isCorrect", true)}
                  className={choice.isCorrect ? "text-success fw-bold" : "text-muted"}
                >
                  {choice.isCorrect ? "→ Correct Answer" : "Possible Answer"}
                </div>
                <Form.Control
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(idx, "text", e.target.value)}
                  placeholder={`Answer ${idx + 1}`}
                  style={{ maxWidth: "300px" }}
                />
                {editedQuestion.choices.length > 2 && (
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => deleteChoice(idx)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>
            ))}
            <div className="text-end">
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={addChoice}
              >
                <FaPlus className="me-1" /> Add Another Answer
              </Button>
            </div>
          </div>
        )}

        {/* True/False Answers */}
        {editedQuestion.type === "tf" && (
          <div className="mb-3 ms-3">
            {editedQuestion.choices.map((choice, idx) => (
              <div
                key={choice._id}
                className="d-flex align-items-center gap-2 mb-2"
                style={{ cursor: "pointer" }}
                onClick={() => handleChoiceChange(idx, "isCorrect", true)}
              >
                <span className={choice.isCorrect ? "text-success" : ""}>
                  {choice.isCorrect ? "→" : ""}
                </span>
                <span className={choice.isCorrect ? "fw-bold" : ""}>
                  {choice.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Fill in the Blank Answers */}
        {editedQuestion.type === "fill" && (
          <div className="mb-3">
            {(editedQuestion.blanks?.[0]?.answers || [""]).map((answer, idx) => (
              <div
                key={idx}
                className="d-flex align-items-center gap-3 mb-3"
              >
                <div style={{ width: "120px" }} className="text-muted">
                  Possible Answer:
                </div>
                <Form.Control
                  type="text"
                  value={answer}
                  onChange={(e) => updateBlankAnswer(idx, e.target.value)}
                  placeholder="Enter possible answer"
                  style={{ maxWidth: "300px" }}
                />
                {(editedQuestion.blanks?.[0]?.answers?.length || 0) > 1 && (
                  <Button
                    variant="link"
                    className="text-danger p-0"
                    onClick={() => deleteBlankAnswer(idx)}
                  >
                    <FaTrash />
                  </Button>
                )}
              </div>
            ))}
            <div className="text-end">
              <Button
                variant="link"
                className="text-danger p-0"
                onClick={addBlankAnswer}
              >
                <FaPlus className="me-1" /> Add Another Answer
              </Button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="d-flex gap-2 pt-3 border-top">
          <Button variant="light" className="border" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSave}>
            Update Question
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
