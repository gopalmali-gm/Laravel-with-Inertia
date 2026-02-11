import { Link, router } from '@inertiajs/react';

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white border-b px-6 py-4 flex justify-between">
        <span className="font-semibold">Dashboard</span>

        <button
          onClick={() => router.post('/logout')}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </nav>

      <main className="p-6">{children}</main>
    </div>
  );
}
