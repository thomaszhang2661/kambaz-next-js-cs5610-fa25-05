"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course?: { name?: string } }) {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const last = parts.length ? parts[parts.length - 1] : "";
  return (
    <div className="wd-breadcrumb mb-2">
      Course {course?.name || ""} &gt; {last}
    </div>
  );
}
