import Editor from "./Editor";

export default function AssignmentEditor({
  params,
}: {
  params: { cid: string; aid: string };
}) {
  return (
    <div id="wd-assignment-editor">
      {/* Breadcrumb */}
      <div className="d-flex align-items-center mb-3">
        <span className="text-muted">
          CS5610.SU1.24.MON/FRI &gt; Assignments &gt; A{params.aid}
        </span>
      </div>

      <Editor />
    </div>
  );
}
