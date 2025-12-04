"use server";
import React from "react";

type Props = { params: { id: string } };

export default async function Page({ params }: Props) {
  const { id } = params;
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
  const url = `${HTTP_SERVER}/lab5/todos/${encodeURIComponent(id)}`;
  let data: any = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }
  } catch (err) {
    data = `Error fetching todo ${id}: ${err}`;
  }

  return (
    <div id="wd-arrays-todo-by-id" className="m-3">
      <h3>Todo {id}</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
