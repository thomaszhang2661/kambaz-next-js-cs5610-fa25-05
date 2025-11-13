"use client";
import React, { useState } from "react";
import * as client from "./client";
import type { Todo } from "./client";

export default function WorkingWithArrays() {
  const [todo, setTodo] = useState<Todo>({
    id: "1",
    title: "Task 1",
    description: "",
    completed: false,
  });
  const [todos, setTodos] = useState<Todo[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const fetchTodos = async () => {
    const t = await client.fetchTodos();
    setTodos(t);
  };
  const fetchTodoById = async () => {
    const t = await client.fetchTodos();
    const found = t.find((x: any) => String(x.id) === String(todo.id));
    setResult(found ? JSON.stringify(found) : `Todo ${todo.id} not found`);
  };
  const fetchCompleted = async () => {
    const t = await client.fetchTodos();
    const completed = t.filter((x: any) => x.completed);
    setResult(JSON.stringify(completed));
  };
  const createTodo = async () => {
    const t = await client.createNewTodo();
    setTodos(t);
    setResult("Created new todo");
  };
  const postTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
    setResult("Posted new todo");
  };
  const removeTodo = async () => {
    const updated = await client.removeTodo(todo as any);
    setTodos(updated);
    setResult("Removed todo via GET delete");
  };
  const deleteTodo = async () => {
    await client.deleteTodo(todo as any);
    setTodos(todos.filter((t) => String(t.id) !== String(todo.id)));
    setResult("Deleted todo");
  };
  const updateTodoTitle = async () => {
    await client.updateTodo({ ...todo });
    setTodos(
      todos.map((t) =>
        String(t.id) === String(todo.id) ? { ...t, title: todo.title } : t
      )
    );
    setResult("Updated todo title");
  };

  return (
    <div id="wd-working-with-arrays">
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <button
        id="wd-retrieve-todos"
        className="btn btn-primary"
        onClick={fetchTodos}
      >
        Get Todos
      </button>
      <hr />
      <h4>Retrieving an Item from an Array by ID</h4>
      <div className="d-flex">
        <input
          id="wd-todo-id"
          value={String(todo.id)}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <button
          id="wd-retrieve-todo-by-id"
          className="btn btn-primary"
          onClick={fetchTodoById}
        >
          Get Todo by ID
        </button>
      </div>
      <hr />
      <h4>Filtering Array Items</h4>
      <button
        id="wd-retrieve-completed-todos"
        className="btn btn-primary"
        onClick={fetchCompleted}
      >
        Get Completed Todos
      </button>
      <hr />
      <h4>Creating new Items in an Array</h4>
      <button
        id="wd-create-todo"
        className="btn btn-primary me-2"
        onClick={createTodo}
      >
        Create Todo (GET)
      </button>
      <button
        id="wd-post-todo"
        className="btn btn-secondary"
        onClick={postTodo}
      >
        Post New Todo
      </button>
      <hr />
      <h4>Removing from an Array</h4>
      <div className="d-flex">
        <input
          defaultValue={String(todo.id)}
          className="w-50 me-2"
          onChange={(e) => setTodo({ ...todo, id: e.target.value })}
        />
        <button
          id="wd-remove-todo"
          className="btn btn-danger me-2"
          onClick={removeTodo}
        >
          Remove Todo with ID = {todo.id}
        </button>
        <button
          id="wd-delete-todo"
          className="btn btn-outline-danger"
          onClick={deleteTodo}
        >
          DELETE Todo
        </button>
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
        <button
          id="wd-update-todo"
          className="btn btn-primary"
          onClick={updateTodoTitle}
        >
          Update Todo
        </button>
      </div>
      {result && <div className="mt-2">{result}</div>}
      <pre className="mt-2">{JSON.stringify(todos, null, 2)}</pre>
      <hr />
    </div>
  );
}
