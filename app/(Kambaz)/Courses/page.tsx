import Link from "next/link";
import { ListGroup, ListGroupItem, Card } from "react-bootstrap";
import Image from "next/image";

type Course = {
  _id?: string;
  id?: string;
  name?: string;
  number?: string;
  description?: string;
  image?: string;
  term?: string;
  startDate?: string;
  endDate?: string;
};

async function fetchCourses(): Promise<Course[]> {
  const origin = process.env.NEXT_PUBLIC_HTTP_SERVER;
  
  if (!origin) {
    console.error("NEXT_PUBLIC_HTTP_SERVER is not configured");
    return [];
  }
  
  try {
    const res = await fetch(`${origin}/api/courses`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch courses: ${res.status}`);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export default async function CoursesIndex() {
  const origin = process.env.NEXT_PUBLIC_HTTP_SERVER;
  const courses = await fetchCourses();

  if (!origin) {
    return (
      <div className="p-4">
        <div className="alert alert-danger">
          <h3>⚠️ Configuration Error</h3>
          <p>
            <strong>NEXT_PUBLIC_HTTP_SERVER</strong> environment variable is not configured.
          </p>
          <p>Please check the <a href="/env-check">environment check page</a> for setup instructions.</p>
        </div>
      </div>
    );
  }

  if (!courses || courses.length === 0) {
    return (
      <div className="p-4">
        <h2>No Courses Available</h2>
        <p>Please add courses from the Dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">Select a Course</h2>
      <ListGroup>
        {courses.map((course) => (
          <ListGroupItem
            key={course._id || course.id}
            action
            as={Link}
            href={`/Courses/${course._id || course.id}/Home`}
            className="mb-3 p-0"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            <Card className="border-0">
              <Card.Body className="d-flex align-items-center">
                <div
                  className="me-3"
                  style={{
                    width: "80px",
                    height: "80px",
                    position: "relative",
                  }}
                >
                  <Image
                    src={course.image || "/images/reactjs.webp"}
                    alt={course.name || "Course"}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
                <div className="flex-fill">
                  <h5 className="mb-1 text-danger">{course.name}</h5>
                  <div className="text-muted small mb-1">
                    {course.number && <span>{course.number}</span>}
                    {course.term && <span> • {course.term}</span>}
                  </div>
                  {course.description && (
                    <p className="mb-0 small">{course.description}</p>
                  )}
                  {course.startDate && course.endDate && (
                    <div className="text-muted small">
                      {course.startDate} - {course.endDate}
                    </div>
                  )}
                </div>
                <div className="text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </div>
              </Card.Body>
            </Card>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
