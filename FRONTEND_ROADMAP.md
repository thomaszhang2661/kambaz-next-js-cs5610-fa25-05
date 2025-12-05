# 🗺️ Kambaz Quizzes 前端实现路线图

**创建日期**: 2025-12-04  
**优先级**: 完成课程作业所必需

---

## 📌 概览

后端已 100% 完成，现在需要实现前端 UI。本文档提供详细的实现路线图和代码示例。

---

## 🎯 阶段 1: 项目基础设置 (2-3 小时)

### 1.1 创建目录结构

```bash
mkdir -p app/\(Kambaz\)/Quizzes/{[qid]/{edit,preview,attempt},Database}
```

### 1.2 创建基础文件

**app/(Kambaz)/Quizzes/client.ts** - API 调用层

```typescript
// API endpoints
export const quizzesApi = {
  // List
  getQuizzes: (courseId: string) =>
    fetch(`/api/courses/${courseId}/quizzes`).then((r) => r.json()),

  // Create
  createQuiz: (courseId: string, quiz: any) =>
    fetch(`/api/courses/${courseId}/quizzes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quiz),
    }).then((r) => r.json()),

  // Get
  getQuiz: (quizId: string) =>
    fetch(`/api/quizzes/${quizId}`).then((r) => r.json()),

  // Update
  updateQuiz: (quizId: string, updates: any) =>
    fetch(`/api/quizzes/${quizId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    }).then((r) => r.json()),

  // Delete
  deleteQuiz: (quizId: string) =>
    fetch(`/api/quizzes/${quizId}`, { method: "DELETE" }).then((r) => r.json()),

  // Publish
  publishQuiz: (quizId: string) =>
    fetch(`/api/quizzes/${quizId}/publish`, { method: "POST" }).then((r) =>
      r.json()
    ),

  // Unpublish
  unpublishQuiz: (quizId: string) =>
    fetch(`/api/quizzes/${quizId}/unpublish`, { method: "POST" }).then((r) =>
      r.json()
    ),

  // Attempts
  submitAttempt: (quizId: string, answers: any) =>
    fetch(`/api/quizzes/${quizId}/attempts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    }).then((r) => r.json()),

  getAttempts: (quizId: string) =>
    fetch(`/api/quizzes/${quizId}/attempts`).then((r) => r.json()),

  getAttempt: (quizId: string, attemptId: string) =>
    fetch(`/api/quizzes/${quizId}/attempts/${attemptId}`).then((r) => r.json()),
};
```

**app/(Kambaz)/Quizzes/reducer.ts** - 状态管理

```typescript
export const quizzesReducer = (state: any, action: any) => {
  switch (action.type) {
    case "LOAD_QUIZZES":
      return { ...state, quizzes: action.payload, loading: false };

    case "ADD_QUIZ":
      return {
        ...state,
        quizzes: [...state.quizzes, action.payload],
      };

    case "UPDATE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.map((q: any) =>
          q._id === action.payload._id ? action.payload : q
        ),
      };

    case "DELETE_QUIZ":
      return {
        ...state,
        quizzes: state.quizzes.filter((q: any) => q._id !== action.payload),
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};
```

---

## 🎯 阶段 2: Quiz 列表屏幕 (3-4 小时)

### 2.1 **app/(Kambaz)/Quizzes/page.tsx** - Quiz 列表

```typescript
"use client";
import { useReducer, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { quizzesApi } from "./client";
import { quizzesReducer } from "./reducer";

export default function QuizzesPage() {
  const params = useParams();
  const cid = params.cid as string;
  const [state, dispatch] = useReducer(quizzesReducer, {
    quizzes: [],
    loading: true,
  });
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Get current user
    fetch("/api/users/session")
      .then((r) => r.json())
      .then((data) => setUser(data.currentUser));

    // Load quizzes
    quizzesApi
      .getQuizzes(cid)
      .then((quizzes) => {
        dispatch({ type: "LOAD_QUIZZES", payload: quizzes });
      })
      .catch((err) => console.error(err));
  }, [cid]);

  const handleAddQuiz = async () => {
    const newQuiz = await quizzesApi.createQuiz(cid, {
      title: "New Quiz",
      course: cid,
      published: false,
      questions: [],
      settings: {
        multipleAttempts: false,
        maxAttempts: 1,
        shuffleAnswers: true,
        timeLimitMinutes: 20,
        oneQuestionAtATime: true,
      },
    });
    dispatch({ type: "ADD_QUIZ", payload: newQuiz });
  };

  const handleDelete = async (qid: string) => {
    if (confirm("Delete this quiz?")) {
      await quizzesApi.deleteQuiz(qid);
      dispatch({ type: "DELETE_QUIZ", payload: qid });
    }
  };

  const handlePublish = async (qid: string) => {
    const updated = await quizzesApi.publishQuiz(qid);
    dispatch({ type: "UPDATE_QUIZ", payload: updated });
  };

  const handleUnpublish = async (qid: string) => {
    const updated = await quizzesApi.unpublishQuiz(qid);
    dispatch({ type: "UPDATE_QUIZ", payload: updated });
  };

  if (state.loading) return <div>Loading...</div>;

  const isFaculty = user?.role === "FACULTY";

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Quizzes</h1>
        {isFaculty && (
          <button className="btn btn-primary" onClick={handleAddQuiz}>
            + Quiz
          </button>
        )}
      </div>

      {state.quizzes.length === 0 ? (
        <div className="alert alert-info">
          {isFaculty
            ? 'No quizzes yet. Click "+ Quiz" to create one.'
            : "No quizzes available."}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {state.quizzes.map((quiz: any) => (
                <tr key={quiz._id}>
                  <td className="flex-grow-1">
                    <div>
                      <a href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}>
                        {quiz.title}
                      </a>
                      <span className="ms-2">
                        {quiz.published ? "✅" : "🚫"}
                      </span>
                    </div>
                    <div className="text-muted small">
                      <div>Questions: {quiz.questions?.length || 0}</div>
                      <div>Points: {quiz.points || 0}</div>
                      {/* Show latest score if student */}
                    </div>
                  </td>
                  {isFaculty && (
                    <td>
                      <div className="btn-group" role="group">
                        <a
                          href={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                          className="btn btn-sm btn-outline-primary"
                        >
                          Edit
                        </a>
                        <button
                          className="btn btn-sm btn-outline-warning"
                          onClick={() => {
                            if (quiz.published) {
                              handleUnpublish(quiz._id);
                            } else {
                              handlePublish(quiz._id);
                            }
                          }}
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(quiz._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

---

## 🎯 阶段 3: Quiz 详情屏幕 (2-3 小时)

### 3.1 **app/(Kambaz)/Quizzes/[qid]/page.tsx** - Quiz 详情

```typescript
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { quizzesApi } from "../client";
import Link from "next/link";

export default function QuizDetailsPage() {
  const params = useParams();
  const qid = params.qid as string;
  const [quiz, setQuiz] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [lastAttempt, setLastAttempt] = useState<any>(null);

  useEffect(() => {
    fetch("/api/users/session")
      .then((r) => r.json())
      .then((data) => setUser(data.currentUser));

    quizzesApi
      .getQuiz(qid)
      .then((q) => setQuiz(q))
      .catch((err) => console.error(err));

    // If student, get last attempt
    quizzesApi
      .getAttempts(qid)
      .then((attempts) => {
        if (attempts.length > 0) {
          setLastAttempt(attempts[0]);
        }
      })
      .catch(() => {});
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  const isFaculty = user?.role === "FACULTY";

  return (
    <div className="container p-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      <div className="row">
        <div className="col-md-8">
          <table className="table">
            <tbody>
              <tr>
                <th>Quiz Type</th>
                <td>{quiz.settings?.quizType || "Graded Quiz"}</td>
              </tr>
              <tr>
                <th>Points</th>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <th>Assignment Group</th>
                <td>{quiz.settings?.assignmentGroup || "Quizzes"}</td>
              </tr>
              <tr>
                <th>Shuffle Answers</th>
                <td>{quiz.settings?.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <th>Time Limit</th>
                <td>{quiz.settings?.timeLimitMinutes} minutes</td>
              </tr>
              <tr>
                <th>Multiple Attempts</th>
                <td>{quiz.settings?.multipleAttempts ? "Yes" : "No"}</td>
              </tr>
              {quiz.settings?.multipleAttempts && (
                <tr>
                  <th>Max Attempts</th>
                  <td>{quiz.settings?.maxAttempts}</td>
                </tr>
              )}
              <tr>
                <th>Due Date</th>
                <td>
                  {quiz.dueDate
                    ? new Date(quiz.dueDate).toLocaleDateString()
                    : "No due date"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isFaculty ? (
        <div className="mt-4">
          <Link
            href={`/Kambaz/Courses/${params.cid}/Quizzes/${qid}/preview`}
            className="btn btn-info me-2"
          >
            Preview
          </Link>
          <Link
            href={`/Kambaz/Courses/${params.cid}/Quizzes/${qid}/edit`}
            className="btn btn-primary"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          {lastAttempt && (
            <div className="alert alert-success">
              Your Score: {lastAttempt.score}/{lastAttempt.totalPoints}
            </div>
          )}
          <Link
            href={`/Kambaz/Courses/${params.cid}/Quizzes/${qid}/attempt`}
            className="btn btn-success"
          >
            Start Quiz
          </Link>
        </div>
      )}
    </div>
  );
}
```

---

## 🎯 阶段 4: Quiz 编辑屏幕 (4-5 小时)

### 4.1 **app/(Kambaz)/Quizzes/[qid]/edit/page.tsx** - 编辑 Quiz

使用 Tab 切换 Details 和 Questions

```typescript
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { quizzesApi } from "../../client";

export default function QuizEditPage() {
  const params = useParams();
  const router = useRouter();
  const qid = params.qid as string;
  const cid = params.cid as string;

  const [tab, setTab] = useState("details");
  const [quiz, setQuiz] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    quizzesApi.getQuiz(qid).then((q) => {
      setQuiz(q);
      setFormData(q);
    });
  }, [qid]);

  const handleSave = async () => {
    await quizzesApi.updateQuiz(qid, formData);
    router.push(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    await quizzesApi.updateQuiz(qid, formData);
    await quizzesApi.publishQuiz(qid);
    router.push(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container p-4">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "details" ? "active" : ""}`}
            onClick={() => setTab("details")}
            href="#"
          >
            Details
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${tab === "questions" ? "active" : ""}`}
            onClick={() => setTab("questions")}
            href="#"
          >
            Questions
          </a>
        </li>
      </ul>

      <div className="tab-content mt-4">
        {tab === "details" && (
          <div>
            <div className="form-group mb-3">
              <label>Title</label>
              <input
                className="form-control"
                value={formData.title || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                rows={4}
              />
            </div>

            <div className="form-group mb-3">
              <label>Quiz Type</label>
              <select
                className="form-control"
                value={formData.settings?.quizType || "graded"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    settings: {
                      ...formData.settings,
                      quizType: e.target.value,
                    },
                  })
                }
              >
                <option value="graded">Graded Quiz</option>
                <option value="practice">Practice Quiz</option>
                <option value="graded-survey">Graded Survey</option>
                <option value="ungraded-survey">Ungraded Survey</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label>
                <input
                  type="checkbox"
                  checked={formData.settings?.multipleAttempts || false}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: {
                        ...formData.settings,
                        multipleAttempts: e.target.checked,
                      },
                    })
                  }
                />{" "}
                Multiple Attempts
              </label>
            </div>

            {formData.settings?.multipleAttempts && (
              <div className="form-group mb-3">
                <label>Max Attempts</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.settings?.maxAttempts || 1}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      settings: {
                        ...formData.settings,
                        maxAttempts: parseInt(e.target.value),
                      },
                    })
                  }
                />
              </div>
            )}

            <div className="form-group mb-3">
              <label>Due Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={formData.dueDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dueDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group mb-3">
              <label>Available Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={formData.availableDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    availableDate: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group mb-3">
              <label>Until Date</label>
              <input
                type="datetime-local"
                className="form-control"
                value={formData.untilDate || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    untilDate: e.target.value,
                  })
                }
              />
            </div>
          </div>
        )}

        {tab === "questions" && (
          <QuestionEditor quiz={quiz} onChange={setFormData} />
        )}
      </div>

      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-success me-2" onClick={handleSaveAndPublish}>
          Save and Publish
        </button>
        <button className="btn btn-secondary" onClick={() => router.back()}>
          Cancel
        </button>
      </div>
    </div>
  );
}

function QuestionEditor({ quiz, onChange }: any) {
  // TODO: 实现问题编辑组件
  return (
    <div>
      <p>Questions: {quiz.questions?.length || 0}</p>
      {/* Question list and editor UI */}
    </div>
  );
}
```

---

## 🎯 阶段 5: 做题屏幕 (4-5 小时)

### 5.1 **app/(Kambaz)/Quizzes/[qid]/attempt/page.tsx** - 学生做题

```typescript
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { quizzesApi } from "../../client";

export default function QuizAttemptPage() {
  const params = useParams();
  const router = useRouter();
  const qid = params.qid as string;
  const cid = params.cid as string;

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    quizzesApi.getQuiz(qid).then((q) => {
      setQuiz(q);
      setAnswers(
        (q.questions || []).map((q: any) => ({
          questionId: q._id,
          answer: null,
        }))
      );
    });
  }, [qid]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(
      answers.map((a) => (a.questionId === questionId ? { ...a, answer } : a))
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await quizzesApi.submitAttempt(qid, answers);
      // Navigate to results page
      router.push(
        `/Kambaz/Courses/${cid}/Quizzes/${qid}/results/${result.attempt._id}`
      );
    } catch (err) {
      alert("Error submitting quiz");
      setSubmitting(false);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="container p-4">
      <h2>{quiz.title}</h2>

      {quiz.questions?.map((question: any, index: number) => (
        <div key={question._id} className="mb-4 p-3 border rounded">
          <h5>
            {index + 1}. {question.title}
          </h5>
          <p>{question.body}</p>

          {question.type === "mcq" && (
            <div>
              {question.choices?.map((choice: any) => (
                <div key={choice._id} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`q-${question._id}`}
                    value={choice._id}
                    checked={
                      answers.find((a) => a.questionId === question._id)
                        ?.answer === choice._id
                    }
                    onChange={() => handleAnswer(question._id, choice._id)}
                  />
                  <label className="form-check-label">{choice.text}</label>
                </div>
              ))}
            </div>
          )}

          {question.type === "tf" && (
            <div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q-${question._id}`}
                  value="true"
                  checked={
                    answers.find((a) => a.questionId === question._id)
                      ?.answer === true
                  }
                  onChange={() => handleAnswer(question._id, true)}
                />
                <label className="form-check-label">True</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name={`q-${question._id}`}
                  value="false"
                  checked={
                    answers.find((a) => a.questionId === question._id)
                      ?.answer === false
                  }
                  onChange={() => handleAnswer(question._id, false)}
                />
                <label className="form-check-label">False</label>
              </div>
            </div>
          )}

          {question.type === "fill" && (
            <input
              className="form-control"
              type="text"
              value={
                answers.find((a) => a.questionId === question._id)?.answer || ""
              }
              onChange={(e) => handleAnswer(question._id, e.target.value)}
              placeholder="Enter your answer"
            />
          )}
        </div>
      ))}

      <button
        className="btn btn-success"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
```

---

## 🎯 阶段 6: 结果显示屏幕 (2-3 小时)

### 6.1 **app/(Kambaz)/Quizzes/[qid]/results/[aid]/page.tsx** - 显示结果

```typescript
"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { quizzesApi } from "../../../client";

export default function QuizResultsPage() {
  const params = useParams();
  const qid = params.qid as string;
  const aid = params.aid as string;

  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      quizzesApi.getQuiz(qid),
      quizzesApi.getAttempt(qid, aid),
    ]).then(([q, a]) => {
      setQuiz(q);
      setAttempt(a);
    });
  }, [qid, aid]);

  if (!quiz || !attempt) return <div>Loading...</div>;

  const percentage = Math.round((attempt.score / attempt.totalPoints) * 100);

  return (
    <div className="container p-4">
      <h2>{quiz.title} - Results</h2>

      <div className="alert alert-info">
        <h4>
          Score: {attempt.score} / {attempt.totalPoints} ({percentage}%)
        </h4>
        <p>Attempt #{attempt.attemptNumber}</p>
      </div>

      {quiz.questions?.map((question: any, index: number) => {
        const givenAnswer = attempt.answers.find(
          (a: any) => a.questionId === question._id
        );
        const isCorrect = checkAnswer(question, givenAnswer);

        return (
          <div
            key={question._id}
            className={`mb-4 p-3 border rounded ${
              isCorrect ? "border-success" : "border-danger"
            }`}
          >
            <h5 className={isCorrect ? "text-success" : "text-danger"}>
              {isCorrect ? "✅" : "❌"} {index + 1}. {question.title}
            </h5>
            <p>{question.body}</p>
            <p>
              <strong>Your answer:</strong>{" "}
              {givenAnswer?.answer || "Not answered"}
            </p>

            {quiz.settings?.showCorrectAnswers && (
              <p>
                <strong>Correct answer:</strong> {getCorrectAnswer(question)}
              </p>
            )}
          </div>
        );
      })}

      <a
        href={`/Kambaz/Courses/${params.cid}/Quizzes/${qid}`}
        className="btn btn-primary"
      >
        Back to Quiz
      </a>
    </div>
  );
}

function checkAnswer(question: any, answer: any): boolean {
  if (!answer) return false;

  if (question.type === "mcq") {
    const correct = question.choices.find((c: any) => c.isCorrect);
    return answer.answer === correct._id;
  }

  if (question.type === "tf") {
    const correct = question.choices.find((c: any) => c.isCorrect);
    return String(answer.answer) === String(correct._id);
  }

  if (question.type === "fill") {
    const blanks = question.blanks || [];
    return blanks.some((b: any) =>
      b.answers.some(
        (ans: string) =>
          ans.toLowerCase().trim() ===
          String(answer.answer).toLowerCase().trim()
      )
    );
  }

  return false;
}

function getCorrectAnswer(question: any): string {
  if (question.type === "mcq" || question.type === "tf") {
    const correct = question.choices?.find((c: any) => c.isCorrect);
    return correct?.text || "Unknown";
  }

  if (question.type === "fill") {
    const blanks = question.blanks || [];
    return blanks.map((b: any) => b.answers.join(" / ")).join("; ");
  }

  return "Unknown";
}
```

---

## ⏱️ 总体时间估计

| 阶段     | 任务           | 时间估计       |
| -------- | -------------- | -------------- |
| 1        | 项目基础设置   | 2-3h           |
| 2        | Quiz 列表屏幕  | 3-4h           |
| 3        | Quiz 详情屏幕  | 2-3h           |
| 4        | Quiz 编辑屏幕  | 4-5h           |
| 5        | 做题屏幕       | 4-5h           |
| 6        | 结果显示屏幕   | 2-3h           |
| -        | **测试和调试** | **5-7h**       |
| **总计** |                | **22-30 小时** |

---

## ✅ 功能清单

### 第一周

- [ ] 目录结构和 API 层
- [ ] Quiz 列表屏幕
- [ ] Quiz 详情屏幕 (Faculty preview)
- [ ] 基础 Quiz 编辑

### 第二周

- [ ] 问题编辑器 (MCQ, T/F, Fill)
- [ ] 学生做题屏幕
- [ ] 结果显示屏幕
- [ ] 集成测试

### 附加功能 (如果时间允许)

- [ ] Quiz 预览屏幕 (Faculty mock take)
- [ ] 尝试历史显示
- [ ] 时间限制计时器
- [ ] 随机排序答案
- [ ] 学生课程注册

---

## 🚀 快速启动

```bash
# 1. 创建目录结构
mkdir -p app/\(Kambaz\)/Quizzes/{[qid]/{edit,preview,attempt,results/\[aid\]}}

# 2. 创建 client.ts 文件
touch app/\(Kambaz\)/Quizzes/client.ts

# 3. 创建 reducer.ts 文件
touch app/\(Kambaz\)/Quizzes/reducer.ts

# 4. 创建页面文件
touch app/\(Kambaz\)/Quizzes/page.tsx
touch app/\(Kambaz\)/Quizzes/\[qid\]/page.tsx
touch app/\(Kambaz\)/Quizzes/\[qid\]/edit/page.tsx
touch app/\(Kambaz\)/Quizzes/\[qid\]/attempt/page.tsx
touch app/\(Kambaz\)/Quizzes/\[qid\]/results/\[aid\]/page.tsx

# 5. 启动开发服务器
npm run dev

# 6. 访问 http://localhost:3000
```

---

## 📚 参考资源

- Next.js 文档: https://nextjs.org/docs
- React Hooks: https://react.dev/reference/react
- Bootstrap: https://getbootstrap.com
- API Endpoints: 查看 `/API_ROUTES_ALIGNMENT.md`
