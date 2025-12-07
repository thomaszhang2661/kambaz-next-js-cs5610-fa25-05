"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

// Redirect to the unified take page - faculty preview and student take are now combined
export default function QuizPreviewRedirect() {
  const params = useParams() as { cid?: string; qid?: string };
  const cid = params?.cid || "";
  const qid = params?.qid || "";
  const router = useRouter();

  useEffect(() => {
    // Redirect to the take page which handles both preview (faculty) and take (students)
    router.replace(`/Courses/${cid}/Quizzes/${qid}/take`);
  }, [cid, qid, router]);

  return (
    <div className="text-center py-5">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Redirecting...</p>
    </div>
  );
}
