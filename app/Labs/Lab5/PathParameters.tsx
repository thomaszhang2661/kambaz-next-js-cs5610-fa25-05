"use client";
import React, { useState } from "react";
import * as client from "./client";

export default function PathParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const [result, setResult] = useState<string | null>(null);

  const doAdd = async () => {
    const r = await client.addPath(a, b);
    setResult(String(r));
  };
  const doSubtract = async () => {
    const r = await client.subtractPath(a, b);
    setResult(String(r));
  };
  const doMultiply = async () => {
    const r = await client.multiplyPath(a, b);
    setResult(String(r));
  };
  const doDivide = async () => {
    const r = await client.dividePath(a, b);
    setResult(String(r));
  };

  return (
    <div>
      <h3>Path Parameters</h3>
      <input
        id="wd-path-parameter-a"
        type="number"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        id="wd-path-parameter-b"
        type="number"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <div className="mt-2">
        <a
          className="btn btn-primary me-2"
          id="wd-path-parameter-add"
          href={`/Labs/Lab5/path/add/${encodeURIComponent(
            a
          )}/${encodeURIComponent(b)}`}
        >
          Add {a} + {b}
        </a>
        <a
          className="btn btn-danger me-2"
          id="wd-path-parameter-subtract"
          href={`/Labs/Lab5/path/subtract/${encodeURIComponent(
            a
          )}/${encodeURIComponent(b)}`}
        >
          Subtract {a} - {b}
        </a>
        <a
          className="btn btn-secondary me-2"
          id="wd-path-parameter-multiply"
          href={`/Labs/Lab5/path/multiply/${encodeURIComponent(
            a
          )}/${encodeURIComponent(b)}`}
        >
          Multiply
        </a>
        <a
          className="btn btn-warning"
          id="wd-path-parameter-divide"
          href={`/Labs/Lab5/path/divide/${encodeURIComponent(
            a
          )}/${encodeURIComponent(b)}`}
        >
          Divide
        </a>
      </div>
      {result !== null && (
        <div className="mt-2">
          Result: <strong>{result}</strong>
        </div>
      )}
      <hr />
    </div>
  );
}
