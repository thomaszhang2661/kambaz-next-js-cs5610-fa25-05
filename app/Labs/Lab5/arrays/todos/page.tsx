"use server";
import React from "react";

export default async function Page() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
  const url = `${HTTP_SERVER}/lab5/todos`;
  let data: any = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    data = await res.json();
  } catch (err) {
    data = `Error fetching todos: ${err}`;
  }

  return (
    <div id="wd-arrays-todos" className="m-3">
      <h3>Todos</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
