"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import * as db from "../../../Database";

type Lesson = { _id: string; name: string };
type Module = { _id: string; course: string; name: string; lessons?: Lesson[] };
type RootState = { modulesReducer: { modules: Module[] } };

export default function Modules() {
  const params = useParams();
  const cid = Array.isArray(params?.cid) ? params?.cid[0] : params?.cid;

  const { modules } = useSelector(
    (state: RootState) =>
      state.modulesReducer || { modules: (db.modules || []) as Module[] }
  );

  const filteredModules = modules.filter((m: Module) => m.course === cid);

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {filteredModules.map((mod) => (
          <ListGroupItem
            key={mod._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> {mod.name}
              <ModuleControlButtons
                moduleId={mod._id}
                moduleName={mod.name}
                courseId={cid || ""}
              />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              {(mod.lessons || []).map((lesson) => (
                <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                  <LessonControlButtons />
                </ListGroupItem>
              ))}
            </ListGroup>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
