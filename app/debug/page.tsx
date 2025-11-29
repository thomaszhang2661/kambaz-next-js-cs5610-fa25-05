"use client";

export default function DebugPage() {
  const httpServer =
    process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";

  return (
    <div className="container mt-5">
      <h1>🔍 环境变量诊断页面</h1>

      <div className="card mt-4">
        <div className="card-body">
          <h3>当前后端 URL:</h3>
          <div className="alert alert-info">
            <code>{httpServer}</code>
          </div>

          <h3 className="mt-4">预期后端 URL:</h3>
          <div className="alert alert-success">
            <code>https://kambaz-node-server-app-js8h.onrender.com</code>
          </div>

          <div className="mt-4">
            {httpServer ===
            "https://kambaz-node-server-app-js8h.onrender.com" ? (
              <div className="alert alert-success">✅ 环境变量配置正确！</div>
            ) : (
              <div className="alert alert-danger">
                ❌ 环境变量配置错误！
                <br />
                <br />
                <strong>解决方案：</strong>
                <ol>
                  <li>
                    在 Vercel Dashboard 中设置{" "}
                    <code>NEXT_PUBLIC_HTTP_SERVER</code>
                  </li>
                  <li>
                    值设置为:{" "}
                    <code>
                      https://kambaz-node-server-app-js8h.onrender.com
                    </code>
                  </li>
                  <li>勾选: Production, Preview, Development</li>
                  <li>
                    保存后 <strong>必须重新部署</strong>！
                  </li>
                </ol>
              </div>
            )}
          </div>

          <div className="mt-4">
            <h4>测试后端连接:</h4>
            <button
              className="btn btn-primary"
              onClick={async () => {
                try {
                  const response = await fetch(`${httpServer}/api/users`, {
                    credentials: "include",
                  });
                  const data = await response.json();
                  alert(`✅ 成功连接到后端！\n返回 ${data.length} 个用户`);
                } catch (error: any) {
                  alert(`❌ 连接失败:\n${error.message}`);
                }
              }}
            >
              测试连接
            </button>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-body">
          <h4>所有环境变量:</h4>
          <pre className="bg-light p-3">
            {JSON.stringify(
              {
                NEXT_PUBLIC_HTTP_SERVER: process.env.NEXT_PUBLIC_HTTP_SERVER,
                NODE_ENV: process.env.NODE_ENV,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
