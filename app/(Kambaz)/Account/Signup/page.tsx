"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FormControl, Form } from "react-bootstrap";
import * as client from "../client";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../reducer";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [user, setUser] = useState<any>({ role: "STUDENT" });
  const [verifyPassword, setVerifyPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signup = async () => {
    if (!user.username || !user.password) {
      alert("Username and password are required");
      return;
    }
    if (user.password !== verifyPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      router.push("/Account/Profile");
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Unable to sign up");
    }
  };

  return (
    <div
      id="wd-signup-screen"
      className="container mt-4"
      style={{ maxWidth: "400px" }}
    >
      <h1>Sign up</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        value={user.username || ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
        value={user.password || ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <FormControl
        id="wd-verify-password"
        placeholder="verify password"
        type="password"
        className="mb-2"
        value={verifyPassword}
        onChange={(e) => setVerifyPassword(e.target.value)}
      />
      <FormControl
        id="wd-firstName"
        placeholder="First Name"
        className="mb-2"
        value={user.firstName || ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <FormControl
        id="wd-lastName"
        placeholder="Last Name"
        className="mb-2"
        value={user.lastName || ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <FormControl
        id="wd-email"
        placeholder="Email"
        type="email"
        className="mb-2"
        value={user.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Form.Group className="mb-3">
        <Form.Label>Role:</Form.Label>
        <Form.Select
          id="wd-role"
          value={user.role || "STUDENT"}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
        >
          <option value="STUDENT">Student</option>
          <option value="FACULTY">Faculty</option>
        </Form.Select>
      </Form.Group>
      <button
        id="wd-signup-btn"
        className="btn btn-primary w-100 mb-2"
        onClick={signup}
      >
        Sign up
      </button>
      <Link id="wd-signin-link" href="/Account/Signin">
        Sign in
      </Link>
    </div>
  );
}
