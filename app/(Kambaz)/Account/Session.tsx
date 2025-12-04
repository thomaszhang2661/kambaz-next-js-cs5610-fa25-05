"use client";
import * as client from "./client";
import { useEffect, useState, PropsWithChildren } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";

export default function Session({ children }: PropsWithChildren) {
  const [pending, setPending] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await client.profile();
        dispatch(setCurrentUser(currentUser));
      } catch {
        // no user signed in
      }
      setPending(false);
    })();
  }, [dispatch]);

  if (pending) return null;
  return <>{children}</>;
}
