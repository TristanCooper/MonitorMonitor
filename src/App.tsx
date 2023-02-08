import React, { useState, useRef, useEffect, FC } from 'react';

interface BoxProps {
  index: number;
}

const Box: React.FC<BoxProps> = ({ index }) => {
  const [x, setX] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setX(x => x + 1);
    }, 16);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'red',
        left: x + index * 50,
      }}
    />
  );
};

const App: FC = () => {
  const [color, setColor] = useState('white');
  const [hdrSupport, setHdrSupport] = useState(false);
  const [wideGamutSupport, setWideGamutSupport] = useState(false);

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
        <Box key={i} index={i} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
