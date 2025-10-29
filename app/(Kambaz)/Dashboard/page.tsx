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
    image: "/images/reactjs.jpg",
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
          {courses.map((course: Course) => {
            const id = course._id || course.id;
            const title = course.name || course.title;
            const description = course.description || course.description;
            const image = course.image || "/images/reactjs.webp";
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
                          onClick={(e) => {
                            e.preventDefault();
                            setCourse(course);
                          }}
                          id="wd-edit-course-click"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          onClick={(e) => {
                            e.preventDefault();
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
