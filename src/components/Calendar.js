import React, { useState } from 'react';

function Calendar({ memories, onSelectDate }) {
  const [viewDate, setViewDate] = useState(new Date());

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 이 달에 사진 있는 날짜들 (월/일만)
  const markedDates = new Set(
    memories
      .filter(m => {
        const d = new Date(m.date);
        return d.getMonth() === month;
      })
      .map(m => new Date(m.date).getDate())
  );

  // 날짜 클릭 → 모든 연도 같은 월/일 사진 모아서 전달
  const handleDayClick = (day) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    const matched = memories.filter(m => {
      const d = new Date(m.date);
      return String(d.getMonth() + 1).padStart(2, '0') === mm &&
             String(d.getDate()).padStart(2, '0') === dd;
    });
    if (matched.length > 0) onSelectDate(mm, dd, matched);
  };

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  return (
    <div className="calendar">
      <div className="cal-header">
        <button onClick={prevMonth}>‹</button>
        <span>{year}년 {month + 1}월</span>
        <button onClick={nextMonth}>›</button>
      </div>
      <div className="cal-weekdays">
        {['일','월','화','수','목','금','토'].map(d => (
          <div key={d} className="cal-weekday">{d}</div>
        ))}
      </div>
      <div className="cal-grid">
        {days.map((day, i) => (
          <div
            key={i}
            className={`cal-day ${day && markedDates.has(day) ? 'has-memory' : ''} ${!day ? 'empty' : ''}`}
            onClick={() => day && markedDates.has(day) && handleDayClick(day)}
          >
            {day && <span>{day}</span>}
            {day && markedDates.has(day) && <div className="cal-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;