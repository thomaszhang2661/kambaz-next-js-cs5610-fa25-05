"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Tabs,
  Tab,
  Alert,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { getQuiz, updateQuiz, publishQuiz } from "../../../../client";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./QuestionEditor";
import { Quiz, Question, Choice } from "../../types";

export default function QuizEditor() {
  const params = useParams() as { cid?: string; qid?: string };
  const cid = params?.cid || "";
  const qid = params?.qid || "";
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const timeLimitEnabled = !!quiz?.settings?.timeLimitMinutes;

  const fetchQuiz = async () => {
    if (!cid || !qid) return;
    try {
      setLoading(true);
      const data = await getQuiz(cid, qid);
      setQuiz(data);
      setError(null);
    } catch (err: any) {
      console.error("Error fetching quiz:", err);
      setError(err.response?.data?.error || "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [cid, qid]);

  const calculateTotalPoints = (questions: Question[]) => {
    return questions.reduce((sum, q) => sum + (q.points || 0), 0);
  };

  // Shared save function - saves quiz to backend
  const saveQuiz = async (quizToSave: Quiz) => {
    const totalPoints = calculateTotalPoints(quizToSave.questions || []);
    await updateQuiz(cid, { ...quizToSave, points: totalPoints });
  };

  const handleSave = async () => {
    if (!quiz) return;
    try {
      setError(null);
      await saveQuiz(quiz);
      router.push(`/Courses/${cid}/Quizzes/${qid}`);
    } catch (err: any) {
      console.error("Error saving quiz:", err);
      setError(err.response?.data?.error || "Failed to save quiz");
    }
  };

  const handleSaveAndPublish = async () => {
    if (!quiz) return;
    try {
      setError(null);
      await saveQuiz(quiz);
      await publishQuiz(cid, qid);
      router.push(`/Courses/${cid}/Quizzes`);
    } catch (err: any) {
      console.error("Error saving and publishing quiz:", err);
      setError(err.response?.data?.error || "Failed to save and publish quiz");
    }
  };

  const handleCancel = () => {
    router.push(`/Courses/${cid}/Quizzes`);
  };

  const handleChange = (field: string, value: any) => {
    if (!quiz) return;
    setQuiz({ ...quiz, [field]: value });
  };

  const handleSettingsChange = (field: string, value: any) => {
    if (!quiz) return;
    setQuiz({
      ...quiz,
      settings: { ...quiz.settings, [field]: value },
    });
  };

  // Question management
  const addQuestion = async (type: "mcq" | "tf" | "fill" = "mcq") => {
    if (!quiz) return;
    const newId = uuidv4();
    const newQuestion: Question = {
      _id: newId,
      type,
      title: `Question ${(quiz.questions?.length || 0) + 1}`,
      body: "",
      points: 10,
      choices:
        type === "tf"
          ? [
              { _id: "true", text: "True", isCorrect: true },
              { _id: "false", text: "False", isCorrect: false },
            ]
          : type === "mcq"
          ? [
              { _id: uuidv4(), text: "Option 1", isCorrect: true },
              { _id: uuidv4(), text: "Option 2", isCorrect: false },
              { _id: uuidv4(), text: "Option 3", isCorrect: false },
              { _id: uuidv4(), text: "Option 4", isCorrect: false },
            ]
          : [],
      blanks:
        type === "fill" ? [{ _id: uuidv4(), answers: [""] }] : undefined,
    };
    const updatedQuiz = {
      ...quiz,
      questions: [...(quiz.questions || []), newQuestion],
    };
    setQuiz(updatedQuiz);
    await saveQuiz(updatedQuiz);
  };

  const updateQuestion = async (id: string, updatedQuestion: Question) => {
    if (!quiz) return;
    const questions = (quiz.questions || []).map((q) =>
      q._id === id ? updatedQuestion : q
    );
    const updatedQuiz = { ...quiz, questions };
    setQuiz(updatedQuiz);
    await saveQuiz(updatedQuiz);
  };

  const deleteQuestion = async (id: string) => {
    if (!quiz) return;
    const questions = (quiz.questions || []).filter((q) => q._id !== id);
    const updatedQuiz = { ...quiz, questions };
    setQuiz(updatedQuiz);
    await saveQuiz(updatedQuiz);
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error && !quiz) {
    return (
      <Alert variant="danger" className="m-3">
        {error}
      </Alert>
    );
  }

  if (!quiz) {
    return (
      <Alert variant="warning" className="m-3">
        Quiz not found
      </Alert>
    );
  }

  const totalPoints = calculateTotalPoints(quiz.questions || []);

  return (
    <div id="wd-quiz-editor">
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Header with Points and Status */}
      <div className="d-flex justify-content-end align-items-center mb-3">
        <span className="me-3">
          <strong>Points</strong> {totalPoints}
        </span>
        <Badge bg={quiz.published ? "success" : "secondary"} className="me-2">
          {quiz.published ? "Published" : "Not Published"}
        </Badge>
      </div>

      <hr className="mt-0" />

      {/* Tabs */}
      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k || "details")}
        className="mb-4"
      >
        {/* Details Tab */}
        <Tab eventKey="details" title="Details">
          <Form>
            {/* Quiz Title */}
            <Form.Label className="text-muted small">Quiz Title:</Form.Label>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={quiz.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Unnamed Quiz"
                className="border-secondary"
              />
            </Form.Group>

            {/* Quiz Instructions Label */}
            <Form.Label className="text-muted small">Quiz Instructions:</Form.Label>

            {/* Description textarea */}
            <Form.Group className="mb-4">
              <Form.Control
                as="textarea"
                rows={4}
                value={quiz.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter quiz instructions here..."
                className="border-secondary"
              />
            </Form.Group>

            {/* Centered section for Quiz Type, Assignment Group, Options, Assign */}
            <div className="mx-auto" style={{ maxWidth: "800px" }}>
              {/* Quiz Type */}
              <div className="d-flex align-items-center mb-3 gap-3">
                <div className="text-end flex-shrink-0" style={{ width: "150px" }}>
                  <Form.Label className="mb-0">Quiz Type</Form.Label>
                </div>
                <div className="flex-grow-1">
                  <Form.Select
                    value={quiz.settings?.quizType || "graded"}
                    onChange={(e) => handleSettingsChange("quizType", e.target.value)}
                  >
                    <option value="graded">Graded Quiz</option>
                    <option value="practice">Practice Quiz</option>
                    <option value="graded_survey">Graded Survey</option>
                    <option value="ungraded_survey">Ungraded Survey</option>
                  </Form.Select>
                </div>
              </div>

              {/* Assignment Group */}
              <div className="d-flex align-items-center mb-4 gap-3">
                <div className="text-end flex-shrink-0" style={{ width: "150px" }}>
                  <Form.Label className="mb-0">Assignment Group</Form.Label>
                </div>
                <div className="flex-grow-1">
                  <Form.Select
                    value={quiz.settings?.assignmentGroup || "quizzes"}
                    onChange={(e) =>
                      handleSettingsChange("assignmentGroup", e.target.value)
                    }
                  >
                    <option value="quizzes">QUIZZES</option>
                    <option value="exams">EXAMS</option>
                    <option value="assignments">ASSIGNMENTS</option>
                    <option value="project">PROJECT</option>
                  </Form.Select>
                </div>
              </div>

              {/* Options Section */}
              <div className="mb-4" style={{ marginLeft: "162px" }}>
                <strong>Options</strong>
                <div className="mt-3">
                  <Form.Check
                    type="checkbox"
                    id="shuffle-answers"
                    label="Shuffle Answers"
                    checked={quiz.settings?.shuffleAnswers || false}
                    onChange={(e) =>
                      handleSettingsChange("shuffleAnswers", e.target.checked)
                    }
                    className="mb-3"
                  />

                  <div className="d-flex align-items-center gap-3 mb-3">
                    <Form.Check
                      type="checkbox"
                      id="time-limit"
                      label="Time Limit"
                      checked={timeLimitEnabled}
                      onChange={(e) => {
                        if (!e.target.checked) {
                          handleSettingsChange("timeLimitMinutes", null);
                        } else {
                          handleSettingsChange("timeLimitMinutes", 20);
                        }
                      }}
                    />
                    {timeLimitEnabled && (
                      <>
                        <Form.Control
                          type="number"
                          value={quiz.settings?.timeLimitMinutes || 20}
                          onChange={(e) =>
                            handleSettingsChange(
                              "timeLimitMinutes",
                              parseInt(e.target.value) || 20
                            )
                          }
                          style={{ width: "80px" }}
                        />
                        <span>Minutes</span>
                      </>
                    )}
                  </div>

                  <Form.Check
                    type="checkbox"
                    id="multiple-attempts"
                    label="Allow Multiple Attempts"
                    checked={quiz.settings?.multipleAttempts || false}
                    onChange={(e) =>
                      handleSettingsChange("multipleAttempts", e.target.checked)
                    }
                    className="mb-3"
                  />

                  {quiz.settings?.multipleAttempts && (
                    <div className="ms-4 mb-3">
                      <Form.Label>How Many Attempts</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={quiz.settings?.maxAttempts || 1}
                        onChange={(e) =>
                          handleSettingsChange(
                            "maxAttempts",
                            parseInt(e.target.value) || 1
                          )
                        }
                        style={{ width: "80px" }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Assign Section */}
              <div className="d-flex mb-4 gap-3">
                <div className="text-end flex-shrink-0" style={{ width: "150px" }}>
                  <Form.Label className="mb-0">Assign</Form.Label>
                </div>
                <div className="flex-grow-1">
                  <div className="border rounded p-3">
                    {/* Due Date */}
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Due</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        value={
                          quiz.dueDate
                            ? new Date(quiz.dueDate).toISOString().slice(0, 16)
                            : ""
                        }
                        onChange={(e) => handleChange("dueDate", e.target.value)}
                      />
                    </Form.Group>

                    {/* Available from and Until */}
                    <div className="d-flex gap-3">
                      <Form.Group className="mb-3 flex-grow-1">
                        <Form.Label className="fw-bold">Available from</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          value={
                            quiz.availableDate
                              ? new Date(quiz.availableDate)
                                  .toISOString()
                                  .slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            handleChange("availableDate", e.target.value)
                          }
                        />
                      </Form.Group>
                      <Form.Group className="mb-3 flex-grow-1">
                        <Form.Label className="fw-bold">Until</Form.Label>
                        <Form.Control
                          type="datetime-local"
                          value={
                            quiz.untilDate
                              ? new Date(quiz.untilDate).toISOString().slice(0, 16)
                              : ""
                          }
                          onChange={(e) =>
                            handleChange("untilDate", e.target.value)
                          }
                        />
                      </Form.Group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </Tab>

        {/* Questions Tab */}
        <Tab eventKey="questions" title="Questions">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="add-question-dropdown">
                <FaPlus className="me-2" />
                New Question
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => addQuestion("mcq")}>
                  Multiple Choice
                </Dropdown.Item>
                <Dropdown.Item onClick={() => addQuestion("tf")}>
                  True/False
                </Dropdown.Item>
                <Dropdown.Item onClick={() => addQuestion("fill")}>
                  Fill in the Blank
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item disabled className="text-muted">
                  <small>+ New Question Group (Optional)</small>
                </Dropdown.Item>
                <Dropdown.Item disabled className="text-muted">
                  <small>+ Find Questions (Optional)</small>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <div className="text-muted">
              {quiz.questions?.length || 0} Question
              {quiz.questions?.length !== 1 ? "s" : ""}
            </div>
          </div>

          {/* Questions List */}
          {quiz.questions && (
            <div>
              {quiz.questions.map((question, index) => (
                <QuestionEditor
                  key={question._id}
                  question={question}
                  questionIndex={index}
                  onUpdate={(updated) => updateQuestion(question._id, updated)}
                  onDelete={() => deleteQuestion(question._id)}
                />
              ))}
            </div>
          )}
        </Tab>
      </Tabs>

      {/* Footer Action Buttons */}
      <hr />
      <div className="d-flex justify-content-center gap-3 pb-4">
        <Button
          variant="light"
          className="border px-4"
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="px-4"
          onClick={() => handleSave()}
        >
          Save
        </Button>
        <Button
          variant="success"
          className="px-4"
          onClick={() => handleSaveAndPublish()}
        >
          Save & Publish
        </Button>
      </div>
    </div>
  );
}
