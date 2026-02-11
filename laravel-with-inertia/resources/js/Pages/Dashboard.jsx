import AuthLayout from '@/Layouts/AuthLayout';

export default function Dashboard({ auth }) {
  return (
    <AuthLayout>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-xl font-bold mb-2">
          Welcome, {auth.user.name}
        </h1>
        <p className="text-gray-600">You are logged in.</p>
      </div>
    </AuthLayout>
  );
}
