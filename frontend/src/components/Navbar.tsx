import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { logout } = useAuth();
  const email = (() => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return '';
      return JSON.parse(atob(token.split('.')[1])).email as string;
    } catch {
      return '';
    }
  })();

  return (
    <nav className="bg-indigo-600 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-lg font-semibold">Task Manager</h1>
      <div className="flex items-center gap-4">
        {email && <span className="text-sm text-indigo-200 hidden sm:block">{email}</span>}
        <button
          onClick={logout}
          className="text-sm bg-indigo-500 hover:bg-indigo-400 px-3 py-1.5 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
