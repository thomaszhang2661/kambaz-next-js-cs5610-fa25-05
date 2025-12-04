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

  const handleUpdateModule = async (moduleId: string, newName: string) => {
    if (!cid) return;
    try {
      await client.updateModule(cid as string, {
        _id: moduleId,
        name: newName,
      });
      // Update local state immediately
      dispatch(
        setModules(
          modules.map((m: Module) =>
            m._id === moduleId ? { ...m, name: newName } : m
          )
        )
      );
      // Refresh from server to confirm
      try {
        const latest = await client.findModulesForCourse(cid as string);
        dispatch(setModules(latest));
      } catch (err) {
        console.error(err);
      }
    } catch (err) {
      console.error("Error updating module:", err);
      alert("Failed to update module");
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!cid) return;
    try {
      await client.deleteModule(cid as string, moduleId);
      // Update local state immediately
      dispatch(setModules(modules.filter((m: Module) => m._id !== moduleId)));
    } catch (err) {
      console.error("Error deleting module:", err);
      alert("Failed to delete module");
    }
  };

  const handleAddModule = async () => {
    if (!cid) return;
    const name = prompt("Enter module name:");
    if (!name) return;
    try {
      const newModule = await client.createModuleForCourse(cid as string, {
        name,
        course: cid,
      });
      // Update local state immediately
      dispatch(setModules([...modules, newModule]));
    } catch (err) {
      console.error("Error creating module:", err);
      alert("Failed to create module");
    }
  };

  const handleAddLesson = async (moduleId: string) => {
    if (!cid) return;
    const lessonName = prompt("Enter lesson name:");
    if (!lessonName || !lessonName.trim()) return;

    try {
      // Find the module and add the new lesson
      const currentModule = modules.find((m: Module) => m._id === moduleId);
      if (!currentModule) return;

      const newLesson = {
        _id: new Date().getTime().toString(),
        name: lessonName.trim(),
      };

      const updatedModule = {
        ...currentModule,
        lessons: [...(currentModule.lessons || []), newLesson],
      };

      // Update the module on the server
      await client.updateModule(cid as string, updatedModule);

      // Update local state
      dispatch(
        setModules(
          modules.map((m: Module) => (m._id === moduleId ? updatedModule : m))
        )
      );
    } catch (err) {
      console.error("Error adding lesson:", err);
      alert("Failed to add lesson");
    }
  };

  useEffect(() => {
    const fetchModules = async () => {
      if (!cid) return;
      try {
        const data = await client.findModulesForCourse(cid as string);
        dispatch(setModules(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchModules();
  }, [cid, dispatch]);

  return (
    <div>
      <ModulesControls onAddModule={handleAddModule} />
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
                onEdit={(newName) => handleUpdateModule(mod._id, newName)}
                onDelete={() => handleDeleteModule(mod._id)}
                onAddLesson={() => handleAddLesson(mod._id)}
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
