"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import * as db from "../Database";
import { useSelector, useDispatch } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { FormControl, Button } from "react-bootstrap";

type Course = {
  _id?: string;
  id?: string;
  name?: string;
  number?: string;
  startDate?: string;
  endDate?: string;
  title?: string;
  description?: string;
  image?: string;
};
type RootState = { coursesReducer: { courses: Course[] } };

export default function Dashboard() {
  const { courses } = useSelector(
    (state: RootState) =>
      state.coursesReducer || { courses: (db.courses || []) as Course[] }
  );
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.webp",
    description: "New Description",
  });

  const handleAddNew = () => {
    dispatch(addNewCourse(course));
  };
  const handleDelete = (courseId?: string) => {
    if (!courseId) return;
    dispatch(deleteCourse(courseId));
  };
  const handleUpdate = () => {
    dispatch(updateCourse(course));
  };
  const handleEdit = (courseToEdit: Course) => {
    setCourse(courseToEdit);
    // Scroll to top to show the form
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <h5 className="mt-3">
        New Course
        <Button
          className="btn btn-primary float-end ms-2"
          id="wd-add-new-course-click"
          onClick={handleAddNew}
        >
          Add
        </Button>
        <Button
          className="btn btn-warning float-end"
          id="wd-update-course-click"
          onClick={handleUpdate}
        >
          Update
        </Button>
      </h5>
      <FormControl
        value={course.name}
        className="mb-2 mt-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        value={course.description}
        rows={3}
        className="mb-3"
        as="textarea"
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />
      <div id="wd-dashboard-courses" className="mt-4">
        <div className="row g-4">
          {courses.map((courseItem: Course) => {
            const id = courseItem._id || courseItem.id;
            const title = courseItem.name || courseItem.title;
            const description =
              courseItem.description || courseItem.description;
            const image = courseItem.image || "/images/reactjs.webp";
            return (
              <div
                key={id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wd-dashboard-course"
                style={{ maxWidth: "270px", minWidth: "250px" }}
              >
                <div className="card h-100">
                  <Image
                    src={image}
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "cover" }}
                    alt={title || "Course image"}
                    width={400}
                    height={160}
                  />
                  <div className="card-body d-flex flex-column">
                    <Link
                      href={`/Courses/${id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <h5 className="card-title wd-dashboard-course-title">
                        {title}
                      </h5>
                      <p className="card-text wd-dashboard-course-description">
                        {description}
                      </p>
                    </Link>
                    <div className="mt-auto d-flex justify-content-between">
                      <Link
                        href={`/Courses/${id}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </Link>
                      <div>
                        <Button
                          variant="warning"
                          className="me-2"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleEdit(courseItem);
                          }}
                          id="wd-edit-course-click"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDelete(id);
                          }}
                          id="wd-delete-course-click"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
