import React from 'react';

function LetterCard({ letter }) {
  const date = new Date(letter.date);
  const formatted = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-meta">
          <span className="card-date">From. {letter.from_name}</span>
          <span className="card-ago">{formatted}</span>
        </div>
        {letter.content && (
          <p className="card-caption letter-content">{letter.content}</p>
        )}
        {letter.img_url && (
          <img src={letter.img_url} alt="편지" className="card-img" style={{marginTop: '0.75rem'}} />
        )}
      </div>
    </div>
  );
}

export default LetterCard;