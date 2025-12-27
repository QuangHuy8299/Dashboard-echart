import React from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const AUTH_KEY = 'isAuthenticated';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useForm();

  const from = location.state?.from?.pathname || '/';

  const handleLogin = async () => {
    localStorage.setItem(AUTH_KEY, 'true');

    navigate(from, { replace: true });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register('email')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register('password')}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
