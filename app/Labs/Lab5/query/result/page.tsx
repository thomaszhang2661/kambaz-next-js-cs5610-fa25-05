"use server";
import React from "react";

type Props = {
  searchParams: { operation?: string; a?: string; b?: string };
};

export default async function Page({ searchParams }: Props) {
  const operation = searchParams.operation || "";
  const a = searchParams.a || "";
  const b = searchParams.b || "";
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
  const url = `${HTTP_SERVER}/lab5/calculator?operation=${encodeURIComponent(
    operation
  )}&a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`;
  let result: any = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    try {
      result = await res.json();
    } catch {
      result = await res.text();
    }
  } catch (err) {
    result = `Error fetching result: ${err}`;
  }

  return (
    <div id="wd-query-result" className="m-3">
      <h3>Query Result</h3>
      <div>
        Operation: <strong>{operation}</strong>
      </div>
      <div>
        Inputs: <strong>{a}</strong> and <strong>{b}</strong>
      </div>
      <div className="mt-2">
        Result: <strong>{String(result)}</strong>
      </div>
    </div>
  );
}
