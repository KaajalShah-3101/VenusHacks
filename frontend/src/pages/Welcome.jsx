import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';
import FlyingNor from '../components/mascot/FlyingNor';
import Nor from '../components/mascot/Nor';
import Sticker from '../components/mascot/Sticker';
import SquiggleUnderline from '../components/mascot/SquiggleUnderline';
import CollageBg from '../components/collage/CollageBg';
import ScatteredStickers from '../components/collage/ScatteredStickers';

export default function Welcome() {
const [email, setEmail] = useState('');
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const { setUser, setProfileCompleteStatus } = useAuth();
const navigate = useNavigate();

async function handleSubmit(e) {
e.preventDefault();
setError('');
setLoading(true);


try {
  const { user } = await api.login(email.trim());
  setUser(user);
  console.log("LOGIN USER:", user);

  // 🔥 FIX: track user + reset onboarding for new emails
  const profileRes = await fetch(`http://localhost:5001/profile/${user.id}`);
  const profileData = await profileRes.json();

  if (profileData.hasProfile) {
    setProfileCompleteStatus(true);
    navigate("/search");
  } else {
    setProfileCompleteStatus(false);
    navigate("/onboarding");
  }

} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}


}

return ( <div className="am-screen has-noise"> <CollageBg color="var(--coral-soft)" /> <ScatteredStickers variant="signin" />


  {/* ✨ Flying Nor animation */}
  <FlyingNor />

  <div className="collage-signin-wrap">
    <div className="collage-signin-card-outer">
      <div className="collage-signin-card-back" aria-hidden="true" />
      <div
        className="sticker-card"
        style={{ padding: '40px 32px 28px', position: 'relative' }}
      >
        <div className="tape sage" style={{ top: -12, left: 36, transform: 'rotate(-8deg)' }} />
        <div className="tape lavender" style={{ top: -10, right: 40, transform: 'rotate(10deg)' }} />
        <div className="tape berry" style={{ bottom: -12, right: 48, transform: 'rotate(-4deg)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 10 }}>
          <div style={{ position: 'relative' }}>
            <Nor size={100} waving />
            <div
              className="hand"
              style={{
                position: 'absolute',
                left: '100%',
                top: 8,
                marginLeft: 4,
                background: 'var(--sage-soft)',
                border: '2px solid var(--sage-deep)',
                padding: '6px 12px',
                borderRadius: 16,
                fontSize: 17,
                color: 'var(--sage-deep)',
                whiteSpace: 'nowrap',
                transform: 'rotate(4deg)',
              }}
            >
              hi, I&apos;m Nor!
            </div>
          </div>

          <div className="am-wordmark" style={{ fontSize: 48, marginTop: 4 }}>
            <span className="via">Via</span>nor
          </div>

          <SquiggleUnderline width={200} />
        </div>

        <p
          style={{
            textAlign: 'center',
            color: 'var(--ink-soft)',
            fontSize: 15,
            lineHeight: 1.5,
            margin: '0 0 22px',
          }}
        >
          Find venues that match{' '}
          <em className="hand" style={{ fontSize: 20, color: 'var(--coral-deep)' }}>
            your
          </em>{' '}
          accessibility needs — not a single wheelchair icon.
        </p>

        <form onSubmit={handleSubmit}>
          <label className="am-label">✉️ Email</label>

          <input
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="am-input"
            style={{ marginBottom: 14 }}
          />

          {error && (
            <p className="am-alert" role="alert" style={{ marginBottom: 12 }}>
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="am-btn big">
            {loading ? 'One moment…' : (
              <>
                Let&apos;s go <span style={{ marginLeft: 8 }}>✿</span>
              </>
            )}
          </button>
        </form>

        <p
          className="hand"
          style={{
            textAlign: 'center',
            marginTop: 14,
            fontSize: 16,
            color: 'var(--ink-muted)',
          }}
        >

        </p>
      </div>
    </div>
  </div>

  <Sticker
    kind="star"
    size={44}
    rotate={-10}
    style={{ position: 'absolute', top: 200, right: 24, pointerEvents: 'none' }}
  />
</div>


);
}
