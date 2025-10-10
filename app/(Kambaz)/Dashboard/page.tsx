import Link from "next/link";
import * as db from "../Database";

type Course = {
  _id?: string;
  id?: string;
  name?: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function Dashboard() {
  const courses = db.courses || [];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
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
                  <Link
                    href={`/Courses/${id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img
                      src={image}
                      className="card-img-top"
                      style={{ height: "160px", objectFit: "cover" }}
                      alt={title}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title wd-dashboard-course-title">
                        {title}
                      </h5>
                      <p className="card-text wd-dashboard-course-description flex-grow-1">
                        {description}
                      </p>
                      <button className="btn btn-primary mt-auto">Go</button>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
