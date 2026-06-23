import React from 'react';

function Forest({ memoryCount }) {
  const trees = Array.from({ length: memoryCount }, (_, i) => i);

  const G = '#2d5a27';
  const g = '#4a8c3f';
  const L = '#6abf5e';
  const B = '#8B6914';
  const b = '#a07830';
  const _ = null;

  const smallTree = [
    [_,L,g,L,_],
    [L,g,G,g,L],
    [_,L,g,L,_],
    [_,_,b,_,_],
    [_,_,b,_,_],
  ];

  const medTree = [
    [_,_,L,_,_],
    [_,L,g,L,_],
    [L,g,G,g,L],
    [_,L,g,L,_],
    [_,_,B,_,_],
    [_,_,B,_,_],
  ];

  const treeTypes = [smallTree, medTree];

  const cellSize = 14;

  return (
    <div className="forest-tab">
      <div className="forest-stats">
        <span className="forest-count">{memoryCount}</span>
        <span className="forest-label">개의 추억 = {memoryCount}그루의 나무</span>
      </div>

      {memoryCount === 0 ? (
        <p className="empty">아직 추억이 없어서 숲이 비어있어 🌱</p>
      ) : (
        <div className="forest-grid">
          {trees.map((i) => {
            const treeGrid = treeTypes[i % 2];
            return (
              <div key={i} style={{display: 'inline-block', margin: '4px'}}>
                {treeGrid.map((row, ri) => (
                  <div key={ri} style={{display: 'flex'}}>
                    {row.map((cell, ci) => (
                      <div
                        key={ci}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          background: cell || 'transparent',
                          imageRendering: 'pixelated',
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Forest;