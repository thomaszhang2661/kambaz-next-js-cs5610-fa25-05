"use client";
import { FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { setCurrentUser } from "../reducer";
import * as client from "../client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Profile() {
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    setProfile(currentUser || {});
  }, [currentUser]);

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(profile);
      dispatch(setCurrentUser(updatedProfile));
      alert("Profile updated");
    } catch (err: any) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  const signout = async () => {
    try {
      await client.signout();
    } catch (err) {
      // ignore
    }
    dispatch(setCurrentUser(null));
    router.push("/Account/Signin");
  };

  return (
    <div
      id="wd-profile-screen"
      className="container mt-4"
      style={{ maxWidth: "400px" }}
    >
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        value={profile?.username || ""}
        placeholder="username"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        value={profile?.password || ""}
        placeholder="password"
        type="password"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, password: e.target.value })}
      />
      <FormControl
        id="wd-firstname"
        value={profile?.firstName || ""}
        placeholder="First Name"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
      />
      <FormControl
        id="wd-lastname"
        value={profile?.lastName || ""}
        placeholder="Last Name"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
      />
      <FormControl
        id="wd-email"
        value={profile?.email || ""}
        type="email"
        className="mb-2"
        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
      />
      <div>
        <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
          Update
        </button>
        <button onClick={signout} className="btn btn-danger w-100">
          Sign out
        </button>
      </div>
    </div>
  );
}
