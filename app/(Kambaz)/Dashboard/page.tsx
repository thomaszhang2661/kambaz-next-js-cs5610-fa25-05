"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  addCourse,
  setCourses,
  deleteCourse,
  updateCourse,
} from "../Courses/reducer";
import { FormControl, Button } from "react-bootstrap";
import * as client from "../Courses/client";
import { RootState } from "../store";

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

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => (state as any).accountReducer
  );
  const dispatch = useDispatch();

  const [course, setCourse] = useState<Course>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.webp",
    description: "New Description",
  });

  const [showAllCourses, setShowAllCourses] = useState(false);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState<Set<string>>(
    new Set()
  );

  const fetchCourses = async () => {
    try {
      if (showAllCourses) {
        const allCourses = await client.fetchAllCourses();
        dispatch(setCourses(allCourses));
      } else {
        const myCourses = await client.findMyCourses();
        dispatch(setCourses(myCourses));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchEnrolledCourses = async () => {
    try {
      const myCourses = await client.findMyCourses();
      const ids = new Set<string>(
        myCourses.map((c: Course) => (c._id || c.id) as string)
      );
      setEnrolledCourseIds(ids);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    if (showAllCourses) {
      fetchEnrolledCourses();
    }
  }, [currentUser, showAllCourses]);

  const handleAddNew = async () => {
    try {
      const newCourse = await client.createCourse(course);
      dispatch(addCourse(newCourse));
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (courseId?: string) => {
    if (!courseId) return;
    try {
      await client.deleteCourse(courseId);
      dispatch(deleteCourse(courseId));
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdate = async () => {
    try {
      await client.updateCourse(course);
      dispatch(updateCourse(course));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEnroll = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in to enroll in courses");
      return;
    }
    try {
      await client.enrollInCourse(courseId);
      setEnrolledCourseIds(new Set([...enrolledCourseIds, courseId]));
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status === 401) {
        alert("Session expired. Please sign in again.");
      } else {
        alert("Failed to enroll. Please try again.");
      }
    }
  };

  const handleUnenroll = async (courseId: string) => {
    if (!currentUser) {
      alert("Please sign in to manage enrollments");
      return;
    }
    try {
      await client.unenrollFromCourse(courseId);
      const newSet = new Set(enrolledCourseIds);
      newSet.delete(courseId);
      setEnrolledCourseIds(newSet);
    } catch (err: any) {
      console.error(err);
      if (err?.response?.status === 401) {
        alert("Session expired. Please sign in again.");
      } else {
        alert("Failed to unenroll. Please try again.");
      }
    }
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 id="wd-dashboard-published">
          {showAllCourses ? "All Courses" : "Published Courses"} (
          {courses.length})
        </h2>
        <div>
          <Button
            variant={showAllCourses ? "secondary" : "primary"}
            className="me-2"
            onClick={() => setShowAllCourses(false)}
          >
            My Courses
          </Button>
          <Button
            variant={showAllCourses ? "primary" : "secondary"}
            onClick={() => setShowAllCourses(true)}
          >
            All Courses
          </Button>
        </div>
      </div>
      {currentUser?.role === "FACULTY" && (
        <h5 className="mt-3">
          {course._id ? `Edit: ${course.name}` : "New Course"}
          <Button
            className="btn btn-primary float-end ms-2"
            id="wd-add-new-course-click"
            onClick={handleAddNew}
            disabled={!!course._id}
          >
            Add
          </Button>
          <Button
            className="btn btn-warning float-end ms-2"
            id="wd-update-course-click"
            onClick={handleUpdate}
            disabled={!course._id}
          >
            Update
          </Button>
          {course._id && (
            <Button
              className="btn btn-secondary float-end"
              onClick={() =>
                setCourse({
                  name: "New Course",
                  number: "New Number",
                  startDate: "2023-09-10",
                  endDate: "2023-12-15",
                  image: "/images/reactjs.webp",
                  description: "New Description",
                })
              }
            >
              Cancel
            </Button>
          )}
        </h5>
      )}
      {currentUser?.role === "FACULTY" && (
        <>
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
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
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
                        {showAllCourses && (
                          <>
                            {enrolledCourseIds.has(id || "") ? (
                              <Button
                                variant="danger"
                                className="me-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleUnenroll(id || "");
                                }}
                              >
                                Unenroll
                              </Button>
                            ) : (
                              <Button
                                variant="success"
                                className="me-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEnroll(id || "");
                                }}
                              >
                                Enroll
                              </Button>
                            )}
                          </>
                        )}
                        {currentUser?.role === "FACULTY" && !showAllCourses && (
                          <>
                            <Button
                              variant="warning"
                              className="me-2"
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setCourse(courseItem);
                                setTimeout(() => {
                                  window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                  });
                                }, 100);
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
                          </>
                        )}
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
