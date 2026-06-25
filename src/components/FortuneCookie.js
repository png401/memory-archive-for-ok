import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function FortuneCookie() {
  const [opened, setOpened] = useState(false);
  const [fortune, setFortune] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alreadyOpened, setAlreadyOpened] = useState(false);

  const todayKey = `fortune_${new Date().toISOString().slice(0, 10)}`;

  useEffect(() => {
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      setFortune(JSON.parse(saved));
      setAlreadyOpened(true);
      setOpened(true);
    }
  }, []);

  const handleOpen = async () => {
    if (alreadyOpened) return;
    setLoading(true);

    const { data } = await supabase.from('fortune_items').select('*');
    if (!data || data.length === 0) {
      setFortune({ content: '아직 포춘이 없어 — 가사나 편지 구절을 추가해줘!', source: '' });
    } else {
      const random = data[Math.floor(Math.random() * data.length)];
      setFortune(random);
      localStorage.setItem(todayKey, JSON.stringify(random));
    }

    setOpened(true);
    setAlreadyOpened(true);
    setLoading(false);
  };

  return (
    <div className="fortune-wrapper">
      {!opened ? (
        <div className="fortune-cookie" onClick={handleOpen}>
          <div className="fortune-cookie-icon">🥠</div>
          <p className="fortune-hint">{loading ? '열리는 중...' : '오늘의 포춘쿠키를 열어봐'}</p>
        </div>
      ) : (
        <div className="fortune-opened">
          <div className="fortune-icon-small">🥠</div>
          <p className="fortune-content">"{fortune?.content}"</p>
          {fortune?.source && (
            <p className="fortune-source">— {fortune.source}</p>
          )}
          {alreadyOpened && (
            <p className="fortune-tomorrow">내일 또 열 수 있어</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FortuneCookie;