import React from 'react';

function PhotoGrid({ memories, onSelect }) {
  const grouped = {};
  memories.forEach(m => {
    const d = new Date(m.date);
    const key = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(m);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const isThisYear = year === new Date().getFullYear();
    return isThisYear ? `${month}월 ${day}일` : `${year}년 ${month}월 ${day}일`;
  };

  const getGridClass = (count) => {
    if (count === 1) return 'pg-grid-1';
    if (count === 2) return 'pg-grid-2';
    return 'pg-grid-3';
  };

  return (
    <div className="pg-container">
      {sortedDates.map(date => {
        const items = grouped[date];
        return (
          <div key={date} className="pg-group">
            <p className="pg-date-label">{formatDate(date)}</p>
            <div className={`pg-grid ${getGridClass(items.length)}`}>
              {items.map((m, i) => (
                <div
                  key={m.id}
                  className={`pg-cell ${items.length === 4 && i === 0 ? 'pg-cell-tall' : ''}`}
                  onClick={() => onSelect(m)}
                >
                  {m.img_url
                    ? <img src={m.img_url} alt="" />
                    : <div className="pg-cell-empty" />
                  }
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PhotoGrid;