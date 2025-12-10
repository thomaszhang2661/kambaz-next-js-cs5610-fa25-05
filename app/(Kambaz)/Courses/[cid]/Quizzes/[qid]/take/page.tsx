"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Form,
  Alert,
  ListGroup,
  Badge,
} from "react-bootstrap";
import { FaClock, FaCheck, FaTimes, FaPencilAlt } from "react-icons/fa";
import {
  getQuiz,
  submitQuizAttempt,
  findQuizAttempts,
} from "../../../../client";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

type Choice = {
  _id: string;
  text: string;
  isCorrect?: boolean;
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

type Quiz = {
  _id: string;
  title: string;
  description?: string;
  questions?: Question[];
  settings?: {
    oneQuestionAtATime?: boolean;
    shuffleAnswers?: boolean;
    showCorrectAnswers?: string;
    timeLimitMinutes?: number;
    multipleAttempts?: boolean;
    maxAttempts?: number;
    accessCode?: string;
    lockQuestionsAfterAnswering?: boolean;
  };
};

type AttemptAnswer = {
  questionId: string;
  answer: any;
};

type Attempt = {
  _id: string;
  quiz: string;
  user: string;
  answers: AttemptAnswer[];
  score: number;
  totalPoints: number;
  attemptNumber: number;
  createdAt: string;
};

export default function QuizTakeOrPreview() {
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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [submitting, setSubmitting] = useState(false);
  const [previousAttempts, setPreviousAttempts] = useState<Attempt[]>([]);
  const [lastAttempt, setLastAttempt] = useState<Attempt | null>(null);
  const [viewingResults, setViewingResults] = useState(false);
  const [previewSubmitted, setPreviewSubmitted] = useState(false);
  const [previewScore, setPreviewScore] = useState<{ score: number; total: number } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [startTime] = useState(new Date());
  const [shuffledChoices, setShuffledChoices] = useState<Record<string, Choice[]>>({});

  const isFaculty = currentUser?.role === "FACULTY";

  // Shuffle function using Fisher-Yates algorithm
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Get choices for a question (shuffled if enabled, original otherwise)
  const getChoicesForQuestion = (question: Question): Choice[] => {
    if (quiz?.settings?.shuffleAnswers && shuffledChoices[question._id]) {
      return shuffledChoices[question._id];
    }
    return question.choices || [];
  };

  const fetchQuizAndAttempts = async () => {
    if (!cid || !qid) return;
    try {
      setLoading(true);
      const quizData = await getQuiz(cid, qid);
      setQuiz(quizData);

      // Initialize shuffled choices if shuffleAnswers is enabled
      if (quizData.settings?.shuffleAnswers && quizData.questions) {
        const shuffled: Record<string, Choice[]> = {};
        quizData.questions.forEach((question: Question) => {
          if (question.choices && question.choices.length > 0) {
            shuffled[question._id] = shuffleArray(question.choices);
          }
        });
        setShuffledChoices(shuffled);
      }

      // Set time limit (only for students, faculty preview has no time limit)
      if (!isFaculty && quizData.settings?.timeLimitMinutes) {
        setTimeRemaining(quizData.settings.timeLimitMinutes * 60);
      }

      // Fetch previous attempts for students only
      if (!isFaculty) {
        try {
          const attempts = await findQuizAttempts(cid, qid);
          setPreviousAttempts(attempts || []);

          // Get the most recent attempt
          if (attempts && attempts.length > 0) {
            const sorted = [...attempts].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setLastAttempt(sorted[0]);
            // If they have attempts, show results by default
            setViewingResults(true);
          }
        } catch {
          // Ignore if can't fetch attempts
        }
      }

      setError(null);
    } catch (err: any) {
      console.error("Error fetching quiz:", err);
      setError(err.response?.data?.error || "Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizAndAttempts();
  }, [cid, qid, currentUser]);

  // Timer effect (students only)
  useEffect(() => {
    if (isFaculty || timeRemaining === null || timeRemaining <= 0 || viewingResults) {
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev === null || prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, viewingResults, isFaculty]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  // Calculate score locally (for faculty preview)
  const calculatePreviewScore = () => {
    if (!quiz?.questions) return { score: 0, total: 0 };

    let score = 0;
    let total = 0;

    for (const question of quiz.questions) {
      total += question.points || 0;
      const userAnswer = answers[question._id];

      if (question.type === "mcq" || question.type === "tf") {
        const correctChoice = question.choices?.find((c) => c.isCorrect);
        if (correctChoice && userAnswer === correctChoice._id) {
          score += question.points || 0;
        }
      } else if (question.type === "fill") {
        // Check if all blanks are answered correctly
        const blanks = question.blanks || [];
        let allBlanksCorrect = blanks.length > 0;
        
        for (const blank of blanks) {
          const userBlankAnswer = (userAnswer as any)?.[blank._id];
          const correctAnswers = blank.answers || [];
          const isBlankCorrect = correctAnswers.some(
            (ans) =>
              ans.toLowerCase().trim() ===
              String(userBlankAnswer || "").toLowerCase().trim()
          );
          if (!isBlankCorrect) {
            allBlanksCorrect = false;
            break;
          }
        }
        
        if (allBlanksCorrect) {
          score += question.points || 0;
        }
      }
    }

    return { score, total };
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    if (isFaculty) {
      // Faculty preview - just calculate score locally, don't persist
      const result = calculatePreviewScore();
      setPreviewScore(result);
      setPreviewSubmitted(true);
    } else {
      // Student - persist to database
      try {
        setSubmitting(true);

        const formattedAnswers = Object.entries(answers).map(
          ([questionId, answer]) => ({
            questionId,
            answer,
          })
        );

        const response = await submitQuizAttempt(cid, qid, formattedAnswers);

        const newAttempt: Attempt = {
          ...response.attempt,
          score: response.score,
          totalPoints: response.total,
        };
        setPreviousAttempts([...previousAttempts, newAttempt]);
        setLastAttempt(newAttempt);
        setViewingResults(true);
      } catch (err: any) {
        console.error("Error submitting quiz:", err);
        setError(err.response?.data?.error || "Failed to submit quiz");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const canTakeQuiz = () => {
    if (!quiz) return false;
    if (isFaculty) return true;

    if (!quiz.settings?.multipleAttempts) {
      return previousAttempts.length === 0;
    }
    const maxAttempts = quiz.settings.maxAttempts || 1;
    return previousAttempts.length < maxAttempts;
  };

  const startNewAttempt = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setViewingResults(false);
    setPreviewSubmitted(false);
    setPreviewScore(null);
    if (!isFaculty && quiz?.settings?.timeLimitMinutes) {
      setTimeRemaining(quiz.settings.timeLimitMinutes * 60);
    }
  };

  const getAnswerFromAttempt = (questionId: string) => {
    if (!lastAttempt) return null;
    const answer = lastAttempt.answers?.find((a) => a.questionId === questionId);
    return answer?.answer;
  };

  const isAnswerCorrect = (question: Question, userAnswer: any) => {
    if (!userAnswer) return false;

    if (question.type === "mcq" || question.type === "tf") {
      const correctChoice = question.choices?.find((c) => c.isCorrect);
      return correctChoice?._id === userAnswer;
    } else if (question.type === "fill") {
      // Check if all blanks are answered correctly
      const blanks = question.blanks || [];
      if (blanks.length === 0) return false;
      
      for (const blank of blanks) {
        const userBlankAnswer = (userAnswer as any)?.[blank._id];
        const correctAnswers = blank.answers || [];
        const isBlankCorrect = correctAnswers.some(
          (ans) =>
            ans.toLowerCase().trim() ===
            String(userBlankAnswer || "").toLowerCase().trim()
        );
        if (!isBlankCorrect) {
          return false;
        }
      }
      return true;
    }
    return false;
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
        <div className="mt-3">
          <Button
            variant="outline-danger"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Back to Quizzes
          </Button>
        </div>
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

  const questions = quiz.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  // ==================== FACULTY PREVIEW RESULTS ====================
  if (isFaculty && previewSubmitted && previewScore) {
    return (
      <div id="wd-quiz-preview-results">
        <h2>{quiz.title}</h2>

        <Alert variant="warning" className="d-flex align-items-center gap-2">
          <span>⚠</span>
          This is a preview of the published version of the quiz
        </Alert>

        <Card className="mb-4">
          <Card.Body className="text-center py-4">
            <h4>Preview Complete</h4>
            <h3 className="mt-3">
              Score: {previewScore.score} / {previewScore.total} (
              {((previewScore.score / previewScore.total) * 100).toFixed(0)}%)
            </h3>
          </Card.Body>
        </Card>

        {/* Questions Review */}
        {questions.map((question, index) => {
          const userAnswer = answers[question._id];
          const correct = isAnswerCorrect(question, userAnswer);
          const correctChoice = question.choices?.find((c) => c.isCorrect);
          const correctAnswer =
            question.type === "fill"
              ? (question.blanks || []).map((blank, idx) => 
                  `Blank ${idx + 1}: ${blank.answers?.join(" or ") || ""}`
                ).join("; ")
              : correctChoice?.text || "";

          return (
            <Card
              key={question._id}
              className={`mb-3 border-2 ${correct ? "border-success" : "border-danger"}`}
            >
              <Card.Header
                className={`d-flex justify-content-between ${
                  correct ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"
                }`}
              >
                <span className="d-flex align-items-center gap-2">
                  {correct ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                  <strong>Question {index + 1}</strong>
                </span>
                <span>
                  {correct ? question.points : 0} / {question.points} pts
                </span>
              </Card.Header>
              <Card.Body>
                <p className="mb-3">{question.body || question.title}</p>

                {(question.type === "mcq" || question.type === "tf") && (
                  <div>
                    {getChoicesForQuestion(question).map((choice) => {
                      const isUserAnswer = choice._id === userAnswer;
                      const isCorrectChoice = choice.isCorrect;
                      return (
                        <div
                          key={choice._id}
                          className={`p-2 mb-1 rounded ${
                            isUserAnswer && isCorrectChoice
                              ? "bg-success bg-opacity-10"
                              : isUserAnswer && !isCorrectChoice
                              ? "bg-danger bg-opacity-10"
                              : isCorrectChoice
                              ? "bg-success bg-opacity-10"
                              : ""
                          }`}
                        >
                          <Form.Check
                            type="radio"
                            checked={isUserAnswer}
                            disabled
                            label={
                              <span>
                                {choice.text}
                                {isCorrectChoice && (
                                  <span className="text-success ms-2">
                                    <FaCheck /> Correct
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectChoice && (
                                  <span className="text-danger ms-2">
                                    <FaTimes /> Your answer
                                  </span>
                                )}
                              </span>
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.type === "fill" && (
                  <div>
                    {(question.blanks || []).map((blank, blankIdx) => {
                      const userBlankAnswer = (userAnswer as any)?.[blank._id] || "(no answer)";
                      const isBlankCorrect = blank.answers?.some(
                        (ans) =>
                          ans.toLowerCase().trim() ===
                          String((userAnswer as any)?.[blank._id] || "").toLowerCase().trim()
                      );
                      return (
                        <div key={blank._id} className="mb-2">
                          <p className="mb-1">
                            <strong>Blank {blankIdx + 1} - Your answer:</strong>{" "}
                            <span className={isBlankCorrect ? "text-success" : "text-danger"}>
                              {userBlankAnswer}
                            </span>
                          </p>
                          {!isBlankCorrect && (
                            <p className="text-success mb-0 ms-3">
                              <small>Correct: {blank.answers?.join(" or ")}</small>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="link"
            className="text-decoration-none p-0"
            onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
          >
            <FaPencilAlt className="me-2" />
            Edit
          </Button>
          <Button variant="outline-secondary" onClick={startNewAttempt}>
            Retake Preview
          </Button>
        </div>
      </div>
    );
  }

  // ==================== STUDENT VIEWING RESULTS ====================
  if (!isFaculty && viewingResults && lastAttempt) {
    return (
      <div id="wd-quiz-results">
        <h2>{quiz.title}</h2>

        <Card className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Attempt {lastAttempt.attemptNumber}</strong>
                <div className="text-muted small">
                  Submitted: {formatDateTime(lastAttempt.createdAt)}
                </div>
              </div>
              <div className="text-end">
                <h4 className="mb-0">
                  Score: {lastAttempt.score} / {lastAttempt.totalPoints}
                </h4>
                <Badge
                  bg={
                    lastAttempt.score / lastAttempt.totalPoints >= 0.7
                      ? "success"
                      : lastAttempt.score / lastAttempt.totalPoints >= 0.5
                      ? "warning"
                      : "danger"
                  }
                >
                  {((lastAttempt.score / lastAttempt.totalPoints) * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Questions with Results */}
        {questions.map((question, index) => {
          const userAnswer = getAnswerFromAttempt(question._id);
          const correct = isAnswerCorrect(question, userAnswer);
          const correctChoice = question.choices?.find((c) => c.isCorrect);
          const correctAnswer =
            question.type === "fill"
              ? (question.blanks || []).map((blank, idx) => 
                  `Blank ${idx + 1}: ${blank.answers?.join(" or ") || ""}`
                ).join("; ")
              : correctChoice?.text || "";

          return (
            <Card
              key={question._id}
              className={`mb-3 border-2 ${correct ? "border-success" : "border-danger"}`}
            >
              <Card.Header
                className={`d-flex justify-content-between ${
                  correct ? "bg-success bg-opacity-10" : "bg-danger bg-opacity-10"
                }`}
              >
                <span className="d-flex align-items-center gap-2">
                  {correct ? (
                    <FaCheck className="text-success" />
                  ) : (
                    <FaTimes className="text-danger" />
                  )}
                  <strong>Question {index + 1}</strong>
                </span>
                <span>
                  {correct ? question.points : 0} / {question.points} pts
                </span>
              </Card.Header>
              <Card.Body>
                <p className="mb-3">{question.body || question.title}</p>

                {(question.type === "mcq" || question.type === "tf") && (
                  <div>
                    {getChoicesForQuestion(question).map((choice) => {
                      const isUserAnswer = choice._id === userAnswer;
                      const isCorrectChoice = choice.isCorrect;
                      return (
                        <div
                          key={choice._id}
                          className={`p-2 mb-1 rounded ${
                            isUserAnswer && isCorrectChoice
                              ? "bg-success bg-opacity-10"
                              : isUserAnswer && !isCorrectChoice
                              ? "bg-danger bg-opacity-10"
                              : isCorrectChoice
                              ? "bg-success bg-opacity-10"
                              : ""
                          }`}
                        >
                          <Form.Check
                            type="radio"
                            checked={isUserAnswer}
                            disabled
                            label={
                              <span>
                                {choice.text}
                                {isCorrectChoice && (
                                  <span className="text-success ms-2">
                                    <FaCheck /> Correct
                                  </span>
                                )}
                                {isUserAnswer && !isCorrectChoice && (
                                  <span className="text-danger ms-2">
                                    <FaTimes /> Your answer
                                  </span>
                                )}
                              </span>
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.type === "fill" && (
                  <div>
                    {(question.blanks || []).map((blank, blankIdx) => {
                      const userBlankAnswer = (userAnswer as any)?.[blank._id] || "(no answer)";
                      const isBlankCorrect = blank.answers?.some(
                        (ans) =>
                          ans.toLowerCase().trim() ===
                          String((userAnswer as any)?.[blank._id] || "").toLowerCase().trim()
                      );
                      return (
                        <div key={blank._id} className="mb-2">
                          <p className="mb-1">
                            <strong>Blank {blankIdx + 1} - Your answer:</strong>{" "}
                            <span className={isBlankCorrect ? "text-success" : "text-danger"}>
                              {userBlankAnswer}
                            </span>
                          </p>
                          {!isBlankCorrect && (
                            <p className="text-success mb-0 ms-3">
                              <small>Correct: {blank.answers?.join(" or ")}</small>
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card.Body>
            </Card>
          );
        })}

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="outline-secondary"
            onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
          >
            Back to Quizzes
          </Button>

          {canTakeQuiz() && (
            <Button variant="danger" onClick={startNewAttempt}>
              Take Quiz Again
              {quiz.settings?.multipleAttempts && (
                <span className="ms-2">
                  (Attempt {previousAttempts.length + 1} of{" "}
                  {quiz.settings.maxAttempts || "∞"})
                </span>
              )}
            </Button>
          )}
        </div>

        {!canTakeQuiz() && (
          <Alert variant="info" className="mt-3">
            You have used all {quiz.settings?.maxAttempts || 1} attempt(s) for
            this quiz.
          </Alert>
        )}
      </div>
    );
  }

  if (!isFaculty && !canTakeQuiz()) {
    return (
      <div className="text-center py-5">
        <Alert variant="warning">
          <h4>Maximum Attempts Reached</h4>
          <p>
            You have used all {quiz.settings?.maxAttempts || 1} attempt(s) for
            this quiz.
          </p>
          {lastAttempt && (
            <p>
              Your last score: {lastAttempt.score} / {lastAttempt.totalPoints}
            </p>
          )}
        </Alert>
        <Button
          variant="outline-secondary"
          onClick={() => router.push(`/Courses/${cid}/Quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    );
  }

  return (
    <div id="wd-quiz-take">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>{quiz.title}</h2>
        {!isFaculty && timeRemaining !== null && (
          <div
            className={`d-flex align-items-center gap-2 fs-5 ${
              timeRemaining < 60 ? "text-danger fw-bold" : ""
            }`}
          >
            <FaClock />
            {formatTime(timeRemaining)}
          </div>
        )}
      </div>

      {/* Faculty Preview Notice */}
      {isFaculty && (
        <Alert variant="warning" className="d-flex align-items-center gap-2">
          <span>⚠</span>
          This is a preview of the published version of the quiz
        </Alert>
      )}

      <p className="text-muted">Started: {startTime.toLocaleString()}</p>

      {quiz.description && (
        <Card className="mb-4 bg-light">
          <Card.Body>
            <strong>Instructions:</strong>
            <p className="mb-0 mt-2">{quiz.description}</p>
          </Card.Body>
        </Card>
      )}

      <div className="d-flex gap-4">
        {/* Main Content */}
        <div style={{ flex: 1 }}>
          {currentQuestion && (
            <Card className="mb-4">
              <Card.Header className="d-flex justify-content-between bg-light">
                <strong>Question {currentQuestionIndex + 1}</strong>
                <span>{currentQuestion.points} pts</span>
              </Card.Header>
              <Card.Body>
                <div className="mb-4 p-3 bg-light rounded">
                  <p className="mb-0">{currentQuestion.body || currentQuestion.title}</p>
                </div>

                {currentQuestion.type === "mcq" && (
                  <div>
                    {getChoicesForQuestion(currentQuestion).map((choice) => (
                      <Form.Check
                        key={choice._id}
                        type="radio"
                        id={`${currentQuestion._id}-${choice._id}`}
                        name={currentQuestion._id}
                        label={choice.text}
                        checked={answers[currentQuestion._id] === choice._id}
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, choice._id)
                        }
                        className="mb-2"
                      />
                    ))}
                  </div>
                )}

                {currentQuestion.type === "tf" && (
                  <div>
                    {getChoicesForQuestion(currentQuestion).map((choice) => (
                      <Form.Check
                        key={choice._id}
                        type="radio"
                        id={`${currentQuestion._id}-${choice._id}`}
                        name={currentQuestion._id}
                        label={choice.text}
                        checked={answers[currentQuestion._id] === choice._id}
                        onChange={() =>
                          handleAnswerChange(currentQuestion._id, choice._id)
                        }
                        className="mb-2"
                      />
                    ))}
                  </div>
                )}

                {currentQuestion.type === "fill" && (
                  <div>
                    {(currentQuestion.blanks || []).map((blank, blankIdx) => (
                      <div key={blank._id} className="mb-3">
                        <Form.Label>
                          <strong>Blank {blankIdx + 1}:</strong>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={
                            (answers[currentQuestion._id] as any)?.[blank._id] || ""
                          }
                          onChange={(e) => {
                            const currentAnswers = answers[currentQuestion._id] || {};
                            handleAnswerChange(currentQuestion._id, {
                              ...currentAnswers,
                              [blank._id]: e.target.value,
                            });
                          }}
                          placeholder={`Enter answer for blank ${blankIdx + 1}...`}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}

          {/* Navigation */}
          <div className="d-flex justify-content-between mb-4">
            <Button
              variant="outline-secondary"
              onClick={() =>
                setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
              }
              disabled={currentQuestionIndex === 0}
            >
              ◄ Previous
            </Button>

            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                variant="outline-secondary"
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
              >
                Next ►
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Quiz"}
              </Button>
            )}
          </div>

          {/* Faculty Edit Link */}
          {isFaculty && (
            <div className="mb-4">
              <Button
                variant="link"
                className="text-decoration-none p-0"
                onClick={() => router.push(`/Courses/${cid}/Quizzes/${qid}/edit`)}
              >
                <FaPencilAlt className="me-2" />
                Edit
              </Button>
            </div>
          )}
        </div>

        {/* Questions Sidebar */}
        <div style={{ width: "200px" }}>
          <h5>Questions</h5>
          <ListGroup>
            {questions.map((q, index) => (
              <ListGroup.Item
                key={q._id}
                action
                active={index === currentQuestionIndex}
                onClick={() => setCurrentQuestionIndex(index)}
                className="d-flex align-items-center gap-2"
              >
                <span
                  className={`rounded-circle d-inline-flex align-items-center justify-content-center ${
                    answers[q._id] ? "bg-secondary text-white" : "border"
                  }`}
                  style={{ width: "20px", height: "20px", fontSize: "12px" }}
                >
                  {answers[q._id] ? "✓" : "?"}
                </span>
                Question {index + 1}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <div className="mt-4">
            <Button
              variant="danger"
              className="w-100"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
