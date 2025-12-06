"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KambazPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/Account/Signin");
  }, [router]);

  return null;
}
