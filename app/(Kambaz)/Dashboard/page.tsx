import Link from "next/link";

export default function Dashboard() {
  const courses = [
    {
      id: "1234",
      title: "CS5610 React JS",
      description: "Full Stack Web Development using MERN stack",
      image: "/images/reactjs.webp",
    },
    {
      id: "2345",
      title: "CS5200 Database Systems",
      description: "Advanced database concepts and distributed systems",
      image: "/images/stacked.jpg",
    },
    {
      id: "3456",
      title: "CS4550 Web Development",
      description: "Modern web development with JavaScript and React",
      image: "/images/reactjs.webp",
    },
    {
      id: "4567",
      title: "CS5010 Programming",
      description: "Programming Design Paradigm",
      image: "/images/stacked.jpg",
    },
    {
      id: "5678",
      title: "CS5800 Algorithms",
      description: "Algorithm analysis and design techniques",
      image: "/images/reactjs.webp",
    },
    {
      id: "6789",
      title: "CS5100 AI",
      description: "Artificial Intelligence and Machine Learning",
      image: "/images/stacked.jpg",
    },
    {
      id: "7890",
      title: "CS5340 Computer Networks",
      description: "Computer networking and distributed systems",
      image: "/images/reactjs.webp",
    },
  ];

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <div id="wd-dashboard-courses" className="mt-4">
        <div className="row g-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="col-xl-3 col-lg-4 col-md-6 col-sm-12 wd-dashboard-course"
              style={{ maxWidth: "270px", minWidth: "250px" }}
            >
              <div className="card h-100">
                <Link
                  href={`/Courses/${course.id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <img
                    src={course.image}
                    className="card-img-top"
                    style={{ height: "160px", objectFit: "cover" }}
                    alt={course.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title wd-dashboard-course-title">
                      {course.title}
                    </h5>
                    <p className="card-text wd-dashboard-course-description flex-grow-1">
                      {course.description}
                    </p>
                    <button className="btn btn-primary mt-auto">Go</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
