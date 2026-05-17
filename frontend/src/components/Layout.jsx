import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/search';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-salmon/30 bg-cream/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link to="/search" className="font-display text-2xl text-coral no-underline">
            AccessMap
          </Link>
          {user && (
            <nav className="flex items-center gap-3 text-sm">
              {isHome && (
                <Link
                  to="/profile"
                  className="text-[#5c5650] hover:text-coral transition-colors no-underline"
                >
                  Edit profile
                </Link>
              )}
              <button
                type="button"
                onClick={logout}
                className="text-[#5c5650] hover:text-coral transition-colors bg-transparent border-0 cursor-pointer text-sm"
              >
                Sign out
              </button>
            </nav>
          )}
        </div>
      </header>
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
