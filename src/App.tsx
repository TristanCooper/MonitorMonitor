import React, { useState, useEffect, FC } from 'react';
import Box from './Box';

const App: FC = () => {
  const [color, setColor] = useState('white');
  const [hdrSupport, setHdrSupport] = useState(false);
  const [wideGamutSupport, setWideGamutSupport] = useState(false);
  const [frameInterval, setFrameInterval] = useState(16);

  const intervalsInFPS = [ 165, 144, 120, 60, 30, 24, 20 ]

  useEffect(() => {
    // Check if the user's display supports HDR
    if (window.matchMedia('(display-mode: HDR)').matches) {
      setHdrSupport(true);
    }
    // Check if the user's display supports wide color gamut
    if (window.matchMedia('(color-gamut: p3)').matches) {
      setWideGamutSupport(true);
    }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: color,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {Array.from({ length: 1 }, (_, i) => (
        <Box key={i} frameRate={frameInterval} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <select
          onChange={e => {
            setFrameInterval(parseInt(e.target.value));
          }}
        >
          { intervalsInFPS.map((fps, i) => (
            <option key={i} value={fps}>{fps}</option>
          )) }
        </select>
        <button
          onClick={() => {
            setColor(c => {
              switch (c) {
                case 'white':
                  return 'red';
                case 'red':
                  return 'green';
                case 'green':
                  return 'blue';
                case 'blue':
                  return 'white';
                default:
                  return 'white';
              }
            });
          }}
        >
          Toggle Color
        </button>
        <div style={{ marginLeft: 16 }}>
          {hdrSupport ? 'HDR Supported' : 'HDR Not Supported'}
        </div>
        <div style={{ marginLeft: 16 }}>
          {wideGamutSupport ? 'Wide Gamut Supported' : 'Wide Gamut Not Supported'}
        </div>
      </div>
    </div>
  );
};

export default App;
