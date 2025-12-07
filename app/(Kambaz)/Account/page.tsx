"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountPage() {
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );

  useEffect(() => {
    // Redirect based on login status
    if (currentUser) {
      router.replace("/Account/Profile");
    } else {
      router.replace("/Account/Signin");
    }
  }, [currentUser, router]);

  // Show nothing while redirecting
  return null;
}
