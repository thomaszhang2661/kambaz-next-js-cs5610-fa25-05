"use server";
import React from "react";

export default async function Page() {
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
  const url = `${HTTP_SERVER}/lab5/todos/create`;
  let data: any = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    data = await res.json();
  } catch (err) {
    data = `Error creating todo: ${err}`;
  }

  return (
    <div id="wd-arrays-create" className="m-3">
      <h3>Create Todo (GET)</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
