"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus, BsTrash, BsPencil } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";

type ModuleControlButtonsProps = {
  moduleId: string;
  moduleName: string;
  courseId: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onAddLesson?: () => void;
};

export default function ModuleControlButtons({
  moduleId, // eslint-disable-line @typescript-eslint/no-unused-vars
  moduleName,
  courseId, // eslint-disable-line @typescript-eslint/no-unused-vars
  onEdit,
  onDelete,
  onAddLesson,
}: ModuleControlButtonsProps) {
  const handleEdit = () => {
    const newName = prompt("Enter new module name:", moduleName);
    if (newName && newName.trim() && onEdit) {
      onEdit();
    }
  };

  const handleDelete = () => {
    if (confirm(`Delete module "${moduleName}"?`) && onDelete) {
      onDelete();
    }
  };

  const handleAddLesson = () => {
    const lessonName = prompt("Enter lesson name:");
    if (lessonName && lessonName.trim() && onAddLesson) {
      onAddLesson();
    }
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
      <IoEllipsisVertical className="fs-4" style={{ cursor: "pointer" }} />
    </div>
  );
}
