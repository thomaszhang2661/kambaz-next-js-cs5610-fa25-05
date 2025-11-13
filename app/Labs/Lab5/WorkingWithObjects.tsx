"use client";
import React, { useState } from "react";
import * as client from "./client";

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState<any>({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [fetched, setFetched] = useState<any>(null);

  const fetchAssignment = async () => {
    const a = await client.fetchAssignment();
    setFetched(a);
  };
  const fetchTitle = async () => {
    const t = await client.updateTitle; // no-op placeholder (server has assignment/title route for update)
    // we'll just use fetchAssignment to get latest
    await fetchAssignment();
  };
  const updateTitle = async () => {
    const updated = await client.updateTitle(assignment.title);
    setFetched(updated);
  };

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Retrieving Objects</h4>
      <button
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        onClick={fetchAssignment}
      >
        Get Assignment
      </button>
      {fetched && (
        <pre className="mt-2">{JSON.stringify(fetched, null, 2)}</pre>
      )}
      <hr />
      <h4>Retrieving Properties</h4>
      <button
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        onClick={fetchAssignment}
      >
        Get Title
      </button>
      {fetched && (
        <div className="mt-2">
          Title: <strong>{fetched.title}</strong>
        </div>
      )}
      <hr />
      <h4>Modifying Properties</h4>
      <button
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        onClick={updateTitle}
      >
        Update Title
      </button>
      <input
        className="w-75"
        id="wd-assignment-title"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />
    </div>
  );
}
