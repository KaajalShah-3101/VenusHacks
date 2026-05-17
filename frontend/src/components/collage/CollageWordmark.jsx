import { Link } from 'react-router-dom';
import Nor from '../mascot/Nor';

export default function CollageWordmark({ size = 44, linkTo = '/search' }) {
  const inner = (
    <div className="am-wordmark-stack">
      <Nor size={size} expression="wink" />
      <span className="am-wordmark" style={{ fontSize: size * 1.1 }}>
        <span className="via">Via</span>nor
      </span>
    </div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="no-underline" style={{ color: 'inherit' }}>
        {inner}
      </Link>
    );
  }
  return inner;
}
