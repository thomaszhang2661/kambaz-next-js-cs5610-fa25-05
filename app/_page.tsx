import Link from "next/link";

export default function Home() {
  return (
    <div id="wd-kambaz">
      <h1>Welcome to Kambaz</h1>

      {/* 导航菜单 */}
      <nav id="wd-kambaz-navigation">
        <h2>Navigation</h2>
        <ul>
          <li>
            <Link href="/Labs/Lab1">Lab Exercises</Link>
          </li>
          <li>
            <Link href="/Account">Account</Link>
          </li>
          <li>
            <Link href="/Dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/Courses">Courses</Link>
          </li>
          <li>
            <Link href="/Calendar">Calendar</Link>
          </li>
          <li>
            <Link href="/Inbox">Inbox</Link>
          </li>
        </ul>
      </nav>

      {/* 主要内容区域 */}
      <main id="wd-kambaz-main">
        <h2>Course Management System</h2>
        <p>This is the Kambaz learning management system built with Next.js.</p>

        <div id="wd-kambaz-courses">
          <h3>Featured Courses</h3>
          <div className="course-grid">
            <div className="course-card">
              <h4>Web Development</h4>
              <p>Learn full-stack web development with modern technologies.</p>
            </div>
            <div className="course-card">
              <h4>Data Structures</h4>
              <p>Master fundamental computer science concepts.</p>
            </div>
            <div className="course-card">
              <h4>Database Systems</h4>
              <p>Understanding relational and NoSQL databases.</p>
            </div>
          </div>
        </div>

        {/* 快速链接 */}
        <div id="wd-quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <Link href="/Labs/Lab1">View Lab Exercises</Link>
            </li>
            <li>
              <Link
                href="https://github.com/yourusername/your-repo"
                target="_blank"
              >
                Source Code
              </Link>
            </li>
            <li>
              <Link href="/profile">Student Profile</Link>
            </li>
          </ul>
        </div>
      </main>

      {/* 页脚 */}
      <footer id="wd-kambaz-footer">
        <p>&copy; 2025 Kambaz Learning Management System</p>
        <p>Built with Next.js for CS Course</p>
      </footer>
    </div>
  );
}
