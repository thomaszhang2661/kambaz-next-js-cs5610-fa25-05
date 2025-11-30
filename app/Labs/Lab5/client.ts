import axios from "axios";
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const API = `${HTTP_SERVER}/lab5`;

export type Todo = {
  id: number | string;
  title: string;
  description?: string;
  completed: boolean;
  editing?: boolean;
};

export type Assignment = {
  id: number | string;
  title: string;
  description?: string;
  due?: string;
  completed?: boolean;
  score?: number;
};
export const fetchWelcomeMessage = async () => {
  const { data } = await axios.get(`${API}/welcome`);
  return data;
};
export const fetchAssignment = async () => {
  const { data } = await axios.get(`${API}/assignment`);
  return data;
};
export const updateTitle = async (title: string) => {
  const { data } = await axios.get(
    `${API}/assignment/title/${encodeURIComponent(title)}`
  );
  return data;
};
export const fetchTodos = async () => {
  const { data } = await axios.get(`${API}/todos`);
  return data;
};
export const fetchModule = async () => {
  const { data } = await axios.get(`${API}/module`);
  return data;
};
export const fetchModuleName = async () => {
  const { data } = await axios.get(`${API}/module/name`);
  return data;
};
export const addPath = async (a: number | string, b: number | string) => {
  const { data } = await axios.get(`${API}/add/${a}/${b}`);
  return data;
};
export const subtractPath = async (a: number | string, b: number | string) => {
  const { data } = await axios.get(`${API}/subtract/${a}/${b}`);
  return data;
};
export const multiplyPath = async (a: number | string, b: number | string) => {
  const { data } = await axios.get(`${API}/multiply/${a}/${b}`);
  return data;
};
export const dividePath = async (a: number | string, b: number | string) => {
  const { data } = await axios.get(`${API}/divide/${a}/${b}`);
  return data;
};
export const calculator = async (
  operation: string,
  a: number | string,
  b: number | string
) => {
  const { data } = await axios.get(`${API}/calculator`, {
    params: { operation, a, b },
  });
  return data;
};
export const createNewTodo = async () => {
  const { data } = await axios.get(`${API}/todos/create`);
  return data;
};
export const postNewTodo = async (todo: Partial<Todo>) => {
  const { data } = await axios.post(`${API}/todos`, todo);
  return data as Todo;
};
export const removeTodo = async (todo: Todo) => {
  const { data } = await axios.get(`${API}/todos/${todo.id}/delete`);
  return data as Todo[];
};
export const deleteTodo = async (todo: Todo) => {
  const { data } = await axios.delete(`${API}/todos/${todo.id}`);
  return data;
};
export const updateTodo = async (todo: Todo) => {
  const { data } = await axios.put(`${API}/todos/${todo.id}`, todo);
  return data;
};
