import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import CollageBg from './CollageBg';
import CollageWordmark from './CollageWordmark';
import ScatteredStickers from './ScatteredStickers';

const BG = {
  '/search': 'var(--lavender-soft)',
  '/onboarding': 'var(--sage-soft)',
  '/profile': 'var(--sage-soft)',
};

const STICKERS = {
  '/search': 'search',
  '/onboarding': 'onboarding',
  '/profile': 'onboarding',
};

export default function CollageLayout({ children, bgColor, stickerVariant }) {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const isSearch = pathname === '/search';
  const isVenue = pathname.startsWith('/venue');

  const bg = bgColor || (isVenue ? 'var(--coral-soft)' : BG[pathname]) || 'var(--cream)';
  const stickers =
    stickerVariant || (isVenue ? 'detail' : STICKERS[pathname]) || 'search';

  return (
    <div className="am-screen has-noise min-h-screen flex flex-col">
      <CollageBg color={bg} />
      <ScatteredStickers variant={stickers} />

      <header className="am-topbar shrink-0">
        <CollageWordmark size={36} />
        <nav className="am-topbar-right">
          {isSearch && <Link to="/profile">Edit profile</Link>}
          {isVenue && !pathname.includes('/review') && (
            <Link to="/search">← Back to list</Link>
          )}
          {pathname.includes('/review') && (
            <Link to={pathname.replace('/review', '')}>← Back to venue</Link>
          )}
          <button type="button" onClick={logout} className="am-link-btn">
            Sign out
          </button>
        </nav>
      </header>

      <main className="collage-main flex-1 relative z-[1]">{children}</main>
    </div>
  );
}
