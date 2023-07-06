import React, { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const cvRef = useRef<HTMLCanvasElement|null>(null);
  const ctx: CanvasRenderingContext2D|null|undefined = cvRef.current?.getContext('2d');
  const [show, setShow] = useState<boolean>(false);
  const board: any[][] = Array.from({length: 25}, (_, i) => i !== 24 
  ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
  : Array(12).fill(255));

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 360, 630);
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 12; j++) {
        ctx.beginPath();
        if (board[i+4][j] === 255) {
          ctx.rect(j * 30 + 5, i * 30 + 5, 20, 20);
          ctx.fillStyle = 'black';
          ctx.fill();
        } else {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.strokeStyle = 'black';
          ctx.stroke();
        }
        ctx.closePath();
      }
    }
  };

  const drawFigure = (ctx:CanvasRenderingContext2D, x: number, y: number, type: number) => {
    ctx.beginPath();
    switch (type) {
      case 1:
        ctx.rect(x - 30, y - 30, 60, 60);
        ctx.fillStyle = 'red';
        ctx.fill();
        break;
      case 2:
        ctx.rect(x, y - 30, 30, 60);
        ctx.rect(x + 30, y, 30, 60);
        ctx.fillStyle = 'orange';
        ctx.fill();
        break;
      case 3:
        ctx.rect(x - 30, y, 30, 60);
        ctx.rect(x, y - 30, 30, 60);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        break;
      case 4:
        ctx.rect(x, y - 30, 60, 30);
        ctx.rect(x, y, 30, 60);
        ctx.fillStyle = 'green';
        ctx.fill();
        break;
      case 5:
        ctx.rect(x - 30, y - 30, 60, 30);
        ctx.rect(x, y, 30, 60);
        ctx.fillStyle = 'blue';
        ctx.fill();
        break;
      case 6:
        ctx.rect(x - 30, y, 90, 30);
        ctx.rect(x, y -30, 30, 30);
        ctx.fillStyle = 'indigo';
        ctx.fill();
        break;
      case 7:
        ctx.rect(x - 30, y, 30, 120);
        ctx.fillStyle = 'purple';
        ctx.fill();
        break;
      default:
        break;
    }
    ctx.closePath();
  }

  useEffect(() => {
    if (ctx) {
      drawBoard(ctx)
      drawFigure(ctx, 180, 300, 7);
    }
  })

  return (
    <div className='background'>
      <canvas ref={cvRef} className='board' width={360} height={630} onClick={() => setShow(true)}></canvas>
    </div>
  );
}

export default App;
