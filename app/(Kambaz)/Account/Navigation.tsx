import Link from "next/link";

export default function AccountNavigation() {
  return (
    <ul>
      <li>
        <Link href="Signin" id="wd-signin-link">
          Sign In
        </Link>
      </li>
      <li>
        <Link href="Signup" id="wd-signup-link">
          Sign Up
        </Link>
      </li>
      <li>
        <Link href="Profile" id="wd-profile-link">
          Profile
        </Link>
      </li>
    </ul>
  );
}
