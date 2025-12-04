"use client";
import React, { useState } from "react";
import type { Todo } from "./client";

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState<Todo>({
    id: "2",
    title: "Task 2",
    description: "",
    completed: false,
  });
  const todos: Todo[] = [];

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a
        id="wd-retrieve-todos"
        className="btn btn-primary"
        href={`/Labs/Lab5/arrays/todos`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Todos
      </a>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex">
        <input
          id="wd-todo-id"
          value={String(todo.id)}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-retrieve-todo-by-id"
          className="btn btn-primary"
          href={`/Labs/Lab5/arrays/todo/${encodeURIComponent(String(todo.id))}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Todo by ID
        </a>
      </div>
      <hr />
      <h4>Filtering Array Items</h4>
      <a
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        href={`/Labs/Lab5/arrays/completed`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Get Completed Todos
      </a>
      <hr />
      <h4>Creating new Items in an Array</h4>
      <a
        id="wd-create-todo"
        className="btn btn-primary me-2"
        href={`/Labs/Lab5/arrays/create`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Create Todo (GET)
      </a>
      <a
        id="wd-post-todo"
        className="btn btn-secondary"
        href={`/Labs/Lab5/arrays/post`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Post New Todo
      </a>
      <hr />
      <h4>Removing from an Array</h4>
      <div className="d-flex">
        <input
          defaultValue={String(todo.id)}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <a
          id="wd-remove-todo"
          className="btn btn-danger me-2"
          href={`/Labs/Lab5/arrays/delete/${encodeURIComponent(
            String(todo.id)
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Remove Todo with ID = {todo.id}
        </a>
        <a
          id="wd-delete-todo"
          className="btn btn-outline-danger"
          href={`/Labs/Lab5/arrays/delete/${encodeURIComponent(
            String(todo.id)
          )}?method=delete`}
          target="_blank"
          rel="noopener noreferrer"
        >
          DELETE Todo
        </a>
      </div>
      <hr />
      <h4>Updating an Item in an Array</h4>
      <div className="d-flex">
        <input
          defaultValue={String(todo.id)}
          className="w-25 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <input
          defaultValue={todo.title}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
        />
        <a
          id="wd-update-todo"
          className="btn btn-primary"
          href={`/Labs/Lab5/arrays/update/${encodeURIComponent(
            String(todo.id)
          )}/${encodeURIComponent(todo.title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Update Todo
        </a>
        <a
          id="wd-update-todo-nodejs"
          className="btn btn-outline-primary ms-2"
          href={`/Labs/Lab5/arrays/update/${encodeURIComponent(
            String(todo.id)
          )}/${encodeURIComponent("NodeJS Assignment")}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Update Todo to NodeJS Assignment
        </a>
      </div>

      <pre className="mt-2">{JSON.stringify(todos, null, 2)}</pre>
      <hr />
    </div>
  );
}
