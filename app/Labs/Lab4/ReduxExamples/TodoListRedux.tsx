"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { addTodo, deleteTodo, updateTodo, toggleTodo } from "./todoSlice";

type Todo = { id: string; text: string; completed?: boolean };

export default function TodoListRedux() {
  const todos = useSelector((state: RootState) => state.todo?.todos ?? []);
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  function onAdd() {
    if (text.trim() === "") return;
    dispatch(addTodo(text.trim()));
    setText("");
  }

  function onStartEdit(t: Todo) {
    setEditingId(t.id);
    setEditText(t.text);
  }

  function onUpdate(id: string) {
    if (editText.trim() === "") return;
    dispatch(updateTodo({ id, text: editText.trim() }));
    setEditingId(null);
    setEditText("");
  }

  function onCancel() {
    setEditingId(null);
    setEditText("");
  }

  return (
    <div id="wd-todo-redux">
      <h2>Todo List (Redux)</h2>
      <div className="card">
        <div className="card-body">
          <div className="input-group mb-3">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="form-control"
              aria-label="new-todo"
              data-testid="input-new-todo"
            />
            <button
              onClick={onAdd}
              id="wd-todo-add"
              className="btn btn-success"
              aria-label="add-todo"
              data-testid="btn-add-todo"
            >
              Add
            </button>
          </div>

          <ul className="list-group">
            {todos.map((t: Todo) => (
              <li
                key={t.id}
                className="list-group-item d-flex align-items-center"
              >
                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => dispatch(toggleTodo(t.id))}
                  aria-label={`toggle-${t.id}`}
                  data-testid={`chk-${t.id}`}
                  className="form-check-input me-2"
                />
                {editingId === t.id ? (
                  <>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      style={{ flex: 1 }}
                      className="form-control me-2"
                      aria-label={`edit-input-${t.id}`}
                      data-testid={`input-edit-${t.id}`}
                    />
                    <button
                      onClick={() => onUpdate(t.id)}
                      className="btn btn-warning me-2"
                      aria-label={`update-${t.id}`}
                      data-testid={`btn-update-${t.id}`}
                    >
                      Update
                    </button>
                    <button
                      onClick={onCancel}
                      className="btn btn-secondary"
                      aria-label={`cancel-${t.id}`}
                      data-testid={`btn-cancel-${t.id}`}
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span
                      style={{
                        textDecoration: t.completed ? "line-through" : "none",
                        flex: 1,
                      }}
                      className="me-2"
                    >
                      {t.text}
                    </span>
                    <button
                      onClick={() => onStartEdit(t)}
                      className="btn btn-primary me-2"
                      aria-label={`edit-${t.id}`}
                      data-testid={`btn-edit-${t.id}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => dispatch(deleteTodo(t.id))}
                      id={`wd-todo-delete-${t.id}`}
                      className="btn btn-danger"
                      aria-label={`delete-${t.id}`}
                      data-testid={`btn-delete-${t.id}`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <hr />
    </div>
  );
}
