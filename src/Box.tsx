import React, { useLayoutEffect } from "react";
import { useRef, useState } from "react";

interface Props {
  frameRate: number;
}

const Box: React.FC<Props> = ({ frameRate = 60 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frame, setFrame] = useState(0);
  const animationDuration = 0.5; // specify animation duration in seconds

  useLayoutEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const animationInterval = setInterval(() => {
      setFrame((frame) => (frame + 1) % (frameRate * animationDuration));
    }, 1000 / frameRate);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const x = (frame / (frameRate * animationDuration)) * (canvas.width - 100);

      ctx.fillStyle = "red";
      ctx.fillRect(x, canvas.height / 2 - 50, 100, 100);

      requestAnimationFrame(draw);

      return () => cancelAnimationFrame(frame)
    };

    draw();

    return () => {
      clearInterval(animationInterval);
    };
  }, [frameRate, frame]);

  return (
    <canvas ref={canvasRef} />
  );
};

export default Box;


