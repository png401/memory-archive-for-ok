import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

function MemoryDetail({ memory, onClose, onUpdate }) {
  const [date, setDate] = useState(memory.date);
  const [caption, setCaption] = useState(memory.caption || '');
  const [spotifyId, setSpotifyId] = useState(memory.spotify_id || '');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [fromName, setFromName] = useState('');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const imgs = memory.img_url ? memory.img_url.split(',') : [];

  const fetchComments = async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('memory_id', memory.id)
      .order('created_at', { ascending: true });
    setComments(data || []);
  };

  useEffect(() => { fetchComments(); }, []);

  const handleSave = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('memories')
      .update({ date, caption, spotify_id: spotifyId || null })
      .eq('id', memory.id);
    if (!error) { onUpdate(); setEditing(false); }
    setLoading(false);
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;
    await supabase.from('comments').insert([{
      memory_id: memory.id,
      content: newComment,
      from_name: fromName || '나'
    }]);
    setNewComment('');
    fetchComments();
  };

  const formatted = (d) => {
    const date = new Date(d);
    return `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일`;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>
        
        {/* 사진들 */}
        <div className="detail-imgs">
          {imgs.map((url, i) => (
            <img key={i} src={url} alt="추억" className="detail-img" />
          ))}
        </div>

        <div className="detail-body">
          {!editing ? (
            <>
              <div className="detail-meta">
                <span className="card-date">{formatted(memory.date)}</span>
                <button className="edit-btn" onClick={() => setEditing(true)}>수정</button>
              </div>
              {memory.caption && <p className="card-caption">{memory.caption}</p>}
              {memory.spotify_id && (
                <iframe
                  title="spotify"
                  src={`https://open.spotify.com/embed/track/${memory.spotify_id}?theme=0`}
                  width="100%" height="80" frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              )}
            </>
          ) : (
            <div className="edit-form">
              <div className="field">
                <label>날짜</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="field">
                <label>한마디</label>
                <textarea value={caption} onChange={e => setCaption(e.target.value)} />
              </div>
              <div className="field">
                <label>Spotify 트랙 ID</label>
                <input type="text" value={spotifyId} onChange={e => setSpotifyId(e.target.value)} placeholder="4iJyoBOLtHqaWYs3vysPZP" />
              </div>
              <div className="modal-actions">
                <button onClick={() => setEditing(false)}>취소</button>
                <button onClick={handleSave} disabled={loading}>
                  {loading ? '저장 중...' : '저장'}
                </button>
              </div>
            </div>
          )}

          {/* 댓글 */}
          <div className="comments">
            <p className="comments-title">댓글 {comments.length}</p>
            {comments.map(c => (
              <div key={c.id} className="comment">
                <span className="comment-from">{c.from_name}</span>
                <span className="comment-content">{c.content}</span>
              </div>
            ))}
            <div className="comment-input">
              <input
                type="text"
                placeholder="이름"
                value={fromName}
                onChange={e => setFromName(e.target.value)}
                className="comment-name"
              />
              <input
                type="text"
                placeholder="댓글 달기..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleComment()}
              />
              <button onClick={handleComment}>↑</button>
            </div>
          </div>
        </div>

        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}

export default MemoryDetail;