import React, { useState } from 'react';
import { supabase } from '../supabase';

function AddMemory({ onAdd, onClose }) {
  const [date, setDate] = useState('');
  const [caption, setCaption] = useState('');
  const [spotifyId, setSpotifyId] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!date) return alert('날짜를 입력해줘!');
    setLoading(true);

    let img_url = null;

    if (imgFile) {
      const fileName = `${Date.now()}_${imgFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('memories')
        .upload(fileName, imgFile);
      if (uploadError) {
        alert('이미지 업로드 실패: ' + uploadError.message);
        setLoading(false);
        return;
      }
      const { data } = supabase.storage.from('memories').getPublicUrl(fileName);
      img_url = data.publicUrl;
    }

    const { error } = await supabase.from('memories').insert([{
      date, caption, spotify_id: spotifyId || null, img_url
    }]);

    if (error) alert('저장 실패: ' + error.message);
    else { onAdd(); onClose(); }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>추억 추가</h3>
        <div className="field">
          <label>날짜</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label>사진</label>
          <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} />
        </div>
        <div className="field">
          <label>한마디</label>
          <textarea value={caption} onChange={e => setCaption(e.target.value)} placeholder="그날 기억나? 우리..." />
        </div>
        <div className="field">
          <label>Spotify 트랙 ID (선택)</label>
          <input type="text" value={spotifyId} onChange={e => setSpotifyId(e.target.value)} placeholder="4iJyoBOLtHqaWYs3vysPZP" />
          <small>Spotify 링크에서 /track/ 뒤의 코드</small>
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>취소</button>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddMemory;