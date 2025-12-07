"use client";

import Link from "next/link";
import {
  ListGroup,
  ListGroupItem,
  Dropdown,
  Badge,
} from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import QuizzesControls from "./QuizzesControls";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  findQuizzesForCourse,
  createQuizForCourse,
  deleteQuiz,
  publishQuiz,
  unpublishQuiz,
  findQuizAttempts,
} from "../../client";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

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
};

type Attempt = {
  _id: string;
  quiz: string;
  user: string;
  score: number;
  totalPoints: number;
  attemptNumber: number;
  createdAt: string;
};

export default function Quizzes() {
  const params = useParams() as { cid?: string };
  const cid = params?.cid || "";
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userAttempts, setUserAttempts] = useState<Record<string, Attempt[]>>(
    {}
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const data = await findQuizzesForCourse(cid);
      setQuizzes(data || []);

      // If student, fetch their attempts for each quiz
      if (!isFaculty && data && data.length > 0) {
        const attemptsMap: Record<string, Attempt[]> = {};
        for (const quiz of data) {
          try {
            const attempts = await findQuizAttempts(cid, quiz._id);
            attemptsMap[quiz._id] = attempts || [];
          } catch {
            attemptsMap[quiz._id] = [];
          }
        }
        setUserAttempts(attemptsMap);
      }
    } catch (err) {
      console.error("Error fetching quizzes:", err);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid, currentUser]);

  const handleCreateQuiz = async () => {
    try {
      const newQuiz = {
        title: "New Quiz",
        description: "Quiz Description",
        points: 0,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        availableDate: new Date().toISOString().split("T")[0],
        untilDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        published: false,
        questions: [],
        settings: {
          quizType: "graded",
          shuffleAnswers: true,
          timeLimitMinutes: 20,
          multipleAttempts: false,
          maxAttempts: 1,
          showCorrectAnswers: false,
          accessCode: "",
          oneQuestionAtATime: true,
          webcamRequired: false,
          lockQuestionsAfterAnswering: false,
        },
      };
      const created = await createQuizForCourse(cid, newQuiz);
      setQuizzes([...quizzes, created]);
      router.push(`/Courses/${cid}/Quizzes/${created._id}`);
    } catch (err) {
      console.error("Error creating quiz:", err);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm("Are you sure you want to delete this quiz?")) return;
    try {
      await deleteQuiz(cid, quizId);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };

  const handleTogglePublish = async (quiz: Quiz) => {
    try {
      if (quiz.published) {
        const updated = await unpublishQuiz(cid, quiz._id);
        setQuizzes(
          quizzes.map((q) =>
            q._id === quiz._id ? { ...q, published: false } : q
          )
        );
      } else {
        const updated = await publishQuiz(cid, quiz._id);
        setQuizzes(
          quizzes.map((q) =>
            q._id === quiz._id ? { ...q, published: true } : q
          )
        );
      }
    } catch (err) {
      console.error("Error toggling publish:", err);
    }
  };

  const getAvailabilityStatus = (quiz: Quiz) => {
    const now = new Date();
    const availableDate = quiz.availableDate
      ? new Date(quiz.availableDate)
      : null;
    const untilDate = quiz.untilDate ? new Date(quiz.untilDate) : null;

    if (untilDate && now > untilDate) {
      return { status: "Closed", className: "text-muted" };
    }
    if (availableDate && now < availableDate) {
      return {
        status: `Not available until ${formatDate(quiz.availableDate)}`,
        className: "text-muted",
      };
    }
    if (
      availableDate &&
      untilDate &&
      now >= availableDate &&
      now <= untilDate
    ) {
      return { status: "Available", className: "text-success" };
    }
    if (availableDate && now >= availableDate && !untilDate) {
      return { status: "Available", className: "text-success" };
    }
    return { status: "Available", className: "text-success" };
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLastAttemptScore = (quizId: string) => {
    const attempts = userAttempts[quizId];
    if (!attempts || attempts.length === 0) return null;
    // Get the most recent attempt
    const sorted = [...attempts].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return sorted[0];
  };

  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="wd-quizzes">
      <QuizzesControls
        onAddQuiz={handleCreateQuiz}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        isFaculty={isFaculty}
      />
      <hr />

      {filteredQuizzes.length === 0 ? (
        <div className="text-center text-muted py-5">
          <RiFileList3Line size={48} className="mb-3 opacity-50" />
          <p className="fs-5">No quizzes yet</p>
          {isFaculty && (
            <p>
              Click the <strong>+ Quiz</strong> button above to create your
              first quiz.
            </p>
          )}
        </div>
      ) : (
        <ListGroup className="rounded-0" id="wd-quizzes-list">
          <ListGroupItem className="wd-quiz-group p-0 mb-4 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                Assignment Quizzes
              </div>
            </div>

            <ListGroup className="wd-quiz-items rounded-0">
              {filteredQuizzes.map((quiz) => {
                const availability = getAvailabilityStatus(quiz);
                const questionsCount = quiz.questions?.length || 0;
                const lastAttempt = !isFaculty
                  ? getLastAttemptScore(quiz._id)
                  : null;

                return (
                  <ListGroupItem
                    key={quiz._id}
                    className="wd-quiz-list-item p-3 ps-1 d-flex justify-content-between align-items-start"
                  >
                    <div className="d-flex align-items-start w-100">
                      <BsGripVertical className="me-2 fs-3 mt-1" />
                      <RiFileList3Line className="me-3 fs-3 text-success mt-1" />

                      <div className="flex-grow-1">
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <Link
                            href={isFaculty ? `/Courses/${cid}/Quizzes/${quiz._id}` : `/Courses/${cid}/Quizzes/${quiz._id}/take`}
                            className="wd-quiz-link text-decoration-none text-dark fw-bold"
                          >
                            {quiz.title}
                          </Link>

                          {/* Publish/Unpublish toggle icon */}
                          {isFaculty && (
                            <span
                              role="button"
                              onClick={(e) => {
                                e.preventDefault();
                                handleTogglePublish(quiz);
                              }}
                              title={
                                quiz.published
                                  ? "Click to unpublish"
                                  : "Click to publish"
                              }
                              className="ms-2"
                              style={{ cursor: "pointer" }}
                            >
                              {quiz.published ? (
                                <span className="text-success fs-5">✅</span>
                              ) : (
                                <span className="text-danger fs-5">🚫</span>
                              )}
                            </span>
                          )}
                        </div>

                        <div className="wd-quiz-details small text-muted">
                          <span className={availability.className}>
                            <strong>{availability.status}</strong>
                          </span>
                          {" | "}
                          <strong>Due</strong> {formatDate(quiz.dueDate)}
                          {" | "}
                          {quiz.points || 0} pts
                          {" | "}
                          {questionsCount} Question
                          {questionsCount !== 1 ? "s" : ""}
                          {/* Show score for students */}
                          {lastAttempt && (
                            <>
                              {" | "}
                              <Badge bg="info">
                                Score: {lastAttempt.score}/
                                {lastAttempt.totalPoints}
                              </Badge>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Context menu for faculty */}
                    {isFaculty && (
                      <Dropdown align="end">
                        <Dropdown.Toggle
                          variant="link"
                          className="text-dark p-0 border-0"
                          id={`quiz-dropdown-${quiz._id}`}
                        >
                          <BsThreeDotsVertical className="fs-4" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              router.push(`/Courses/${cid}/Quizzes/${quiz._id}`)
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteQuiz(quiz._id)}
                            className="text-danger"
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item
                            onClick={() => handleTogglePublish(quiz)}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      )}
    </div>
  );
}

