import React, { useEffect, useRef, useState } from 'react';
import './App.css';

interface objI {
  x: number,
  y: number,
  type: number,
  rotate: number
}

function App() {
  const cvRef = useRef<HTMLCanvasElement|null>(null);
  const keyRef = useRef<HTMLDivElement|null>(null);
  const ctx: CanvasRenderingContext2D|null|undefined = cvRef.current?.getContext('2d');
  const [obj, setObj] = useState<objI>({
    x: 2,
    y: 10,
    type: 7,
    rotate: 0
  });
  const [board, setBoard] = useState<any[][]> (Array.from({length: 25}, (_, i) => i !== 24 
  ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
  : Array(12).fill(255)))

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, 360, 630);
    for (let i = 0; i < 21; i++) {
      for (let j = 0; j < 12; j++) {
        ctx.beginPath();
        if (board[i+4][j] === 255) {
          ctx.rect(j * 30 + 5, i * 30 + 5, 20, 20);
          ctx.fillStyle = 'black';
          ctx.fill();
        } else if (board[i+4][j] === 1) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'red';
          ctx.fill();
        } else if (board[i+4][j] === 2) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'orange';
          ctx.fill();
        } else if (board[i+4][j] === 3) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'yellow';
          ctx.fill();
        } else if (board[i+4][j] === 4) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'green';
          ctx.fill();
        } else if (board[i+4][j] === 5) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'blue';
          ctx.fill();
        } else if (board[i+4][j] === 6) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'indigo';
          ctx.fill();
        } else if (board[i+4][j] === 7) {
          ctx.rect(j * 30, i * 30, 30, 30);
          ctx.fillStyle = 'purple';
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

  const drawFigure = (ctx:CanvasRenderingContext2D, x: number, y: number, type: number, rotate: number) => {
    x *= 30;
    y *= 30;
    ctx.beginPath();
    ctx.translate(x + 15, y + 15);
    ctx.rotate((Math.PI * 90 * rotate) / 180);
    switch (type) {
      case 1:
        ctx.resetTransform();
        ctx.translate(x, y);
        ctx.rotate((Math.PI * 90 * rotate) / 180);
        ctx.rect(-30, -30, 60, 60);
        ctx.fillStyle = 'red';
        break;
      case 2:
        ctx.fillStyle = 'orange';
        ctx.rect(-15, -45, 30, 60);
        ctx.rect(15, -15, 30, 60);
        break;
      case 3:
        ctx.fillStyle = 'yellow';
        ctx.rect(-45, -15, 30, 60);
        ctx.rect(-15, -45, 30, 60);
        break;
      case 4:
        ctx.fillStyle = 'green';
        ctx.rect(-15, -45, 60, 30);
        ctx.rect(-15, -15, 30, 60);
        break;
      case 5:
        ctx.fillStyle = 'blue';
        ctx.rect(- 45,- 45, 60, 30);
        ctx.rect(-15, -15, 30, 60);
        break;
      case 6:
        ctx.fillStyle = 'indigo';
        ctx.rect(-45, -15, 90, 30);
        ctx.rect(-15, -45, 30, 30);
        break;
      case 7:
        ctx.fillStyle = 'purple';
        ctx.resetTransform()
        ctx.translate(x, y);
        ctx.rotate((Math.PI * 270 * rotate) / 180);
        ctx.rect(-60, 0, 120, 30);
        break;
      default:
        break;
    }
    ctx.fill();
    ctx.resetTransform();
    ctx.closePath();
  }

  const control = (key: string) => {
    let check = true;
    switch (key) {
      case 'w': case 'ArrowUp':
        switch (obj.type) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;    
          case 5:
            break;
          case 6:
            break;
          case 7:
            break;
        }
        if (check) {
          setObj({...obj, rotate: (obj.rotate + 1) % 4});
        }
        break;
      case 'a': case 'ArrowLeft':
        setObj({...obj, x: obj.x - 1});
        // setBoard(board.map((el, i) => i !== 5 + 4 ? el : el.map((x, j) => j !== 5 ? x : 3)));
        // 
        break;
      case 's': case 'ArrowDown':
        switch (obj.type) {
          case 1:
            break;
          case 2:
            break;
          case 3:
            break;
          case 4:
            break;    
          case 5:
            break;
          case 6:
            break;
          case 7:
            if (obj.rotate === 0 || obj.rotate === 2) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.x + i][obj.y - 8] !== 0) check = false;
              } 
            }
            if (obj.rotate === 1 || obj.rotate === 3) {
              if (board[obj.x][obj.y - 7] !== 0) check = false;
            }
            if (check) {
              setObj({...obj, y: obj.y + 1});
            }
            break;
        }
        break;
      case 'd':
      case 'ArrowRight':
        setObj({...obj, x: obj.x + 1});
        break;
      default:
        break;
    }
  }

  const play = () => {

  }

  useEffect(() => {
    keyRef.current?.focus();
    if (ctx) {
      drawBoard(ctx)
      drawFigure(ctx, obj.x, obj.y, obj.type, obj.rotate);
    }
  })

  return (
    <div className='background' onClick={() => keyRef.current?.focus()}>
      <canvas ref={cvRef} className='board' width={360} height={630} onClick={() => {
        console.log(obj);
        console.log(board);
        }}></canvas>
      <div ref={keyRef} className='control' onKeyDown={(e) => {
        console.log(e.key);
        control(e.key);
        }} tabIndex={0}></div>
    </div>
  );
}

export default App;
