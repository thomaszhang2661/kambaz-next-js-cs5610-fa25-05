"use server";
import React from "react";

type Props = { params: { id: string; title: string } };

export default async function Page({ params }: Props) {
  const { id, title } = params;
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
  const url = `${HTTP_SERVER}/lab5/todos/${encodeURIComponent(
    id
  )}/title/${encodeURIComponent(title)}`;
  let data: any = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }
  } catch (err) {
    data = `Error updating todo ${id}: ${err}`;
  }

  return (
    <div id="wd-arrays-update" className="m-3">
      <h3>Update Todo {id}</h3>
      <div>
        New Title: <strong>{title}</strong>
      </div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
