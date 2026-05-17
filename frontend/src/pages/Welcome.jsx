import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function Welcome() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { user } = await api.login(email.trim());
      setUser(user);
      const hasProfile = localStorage.getItem('accessmap_profile_complete') === 'true';
      navigate(hasProfile ? '/search' : '/onboarding');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto text-center space-y-8 py-8">
      <div>
        <h1 className="font-display text-4xl text-coral m-0">AccessMap</h1>
        <p className="text-[#6b6560] mt-4 leading-relaxed">
          Find venues that match <em>your</em> accessibility needs — not a single wheelchair icon.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <label className="block">
          <span className="text-sm font-medium text-[#3d3832]">Email</span>
          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1.5 w-full px-4 py-3 rounded-xl border-2 border-salmon/30 bg-white/70 focus:border-coral focus:outline-none text-[#3d3832]"
          />
        </label>
        {error && (
          <p className="text-sm text-coral bg-coral/10 px-3 py-2 rounded-lg" role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-coral text-white font-semibold hover:bg-coral/90 disabled:opacity-60 transition-colors cursor-pointer border-0"
        >
          {loading ? 'Signing in…' : 'Continue'}
        </button>
      </form>

      <p className="text-xs text-[#8a8480]">
        We use a simple email sign-in for the hackathon demo. No password needed.
      </p>
    </div>
  );
}
