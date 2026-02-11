import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Register() {
  const { data, setData, post, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  function submit(e) {
    e.preventDefault();
    post('/register');
  }

  return (
    <GuestLayout>
      <h2 className="text-2xl font-bold mb-6 text-center">Create account</h2>

      <form onSubmit={submit} className="space-y-4">
        <input
          placeholder="Name"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={e => setData('name', e.target.value)}
        />

        <input
          placeholder="Email"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={e => setData('email', e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={e => setData('password', e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={e => setData('password_confirmation', e.target.value)}
        />

        <button className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-2.5">
          Register
        </button>

        <p className="text-red-500 text-sm">{errors.email}</p>
      </form>
    </GuestLayout>
  );
}
