import React, { useState } from 'react';
import { supabase } from '../supabase';

function AddLetter({ onAdd, onClose }) {
  const [date, setDate] = useState('');
  const [fromName, setFromName] = useState('');
  const [content, setContent] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!date) return alert('날짜를 입력해줘!');
    setLoading(true);

    let img_url = null;

    if (imgFile) {
      const fileName = `${Date.now()}_${imgFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('letters')
        .upload(fileName, imgFile);
      if (uploadError) {
        alert('이미지 업로드 실패: ' + uploadError.message);
        setLoading(false);
        return;
      }
      const { data } = supabase.storage.from('letters').getPublicUrl(fileName);
      img_url = data.publicUrl;
    }

    const { error } = await supabase.from('letters').insert([{
      date, from_name: fromName, content: content || null, img_url
    }]);

    if (error) alert('저장 실패: ' + error.message);
    else { onAdd(); onClose(); }
    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>편지 추가</h3>
        <div className="field">
          <label>날짜</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div className="field">
          <label>보낸 사람</label>
          <input type="text" value={fromName} onChange={e => setFromName(e.target.value)} placeholder="나 / 친구 이름" />
        </div>
        <div className="field">
          <label>편지 내용 (선택)</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="편지를 여기 써도 되고..." />
        </div>
        <div className="field">
          <label>편지 사진 (선택)</label>
          <input type="file" accept="image/*" onChange={e => setImgFile(e.target.files[0])} />
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

export default AddLetter;