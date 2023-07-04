import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const board = Array.from({length: 21}, (_, i) => i !== 20 
  ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
  : Array(12).fill(255));

  board[0][5] = 1;
  board[1][5] = 1;
  board[0][6] = 1;
  board[1][6] = 1;

  board[5][5] = 5;
  board[6][5] = 5;
  board[7][5] = 5;
  board[8][5] = 5;

  board[11][4] = 2;
  board[12][4] = 2;
  board[12][5] = 2;
  board[13][5] = 2;

  board[14][5] = 3;
  board[15][5] = 3;
  board[15][4] = 3;
  board[16][4] = 3;

  board[17][8] = 4;
  board[18][7] = 4;
  board[18][8] = 4;
  board[18][9] = 4;


  console.log(board);
  const drawBoard = () => {
    if (cvRef.current) {
      const ctx = cvRef.current.getContext('2d');
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 12; j++) {
          if (board[i][j] === 255) {
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
          if (board[i][j] < 6 || [board[i][j] > 0]) {
            switch (board[i][j]) {
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

  useEffect(() => {
    drawBoard();
    drawFigure();
  })

  return (
    <div className='background'>
      <canvas ref={cvRef} className='board' width={360} height={630}></canvas>
    </div>
  );
}

export default App;
