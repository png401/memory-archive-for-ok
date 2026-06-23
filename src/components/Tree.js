import React from 'react';

function Tree({ daysTogether, memoryCount }) {
  const years = Math.floor(daysTogether / 365);
  const days = daysTogether % 365;

  const month = new Date().getMonth();
  const season = month >= 2 && month <= 4 ? 'spring'
    : month >= 5 && month <= 7 ? 'summer'
    : month >= 8 && month <= 10 ? 'autumn'
    : 'winter';

  const colors = {
    spring: { light: '#ffd6e0', mid: '#ffc8d3', dark: '#ffb7c5', trunk: '#c4956a', root: '#b08050' },
    summer: { light: '#5ca653', mid: '#4a8c3f', dark: '#3d7a34', trunk: '#8B6914', root: '#7a5010' },
    autumn: { light: '#f0933a', mid: '#e8822a', dark: '#c85f14', trunk: '#7a5010', root: '#6a4010' },
    winter: { light: '#d8ecf8', mid: '#c8dff0', dark: '#aac8e0', trunk: '#8a7a6a', root: '#7a6a5a' },
  };
  const c = colors[season];

  const stage = years < 1 ? 1
    : years < 3 ? 2
    : years < 5 ? 3
    : years < 7 ? 4
    : years < 9 ? 5
    : years < 12 ? 6
    : 7;

  const labels = {
    1: '이제 막 싹이 텄어 🌱',
    2: '조금씩 자라고 있어 🌿',
    3: '가지가 뻗기 시작했어 🌳',
    4: '제법 큰 나무가 됐어 🌲',
    5: '울창한 나무야 🌲',
    6: '거대한 고목이 됐어 🌳✨',
    7: '전설의 나무... 🌳🌳✨',
  };

  const svgHeight = [0, 120, 150, 180, 210, 240, 270, 310][stage];

  return (
    <div className="tree-tab">
      <div className="tree-stats">
        <div className="tree-stat">
          <span className="tree-stat-num">{years}</span>
          <span className="tree-stat-label">년</span>
        </div>
        <div className="tree-stat-div" />
        <div className="tree-stat">
          <span className="tree-stat-num">{days}</span>
          <span className="tree-stat-label">일째</span>
        </div>
        <div className="tree-stat-div" />
        <div className="tree-stat">
          <span className="tree-stat-num">{memoryCount}</span>
          <span className="tree-stat-label">개의 추억</span>
        </div>
      </div>

      <div className="pixel-canvas">
        <svg width="200" height={svgHeight} viewBox={`0 0 200 ${svgHeight}`}>
          <SeasonTree stage={stage} c={c} h={svgHeight} />
        </svg>
      </div>

      <p className="tree-label">{labels[stage]}</p>
      <p className="tree-season-label">
        {season === 'spring' && '봄의 나무 🌸'}
        {season === 'summer' && '여름의 나무 🌿'}
        {season === 'autumn' && '가을의 나무 🍂'}
        {season === 'winter' && '겨울의 나무 ❄️'}
      </p>
    </div>
  );
}

function SeasonTree({ stage, c, h }) {
  const cx = 100;

  if (stage === 1) return (
    <g>
      <ellipse cx={cx} cy={h-60} rx="12" ry="10" fill={c.mid}/>
      <ellipse cx={cx} cy={h-68} rx="8" ry="7" fill={c.light}/>
      <rect x={cx-4} y={h-50} width="8" height="20" rx="4" fill={c.trunk}/>
    </g>
  );

  if (stage === 2) return (
    <g>
      <ellipse cx={cx} cy={h-80} rx="20" ry="16" fill={c.dark}/>
      <ellipse cx={cx} cy={h-88} rx="16" ry="13" fill={c.mid}/>
      <ellipse cx={cx} cy={h-78} rx="22" ry="14" fill={c.mid}/>
      <ellipse cx={cx} cy={h-70} rx="18" ry="12" fill={c.light}/>
      <rect x={cx-5} y={h-58} width="10" height="28" rx="5" fill={c.trunk}/>
      <ellipse cx={cx-12} cy={h-38} rx="10" ry="6" fill={c.root}/>
      <ellipse cx={cx+12} cy={h-36} rx="10" ry="6" fill={c.root}/>
    </g>
  );

  if (stage === 3) return (
    <g>
      <ellipse cx={cx} cy={h-110} rx="26" ry="20" fill={c.dark}/>
      <ellipse cx={cx-18} cy={h-90} rx="20" ry="15" fill={c.dark}/>
      <ellipse cx={cx+18} cy={h-90} rx="20" ry="15" fill={c.dark}/>
      <ellipse cx={cx} cy={h-88} rx="30" ry="20" fill={c.mid}/>
      <ellipse cx={cx} cy={h-100} rx="22" ry="18" fill={c.mid}/>
      <ellipse cx={cx} cy={h-78} rx="26" ry="16" fill={c.light}/>
      <rect x={cx-6} y={h-60} width="12" height="34" rx="6" fill={c.trunk}/>
      <ellipse cx={cx-16} cy={h-36} rx="12" ry="7" fill={c.root}/>
      <ellipse cx={cx+16} cy={h-34} rx="12" ry="7" fill={c.root}/>
    </g>
  );

  if (stage === 4) return (
    <g>
      <ellipse cx={cx} cy={h-130} rx="30" ry="24" fill={c.dark}/>
      <ellipse cx={cx-24} cy={h-108} rx="24" ry="18" fill={c.dark}/>
      <ellipse cx={cx+24} cy={h-108} rx="24" ry="18" fill={c.dark}/>
      <ellipse cx={cx} cy={h-105} rx="34" ry="24" fill={c.mid}/>
      <ellipse cx={cx-14} cy={h-118} rx="20" ry="16" fill={c.mid}/>
      <ellipse cx={cx+14} cy={h-118} rx="20" ry="16" fill={c.mid}/>
      <ellipse cx={cx} cy={h-92} rx="30" ry="18" fill={c.light}/>
      <rect x={cx-7} y={h-72} width="14" height="40" rx="7" fill={c.trunk}/>
      <ellipse cx={cx-20} cy={h-42} rx="14" ry="8" fill={c.root}/>
      <ellipse cx={cx+20} cy={h-40} rx="14" ry="8" fill={c.root}/>
    </g>
  );

  if (stage === 5) return (
    <g>
      <ellipse cx={cx} cy={h-148} rx="34" ry="28" fill={c.dark}/>
      <ellipse cx={cx-28} cy={h-124} rx="28" ry="22" fill={c.dark}/>
      <ellipse cx={cx+28} cy={h-124} rx="28" ry="22" fill={c.dark}/>
      <ellipse cx={cx-10} cy={h-140} rx="24" ry="20" fill={c.dark}/>
      <ellipse cx={cx+10} cy={h-140} rx="24" ry="20" fill={c.dark}/>
      <ellipse cx={cx} cy={h-118} rx="38" ry="26" fill={c.mid}/>
      <ellipse cx={cx-16} cy={h-132} rx="24" ry="18" fill={c.mid}/>
      <ellipse cx={cx+16} cy={h-132} rx="24" ry="18" fill={c.mid}/>
      <ellipse cx={cx} cy={h-104} rx="32" ry="20" fill={c.light}/>
      <rect x={cx-8} y={h-82} width="16" height="46" rx="8" fill={c.trunk}/>
      <ellipse cx={cx-24} cy={h-46} rx="16" ry="9" fill={c.root}/>
      <ellipse cx={cx+24} cy={h-44} rx="16" ry="9" fill={c.root}/>
    </g>
  );

  if (stage === 6) return (
    <g>
      <ellipse cx={cx} cy={h-168} rx="38" ry="32" fill={c.dark}/>
      <ellipse cx={cx-32} cy={h-142} rx="30" ry="24" fill={c.dark}/>
      <ellipse cx={cx+32} cy={h-142} rx="30" ry="24" fill={c.dark}/>
      <ellipse cx={cx-14} cy={h-158} rx="26" ry="22" fill={c.dark}/>
      <ellipse cx={cx+14} cy={h-158} rx="26" ry="22" fill={c.dark}/>
      <ellipse cx={cx} cy={h-134} rx="42" ry="28" fill={c.mid}/>
      <ellipse cx={cx-18} cy={h-150} rx="28" ry="22" fill={c.mid}/>
      <ellipse cx={cx+18} cy={h-150} rx="28" ry="22" fill={c.mid}/>
      <ellipse cx={cx} cy={h-118} rx="36" ry="22" fill={c.light}/>
      <rect x={cx-9} y={h-94} width="18" height="52" rx="9" fill={c.trunk}/>
      <ellipse cx={cx-28} cy={h-52} rx="18" ry="10" fill={c.root}/>
      <ellipse cx={cx+28} cy={h-50} rx="18" ry="10" fill={c.root}/>
      <ellipse cx={cx} cy={h-46} rx="14" ry="8" fill={c.root}/>
    </g>
  );

  return (
    <g>
      <ellipse cx={cx} cy={h-200} rx="42" ry="36" fill={c.dark}/>
      <ellipse cx={cx-36} cy={h-170} rx="34" ry="28" fill={c.dark}/>
      <ellipse cx={cx+36} cy={h-170} rx="34" ry="28" fill={c.dark}/>
      <ellipse cx={cx-16} cy={h-188} rx="30" ry="26" fill={c.dark}/>
      <ellipse cx={cx+16} cy={h-188} rx="30" ry="26" fill={c.dark}/>
      <ellipse cx={cx-40} cy={h-148} rx="26" ry="20" fill={c.mid}/>
      <ellipse cx={cx+40} cy={h-148} rx="26" ry="20" fill={c.mid}/>
      <ellipse cx={cx} cy={h-158} rx="46" ry="32" fill={c.mid}/>
      <ellipse cx={cx-20} cy={h-172} rx="30" ry="24" fill={c.mid}/>
      <ellipse cx={cx+20} cy={h-172} rx="30" ry="24" fill={c.mid}/>
      <ellipse cx={cx} cy={h-138} rx="40" ry="26" fill={c.light}/>
      <rect x={cx-10} y={h-108} width="20" height="60" rx="10" fill={c.trunk}/>
      <ellipse cx={cx-32} cy={h-58} rx="20" ry="11" fill={c.root}/>
      <ellipse cx={cx+32} cy={h-56} rx="20" ry="11" fill={c.root}/>
      <ellipse cx={cx} cy={h-52} rx="16" ry="9" fill={c.root}/>
      <ellipse cx={cx-16} cy={h-50} rx="12" ry="7" fill={c.root}/>
      <ellipse cx={cx+16} cy={h-50} rx="12" ry="7" fill={c.root}/>
    </g>
  );
}

export default Tree;