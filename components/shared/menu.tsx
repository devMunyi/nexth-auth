import Link from "next/link";

export default function Menu() {
  return (
    <nav className="flex space-x-6 bg-gray-200 p-4">
      <Link href="/auth/login">Login</Link>
      <Link href="/auth/register">Register</Link>
    </nav>
  );
}
