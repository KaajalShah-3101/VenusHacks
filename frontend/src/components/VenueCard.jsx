import { Link } from 'react-router-dom';
import MatchBadge from './MatchBadge';

export default function VenueCard({ venue, matchScore }) {
  const placeId = venue.google_place_id;

  return (
    <Link
      to={`/venue/${encodeURIComponent(placeId)}`}
      state={{ venue }}
      className="block no-underline group"
    >
      <article className="flex gap-4 p-4 rounded-2xl bg-white/50 border border-salmon/25 hover:border-coral/40 hover:shadow-md transition-all">
        <div className="w-16 h-16 rounded-xl bg-salmon/20 flex items-center justify-center shrink-0 text-2xl">
          📍
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-semibold text-[#3d3832] group-hover:text-coral transition-colors truncate m-0">
            {venue.name}
          </h2>
          <p className="text-sm text-[#6b6560] mt-0.5 line-clamp-2">{venue.address}</p>
          {matchScore != null && (
            <p className="text-sm text-sage font-medium mt-2">
              Meets {Math.round(matchScore)}% of your needs
            </p>
          )}
        </div>
        <MatchBadge score={matchScore} />
      </article>
    </Link>
  );
}
