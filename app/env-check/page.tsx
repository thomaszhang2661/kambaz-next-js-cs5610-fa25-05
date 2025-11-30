"use client";

export default function EnvCheck() {
  const httpServer = process.env.NEXT_PUBLIC_HTTP_SERVER;

  return (
    <div className="container mt-5">
      <h1>Environment Variable Check</h1>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">NEXT_PUBLIC_HTTP_SERVER</h5>
          <p className="card-text">
            {httpServer ? (
              <span className="text-success">
                ✅ Configured: <strong>{httpServer}</strong>
              </span>
            ) : (
              <span className="text-danger">❌ Not configured (undefined)</span>
            )}
          </p>
        </div>
      </div>

      <div className="alert alert-info mt-3">
        <strong>Expected value:</strong>
        <br />
        <code>https://kambaz-node-server-app-js8h.onrender.com</code>
      </div>

      {!httpServer && (
        <div className="alert alert-warning mt-3">
          <strong>Action Required:</strong>
          <ol>
            <li>Go to Vercel Dashboard</li>
            <li>Settings → Environment Variables</li>
            <li>
              Add: <code>NEXT_PUBLIC_HTTP_SERVER</code>
            </li>
            <li>
              Value:{" "}
              <code>https://kambaz-node-server-app-js8h.onrender.com</code>
            </li>
            <li>Select: Preview (a5 branch)</li>
            <li>Click Save and Redeploy</li>
          </ol>
        </div>
      )}
    </div>
  );
}
