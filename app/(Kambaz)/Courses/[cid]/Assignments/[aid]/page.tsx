import Editor from "./Editor";

export default async function AssignmentEditor({
  params,
}: {
  params: Promise<{ cid: string; aid: string }>;
}) {
  const { cid, aid } = await params;
  return (
    <div id="wd-assignment-editor">
      {/* Breadcrumb */}
      <div className="d-flex align-items-center mb-3">
        <span className="text-muted">
          CS5610.SU1.24.MON/FRI &gt; Assignments &gt; A{aid}
        </span>
      </div>

      <Editor />
    </div>
  );
}
