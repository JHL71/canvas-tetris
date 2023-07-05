import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const board = Array.from({length: 25}, (_, i) => i !== 24 
  ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
  : Array(12).fill(255));

  board[15][5] = 1;
  board[15][6] = 1;
  board[16][5] = 1;
  board[16][6] = 1;


  console.log('s');
  const drawBoard = () => {
    if (cvRef.current) {
      const ctx: any = cvRef.current.getContext('2d');
      if (ctx) ctx.reset();
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 12; j++) {
          if (board[i+4][j] === 255) {
            ctx?.beginPath();
            ctx?.rect(j * 30 + 5, i * 30 + 5, 20, 20);
            if (ctx) ctx.fillStyle = 'black';
            ctx?.fill();
            ctx?.closePath();
          } else {
            ctx?.beginPath();
            ctx?.rect(j * 30, i * 30, 30, 30);
            if (ctx) ctx.strokeStyle = 'black';
            ctx?.stroke();
            ctx?.closePath();
          }
        }
      }
    }
  };

  const drawFigure = () => {
    if (cvRef.current) {
      const ctx = cvRef.current.getContext('2d');
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 12; j++) {
          if (board[i+4][j] < 6 || [board[i+4][j] > 0]) {
            switch (board[i+4][j]) {
              case 1:
                if (ctx) {
                  ctx.beginPath();
                  ctx.rect(j * 30, i * 30, 30, 30);
                  ctx.fillStyle = 'red';
                  ctx.strokeStyle = 'red';
                  ctx.stroke();
                  ctx.fill();
                  ctx.closePath();
                }
                break;
              case 2:
                if (ctx) {
                  ctx.beginPath();
                  ctx.rect(j * 30, i * 30, 30, 30);
                  ctx.fillStyle = 'orange';
                  ctx.strokeStyle = 'orange';
                  ctx.stroke();
                  ctx.fill();
                  ctx.closePath();
                }
                break;
              case 3:
                if (ctx) {
                  ctx.beginPath();
                  ctx.rect(j * 30, i * 30, 30, 30);
                  ctx.fillStyle = 'green';
                  ctx.strokeStyle = 'green';
                  ctx.stroke();
                  ctx.fill();
                  ctx.closePath();
                }
                break;
              case 4:
                if (ctx) {
                  ctx.beginPath();
                  ctx.rect(j * 30, i * 30, 30, 30);
                  ctx.fillStyle = 'indigo';
                  ctx.strokeStyle = 'indigo';
                  ctx.stroke();
                  ctx.fill();
                  ctx.closePath();
                }
                break;
              case 5:
                if (ctx) {
                  ctx.beginPath();
                  ctx.rect(j * 30, i * 30, 30, 30);
                  ctx.fillStyle = 'skyblue';
                  ctx.strokeStyle = 'skyblue';
                  ctx.stroke();
                  ctx.fill();
                  ctx.closePath();
                }
                break;
              default:
                break;
            }
          }
        }
      }
    }
  }

  const state = (pause: boolean) => {
    if (!pause) {
      for (let i = 23; i > -1; i--) {
        for (let j = 11; j > -1; j--) {
          if (board[i+1][j] === 255 && (board[i][j] > 0 && board[i][j] < 6)) {
            console.log('now');
            pause = true;
          } else if (board[i+1][j] !== 255) {
            let temp = board[i+1][j];
            board[i+1][j] = board[i][j];
            board[i][j] = temp;
          }
        }
      }
      console.log('x');
      // console.log(board);
      drawBoard();
      drawFigure();
      setTimeout(() => {
        state(pause);
      }, 1000);
    }
  }

  useEffect(() => {
    // drawBoard();
    // drawFigure();
    // state(false);
  })

  return (
    <div className='background'>
      <canvas ref={cvRef} className='board' width={360} height={630} onClick={() => state(false)}></canvas>
    </div>
  );
}

export default App;
