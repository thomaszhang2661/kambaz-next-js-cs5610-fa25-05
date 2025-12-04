"use server";
import React from "react";

type Props = {
  params: { operation: string; a: string; b: string };
};

export default async function Page({ params }: Props) {
  const { operation, a, b } = params;
  const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "";
  const url = `${HTTP_SERVER}/lab5/${operation}/${encodeURIComponent(
    a
  )}/${encodeURIComponent(b)}`;
  let result: any = null;
  try {
    const res = await fetch(url, { cache: "no-store" });
    // API returns a value (number or JSON); try json then fallback to text
    try {
      result = await res.json();
    } catch (e) {
      result = await res.text();
    }
  } catch (err) {
    result = `Error fetching result: ${err}`;
  }

  return (
    <div id="wd-path-result" className="m-3">
      <h3>Path Result</h3>
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
