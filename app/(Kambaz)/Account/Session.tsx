"use client";
import * as client from "./client";
import { useEffect, useState, PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: PropsWithChildren) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  const fetchProfile = async () => {
    try {
      const currentUser = await client.profile();
      dispatch(setCurrentUser(currentUser));
    } catch (err) {
      // no user signed in
    }
    setPending(false);
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (pending) return null;
  return <>{children}</>;
}
