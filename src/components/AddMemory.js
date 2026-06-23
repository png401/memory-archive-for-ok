import React, { useState } from 'react';
import { supabase } from '../supabase';
import exifr from 'exifr';

function AddMemory({ onAdd, onClose }) {
  const [groups, setGroups] = useState({});
  const [captions, setCaptions] = useState({});
  const [spotifyIds, setSpotifyIds] = useState({});
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const grouped = {};
    for (const file of files) {
      let dateKey = null;
      try {
        const exif = await exifr.parse(file);
        if (exif?.DateTimeOriginal) {
          const d = new Date(exif.DateTimeOriginal);
          const yyyy = d.getFullYear();
          const mm = String(d.getMonth() + 1).padStart(2, '0');
          const dd = String(d.getDate()).padStart(2, '0');
          dateKey = `${yyyy}-${mm}-${dd}`;
        }
      } catch (e) {}

      if (!dateKey) dateKey = 'unknown';
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(file);
    }

    setGroups(grouped);
    setCaptions(Object.fromEntries(Object.keys(grouped).map(k => [k, ''])));
    setSpotifyIds(Object.fromEntries(Object.keys(grouped).map(k => [k, ''])));
  };

  const handleSubmit = async () => {
    const dateKeys = Object.keys(groups).filter(k => k !== 'unknown');
    if (!dateKeys.length) return alert('날짜 정보가 있는 사진이 없어!');
    setLoading(true);

    for (const dateKey of dateKeys) {
      const files = groups[dateKey];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(`${dateKey} — ${i+1}/${files.length} 업로드 중...`);

        const fileName = `${Date.now()}_${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from('memories')
          .upload(fileName, file);
        if (uploadError) continue;

        const { data } = supabase.storage.from('memories').getPublicUrl(fileName);

        await supabase.from('memories').insert([{
          date: dateKey,
          caption: captions[dateKey] || null,
          spotify_id: spotifyIds[dateKey] || null,
          img_url: data.publicUrl
        }]);
      }
    }

    setLoading(false);
    setProgress('');
    onAdd();
    onClose();
  };

  const sortedDates = Object.keys(groups).filter(k => k !== 'unknown').sort();

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>추억 추가</h3>

        <div className="field">
          <label>사진 선택 (여러 장 가능)</label>
          <input type="file" accept="image/*" multiple onChange={handleFiles} />
        </div>

        {sortedDates.length > 0 && (
          <div style={{maxHeight: '45vh', overflowY: 'auto'}}>
            <p style={{fontSize: '13px', color: '#8e8e93', marginBottom: '0.5rem', padding: '0 0.25rem'}}>
              {sortedDates.length}개 날짜, 총 {Object.values(groups).flat().length}장
            </p>
            {sortedDates.map(date => (
              <div key={date} className="field">
                <label>📅 {date} ({groups[date].length}장)</label>
                <input
                  type="text"
                  placeholder="한마디... (선택)"
                  value={captions[date]}
                  onChange={e => setCaptions(p => ({...p, [date]: e.target.value}))}
                  style={{marginBottom: '6px'}}
                />
                <input
                  type="text"
                  placeholder="Spotify 트랙 ID (선택)"
                  value={spotifyIds[date]}
                  onChange={e => setSpotifyIds(p => ({...p, [date]: e.target.value}))}
                />
              </div>
            ))}
          </div>
        )}

        {groups['unknown'] && (
          <p style={{fontSize: '12px', color: '#ff3b30', margin: '0.5rem 0'}}>
            날짜 정보 없는 사진 {groups['unknown'].length}장은 제외됩니다
          </p>
        )}

        {loading && (
          <p style={{fontSize: '13px', color: '#8e8e93', textAlign: 'center', margin: '0.5rem 0'}}>
            {progress}
          </p>
        )}

        <div className="modal-actions">
          <button onClick={onClose} disabled={loading}>취소</button>
          <button onClick={handleSubmit} disabled={loading || !sortedDates.length}>
            {loading ? '업로드 중...' : `저장`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemory;