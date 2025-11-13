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
        <button
          className="btn btn-primary me-2"
          id="wd-path-parameter-add"
          onClick={doAdd}
        >
          Add {a} + {b}
        </button>
        <button
          className="btn btn-danger me-2"
          id="wd-path-parameter-subtract"
          onClick={doSubtract}
        >
          Subtract {a} - {b}
        </button>
        <button
          className="btn btn-secondary me-2"
          id="wd-path-parameter-multiply"
          onClick={doMultiply}
        >
          Multiply
        </button>
        <button
          className="btn btn-warning"
          id="wd-path-parameter-divide"
          onClick={doDivide}
        >
          Divide
        </button>
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
