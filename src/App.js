import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import MemoryCard from './components/MemoryCard';
import LetterCard from './components/LetterCard';
import AddMemory from './components/AddMemory';
import AddLetter from './components/AddLetter';
import MemoryDetail from './components/MemoryDetail';
import Calendar from './components/Calendar';
import Tree from './components/Tree';
import Forest from './components/Forest';
import './App.css';

function App() {
  const [tab, setTab] = useState('today');
  const [memories, setMemories] = useState([]);
  const [letters, setLetters] = useState([]);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [showAddLetter, setShowAddLetter] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [calSelected, setCalSelected] = useState(null);

  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');

  const startDate = new Date('2017-03-01');
  const daysTogether = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

  const fetchMemories = async () => {
    const { data } = await supabase.from('memories').select('*').order('date', { ascending: false });
    setMemories(data || []);
  };

  const fetchLetters = async () => {
    const { data } = await supabase.from('letters').select('*').order('date', { ascending: false });
    setLetters(data || []);
  };

  useEffect(() => {
    fetchMemories();
    fetchLetters();
  }, []);

  const todayMemories = memories.filter(m => {
    const d = new Date(m.date);
    const mmd = String(d.getMonth()+1).padStart(2,'0');
    const mdd = String(d.getDate()).padStart(2,'0');
    return mmd === mm && mdd === dd;
  });

  return (
    <div className="app">
      <div className="header">
        <h1>우리의 아카이브</h1>
        <p>사진, 편지, 그리고 우리가 듣던 노래들</p>
        <div className="tab-bar">
          <button className={tab === 'today' ? 'tab active' : 'tab'} onClick={() => setTab('today')}>오늘</button>
          <button className={tab === 'all' ? 'tab active' : 'tab'} onClick={() => setTab('all')}>전체</button>
          <button className={tab === 'calendar' ? 'tab active' : 'tab'} onClick={() => setTab('calendar')}>달력</button>
          <button className={tab === 'tree' ? 'tab active' : 'tab'} onClick={() => setTab('tree')}>나무</button>
          <button className={tab === 'forest' ? 'tab active' : 'tab'} onClick={() => setTab('forest')}>숲</button>
          <button className={tab === 'letters' ? 'tab active' : 'tab'} onClick={() => setTab('letters')}>편지</button>
        </div>
      </div>

      {tab === 'today' && (
        <div className="section">
          <div className="today-banner">오늘은 {mm}월 {dd}일 — 과거의 이날을 돌아봐</div>
          {todayMemories.length === 0
            ? <p className="empty">오늘의 추억이 아직 없어 🥲</p>
            : todayMemories.map(m => (
              <MemoryCard key={m.id} memory={m} onClick={() => setSelectedMemory(m)} />
            ))
          }
          <button className="add-btn" onClick={() => setShowAddMemory(true)}>+ 추억 추가하기</button>
        </div>
      )}

      {tab === 'all' && (
        <div className="section">
          {memories.length === 0
            ? <p className="empty">아직 추억이 없어</p>
            : memories.map(m => (
              <MemoryCard key={m.id} memory={m} onClick={() => setSelectedMemory(m)} />
            ))
          }
          <button className="add-btn" onClick={() => setShowAddMemory(true)}>+ 추억 추가하기</button>
        </div>
      )}

      {tab === 'calendar' && (
        <div className="section">
          <Calendar
            memories={memories}
            onSelectDate={(mm, dd, matched) => setCalSelected({ mm, dd, memories: matched })}
          />
          {calSelected && (
            <div className="cal-results">
              <p className="cal-results-title">
                {calSelected.mm}월 {calSelected.dd}일의 추억 ({calSelected.memories.length})
              </p>
              {calSelected.memories.map(m => (
                <MemoryCard key={m.id} memory={m} onClick={() => setSelectedMemory(m)} />
              ))}
            </div>
          )}
          <button className="add-btn" onClick={() => setShowAddMemory(true)}>+ 추억 추가하기</button>
        </div>
      )}

      {tab === 'tree' && (
        <div className="section">
          <Tree daysTogether={daysTogether} memoryCount={memories.length} />
        </div>
      )}

      {tab === 'forest' && (
        <div className="section">
          <Forest memoryCount={memories.length} />
        </div>
      )}

      {tab === 'letters' && (
        <div className="section">
          {letters.length === 0
            ? <p className="empty">아직 편지가 없어</p>
            : letters.map(l => <LetterCard key={l.id} letter={l} />)
          }
          <button className="add-btn" onClick={() => setShowAddLetter(true)}>+ 편지 추가하기</button>
        </div>
      )}

      {showAddMemory && (
        <AddMemory onAdd={fetchMemories} onClose={() => setShowAddMemory(false)} />
      )}
      {showAddLetter && (
        <AddLetter onAdd={fetchLetters} onClose={() => setShowAddLetter(false)} />
      )}
      {selectedMemory && (
        <MemoryDetail
          memory={selectedMemory}
          onClose={() => setSelectedMemory(null)}
          onUpdate={() => { fetchMemories(); setSelectedMemory(null); }}
        />
      )}
    </div>
  );
}

export default App;