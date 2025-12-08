"use client";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { FaUsers } from "react-icons/fa";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      console.log("Signing in with:", credentials);
      const user = await client.signin(credentials);
      console.log("Signin response:", user);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/Dashboard");
    } catch (err: any) {
      console.error("Signin error:", err);
      console.error("Error response:", err?.response);
      alert(err?.response?.data?.message || "Unable to sign in");
    }
  };

  return (
    <div
      id="wd-signin-screen"
      className="container mt-4"
      style={{ maxWidth: "400px" }}
    >
      <h1>Sign in</h1>

      {/* Team Info Link */}
      <div className="alert alert-info mb-3">
        <FaUsers className="me-2" />
        <Link href="/Account/Team" className="alert-link">
          View Team Information & GitHub Repositories
        </Link>
      </div>

      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      />
      <button
        onClick={signin}
        className="btn btn-primary w-100 mb-2"
        id="wd-signin-btn"
      >
        Sign in
      </button>
      <Link id="wd-signup-link" href="/Account/Signup">
        Sign up
      </Link>
    </div>
  );
}
