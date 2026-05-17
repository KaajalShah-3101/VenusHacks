import { Link } from 'react-router-dom';
import Sticker from './mascot/Sticker';
import { VENUE_STICKERS, VENUE_TAGS, fitBadgeClass } from '../lib/venueMeta';
import { toggleSaved, isSaved } from "../utils/savedPlaces";
import { useState, useEffect } from "react";

export default function VenueCard({ venue, matchScore }) {
  const placeId = venue.google_place_id;
  const meta = VENUE_STICKERS[placeId] || { kind: 'pin', color: 'var(--coral-soft)' };
  const tags = VENUE_TAGS[placeId] || [];
  const badge = fitBadgeClass(matchScore);

  return (
    <Link
      to={`/venue/${encodeURIComponent(placeId)}`}
      state={{ venue }}
      className="block no-underline"
      style={{ color: 'inherit' }}
    >
      <article
        className="sticker-card"
        style={{
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          transform: 'rotate(-0.3deg)',
        }}
      >
        <div
          style={{
            width: 68,
            height: 68,
            background: meta.color,
            borderRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1.5px solid rgba(120,90,60,0.15)',
            flexShrink: 0,
          }}
        >
          <Sticker kind={meta.kind} size={40} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 2px' }}>{venue.name}</h2>
          <p style={{ color: 'var(--ink-muted)', fontSize: 13, margin: '0 0 8px' }}>{venue.address}</p>
          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {tags.map((t) => (
                <span
                  key={t}
                  className="hand"
                  style={{
                    fontSize: 13,
                    padding: '2px 8px',
                    background: 'var(--cream)',
                    border: '1.5px dashed var(--coral-soft)',
                    borderRadius: 999,
                    color: 'var(--ink-soft)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
        {matchScore != null ? (
          <div className={`fit-badge ${badge}`}>
            <span className="score">{Math.round(matchScore)}</span>
            <span className="label">your fit</span>
          </div>
        ) : (
          <div className="fit-badge low" style={{ opacity: 0.7 }}>
            <span className="score" style={{ fontSize: 14 }}>
              —
            </span>
            <span className="label">no data</span>
          </div>
        )}
      </article>
    </Link>
  );
}
