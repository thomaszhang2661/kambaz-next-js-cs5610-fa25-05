"use client";
import { useEffect, useState } from "react";

export default function DebugPage() {
  const httpServer = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const [browserInfo, setBrowserInfo] = useState({
    userAgent: "",
    currentUrl: "",
  });

  useEffect(() => {
    // Only access window/navigator in the browser
    setBrowserInfo({
      userAgent: navigator.userAgent,
      currentUrl: window.location.href,
    });
  }, []);

  return (
    <div className="container mt-5">
      <h1>Debug Information</h1>

      <div className="card mt-3">
        <div className="card-body">
          <h3>Environment Variables</h3>
          <p>
            <strong>NEXT_PUBLIC_HTTP_SERVER:</strong>{" "}
            {httpServer ? (
              <span className="text-success">{httpServer}</span>
            ) : (
              <span className="text-danger">undefined</span>
            )}
          </p>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h3>Test API Call</h3>
          <button
            className="btn btn-primary"
            onClick={async () => {
              try {
                console.log(
                  "Testing API call to:",
                  `${httpServer}/api/courses`
                );
                const res = await fetch(`${httpServer}/api/courses`);
                console.log("Response status:", res.status);
                const data = await res.json();
                console.log("Response data:", data);
                alert(`Success! Got ${data.length} courses`);
              } catch (error) {
                console.error("API call failed:", error);
                alert("API call failed: " + error);
              }
            }}
          >
            Test Fetch Courses
          </button>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          <h3>Browser Info</h3>
          <p>User Agent: {browserInfo.userAgent || "Loading..."}</p>
          <p>Current URL: {browserInfo.currentUrl || "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}
