"use client";
import React, { useState } from "react";
import * as client from "./client";

export default function QueryParameters() {
  const [a, setA] = useState("34");
  const [b, setB] = useState("23");
  const [result, setResult] = useState<string | null>(null);

  const doCalc = async (operation: string) => {
    const r = await client.calculator(operation, a, b);
    setResult(String(r));
  };

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <input
        id="wd-query-parameter-a"
        value={a}
        type="number"
        onChange={(e) => setA(e.target.value)}
      />
      <input
        id="wd-query-parameter-b"
        value={b}
        type="number"
        onChange={(e) => setB(e.target.value)}
      />
      <div className="mt-2">
        <button
          id="wd-query-parameter-add"
          className="btn btn-primary me-2"
          onClick={() => doCalc("add")}
        >
          Add {a} + {b}
        </button>
        <button
          id="wd-query-parameter-subtract"
          className="btn btn-secondary me-2"
          onClick={() => doCalc("subtract")}
        >
          Subtract {a} - {b}
        </button>
        <button
          id="wd-query-parameter-multiply"
          className="btn btn-info me-2"
          onClick={() => doCalc("multiply")}
        >
          Multiply
        </button>
        <button
          id="wd-query-parameter-divide"
          className="btn btn-warning"
          onClick={() => doCalc("divide")}
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
