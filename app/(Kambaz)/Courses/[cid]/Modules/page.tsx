"use client";

import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setModules } from "../../../Modules/reducer";
import * as client from "../../../Courses/client";
import { RootState } from "../../../store";

type Lesson = { _id: string; name: string };
type Module = { _id: string; course: string; name: string; lessons?: Lesson[] };

export default function Modules() {
  const params = useParams();
  const cid = Array.isArray(params?.cid) ? params?.cid[0] : params?.cid;
  const dispatch = useDispatch();
  const { modules } = useSelector(
    (state: RootState) => state.modulesReducer as any
  );

  const fetchModules = async () => {
    if (!cid) return;
    try {
      const data = await client.findModulesForCourse(cid as string);
      dispatch(setModules(data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchModules();
  }, [cid]);

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {modules.map((mod: Module) => (
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
                onEdit={() => {
                  // Module edit functionality - implement API call here
                  console.log("Edit module:", mod._id);
                }}
                onDelete={() => {
                  // Module delete functionality - implement API call here
                  console.log("Delete module:", mod._id);
                }}
                onAddLesson={() => {
                  // Add lesson functionality - implement API call here
                  console.log("Add lesson to module:", mod._id);
                }}
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
