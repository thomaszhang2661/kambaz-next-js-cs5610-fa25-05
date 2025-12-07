"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Table, Badge, Alert } from "react-bootstrap";
import { FaPencilAlt, FaEye } from "react-icons/fa";
import { getQuiz, publishQuiz, unpublishQuiz } from "../../../client";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

type Quiz = {
  _id: string;
  course: string;
  title: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
  published?: boolean;
  questions?: any[];
  settings?: {
    quizType?: string;
    assignmentGroup?: string;
    shuffleAnswers?: boolean;
    timeLimitMinutes?: number;
    multipleAttempts?: boolean;
    maxAttempts?: number;
    showCorrectAnswers?: string;
    accessCode?: string;
    oneQuestionAtATime?: boolean;
    webcamRequired?: boolean;
    lockQuestionsAfterAnswering?: boolean;
  };
};

export default function QuizDetails() {
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

  const isFaculty = currentUser?.role === "FACULTY";

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

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatQuizType = (type?: string) => {
    const types: Record<string, string> = {
      graded: "Graded Quiz",
      practice: "Practice Quiz",
      graded_survey: "Graded Survey",
      ungraded_survey: "Ungraded Survey",
    };
    return types[type || "graded"] || "Graded Quiz";
  };

  const formatAssignmentGroup = (group?: string) => {
    const groups: Record<string, string> = {
      quizzes: "Quizzes",
      exams: "Exams",
      assignments: "Assignments",
      project: "Project",
    };
    return groups[group || "quizzes"] || "Quizzes";
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

  if (error) {
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

  const questionsCount = quiz.questions?.length || 0;
  const totalPoints =
    quiz.points ||
    (quiz.questions || []).reduce((sum, q) => sum + (q.points || 0), 0);

  return (
    <div id="wd-quiz-details">
      {/* Action Buttons for Faculty */}
      {isFaculty && (
        <div className="d-flex justify-content-center gap-3 mb-4">
          <Button
            variant="outline-secondary"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/preview`)
            }
          >
            <FaEye className="me-2" />
            Preview
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            <FaPencilAlt className="me-2" />
            Edit
          </Button>
        </div>
      )}

      {/* Start Quiz Button for Students */}
      {!isFaculty && (
        <div className="d-flex justify-content-center mb-4">
          <Button
            variant="danger"
            size="lg"
            onClick={() =>
              router.push(`/Courses/${cid}/Quizzes/${qid}/take`)
            }
          >
            Start Quiz
          </Button>
        </div>
      )}

      <hr />

      {/* Quiz Title */}
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="mb-0">{quiz.title}</h2>
        {isFaculty && (
          <Badge bg={quiz.published ? "success" : "secondary"}>
            {quiz.published ? "Published" : "Unpublished"}
          </Badge>
        )}
      </div>

      {/* Quiz Properties Summary Table */}
      <Card>
        <Card.Body>
          <Table borderless className="mb-0">
            <tbody>
              <tr>
                <td className="fw-bold text-end" style={{ width: "250px" }}>
                  Quiz Type
                </td>
                <td>{formatQuizType(quiz.settings?.quizType)}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Points</td>
                <td>{totalPoints}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Assignment Group</td>
                <td>{formatAssignmentGroup(quiz.settings?.assignmentGroup)}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Shuffle Answers</td>
                <td>{quiz.settings?.shuffleAnswers !== false ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Time Limit</td>
                <td>{quiz.settings?.timeLimitMinutes || 20} Minutes</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Multiple Attempts</td>
                <td>{quiz.settings?.multipleAttempts ? "Yes" : "No"}</td>
              </tr>
              {quiz.settings?.multipleAttempts && (
                <tr>
                  <td className="fw-bold text-end">How Many Attempts</td>
                  <td>{quiz.settings?.maxAttempts || 1}</td>
                </tr>
              )}
              <tr>
                <td className="fw-bold text-end">Show Correct Answers</td>
                <td>{quiz.settings?.showCorrectAnswers || "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Access Code</td>
                <td>{quiz.settings?.accessCode || "None"}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">One Question at a Time</td>
                <td>{quiz.settings?.oneQuestionAtATime !== false ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Webcam Required</td>
                <td>{quiz.settings?.webcamRequired ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td className="fw-bold text-end">Lock Questions After Answering</td>
                <td>{quiz.settings?.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
              </tr>
            </tbody>
          </Table>

          <hr />

          <Table borderless className="mb-0">
            <thead>
              <tr>
                <th className="text-center">Due</th>
                <th className="text-center">For</th>
                <th className="text-center">Available from</th>
                <th className="text-center">Until</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-center">{formatDate(quiz.dueDate)}</td>
                <td className="text-center">Everyone</td>
                <td className="text-center">{formatDate(quiz.availableDate)}</td>
                <td className="text-center">{formatDate(quiz.untilDate)}</td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Quiz Description/Instructions */}
      {quiz.description && (
        <Card className="mt-4">
          <Card.Header className="bg-light">
            <h5 className="mb-0">Instructions</h5>
          </Card.Header>
          <Card.Body>
            <div dangerouslySetInnerHTML={{ __html: quiz.description }} />
          </Card.Body>
        </Card>
      )}

      {/* Questions count for faculty */}
      {isFaculty && (
        <div className="mt-4 text-muted">
          <strong>Number of Questions:</strong> {questionsCount}
        </div>
      )}
    </div>
  );
}
