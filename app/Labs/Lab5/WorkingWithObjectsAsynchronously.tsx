"use client";
import React, { useEffect, useState } from "react";
import * as client from "./client";
import type { Assignment } from "./client";
export default function WorkingWithObjectsAsynchronously() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const fetchAssignment = async () => {
    try {
      const a = await client.fetchAssignment();
      setAssignment(a);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchAssignment();
  }, []);
  const updateTitle = async (title: string) => {
    const updated = await client.updateTitle(title);
    setAssignment(updated);
  };
  return (
    <div id="wd-asynchronous-objects">
      <h3>Working with Objects Asynchronously</h3>
      <h4>Assignment</h4>
      <input
        defaultValue={assignment?.title}
        onChange={(e) =>
          assignment && setAssignment({ ...assignment, title: e.target.value })
        }
        className="mb-2"
      />
      <input
        defaultValue={assignment?.description}
        onChange={(e) =>
          assignment &&
          setAssignment({ ...assignment, description: e.target.value })
        }
        className="mb-2"
      />
      <input
        type="date"
        defaultValue={assignment?.due}
        onChange={(e) =>
          assignment && setAssignment({ ...assignment, due: e.target.value })
        }
        className="mb-2"
      />
      <div className="form-check form-switch">
        <input
          className="form-check-input"
          type="checkbox"
          id="wd-completed"
          defaultChecked={!!assignment?.completed}
          onChange={(e) =>
            assignment &&
            setAssignment({ ...assignment, completed: e.target.checked })
          }
        />
        <label className="form-check-label" htmlFor="wd-completed">
          {" "}
          Completed{" "}
        </label>
      </div>
      <button
        className="btn btn-primary me-2"
        onClick={() => assignment && updateTitle(assignment.title)}
      >
        Update Title
      </button>
      <pre>{JSON.stringify(assignment, null, 2)}</pre>
      <hr />
    </div>
  );
}
