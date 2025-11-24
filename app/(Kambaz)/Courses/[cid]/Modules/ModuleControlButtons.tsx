import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus, BsTrash, BsPencil } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import { useDispatch } from "react-redux";
import {
  deleteModule,
  updateModule,
  addLesson,
} from "../../../Modules/reducer";

type ModuleControlButtonsProps = {
  moduleId: string;
  moduleName: string;
  courseId: string;
};

export default function ModuleControlButtons({
  moduleId,
  moduleName,
  courseId,
}: ModuleControlButtonsProps) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (confirm(`Delete module "${moduleName}"?`)) {
      dispatch(deleteModule(moduleId));
    }
  };

  const handleEdit = () => {
    const newName = prompt("Enter new module name:", moduleName);
    if (newName && newName.trim()) {
      dispatch(
        updateModule({
          _id: moduleId,
          name: newName,
          course: courseId,
        })
      );
    }
  };

  const handleAddLesson = () => {
    const lessonName = prompt("Enter lesson name:");
    if (lessonName && lessonName.trim()) {
      dispatch(
        addLesson({
          moduleId: moduleId,
          lesson: {
            name: lessonName,
          },
        })
      );
    }
  };

  const handleShowMenu = () => {
    // Module menu functionality can be implemented here
    // For now, this is a placeholder
  };

  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPencil
        className="fs-5 me-2"
        style={{ cursor: "pointer" }}
        onClick={handleEdit}
      />
      <BsTrash
        className="fs-5 me-2 text-danger"
        style={{ cursor: "pointer" }}
        onClick={handleDelete}
      />
      <BsPlus
        className="fs-4 me-2"
        style={{ cursor: "pointer" }}
        onClick={handleAddLesson}
      />
      <IoEllipsisVertical
        className="fs-4"
        style={{ cursor: "pointer" }}
        onClick={handleShowMenu}
      />
    </div>
  );
}
