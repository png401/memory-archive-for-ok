import React from 'react';

function MemoryCard({ memory }) {
  const date = new Date(memory.date);
  const today = new Date();
  const yearsAgo = today.getFullYear() - date.getFullYear();
  const formatted = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
  const agoText = yearsAgo === 0 ? '올해' : `${yearsAgo}년 전`;

  return (
    <div className="card">
      {memory.img_url && (
        <img src={memory.img_url} alt="추억" className="card-img" />
      )}
      <div className="card-body">
        <div className="card-meta">
          <span className="card-date">{formatted}</span>
          <span className="card-ago">{agoText}</span>
        </div>
        <p className="card-caption">{memory.caption}</p>
        {memory.spotify_id && (
          <iframe
            title="spotify"
            src={`https://open.spotify.com/embed/track/${memory.spotify_id}?theme=0`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        )}
      </div>
    </div>
  );
}

export default MemoryCard;