import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import GameOver from './gameover';
import Pause from './pause';

interface objI {
  x: number,
  y: number,
  type: number,
  rotate: number
}

function App() {
  const cvRef = useRef<HTMLCanvasElement|null>(null);
  const keyRef = useRef<HTMLDivElement|null>(null);
  const [score, setScore] = useState<number>(0)
  const [start, setStart] = useState<boolean>(false);
  const [over, setOver] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [obj, setObj] = useState<objI>({
    x: 5,
    y: 0,
    type: Math.ceil(Math.random() * 7),
    rotate: 0
  });
  const tRef:any = useRef(0);
  const objRef = useRef(obj);
  const [board, setBoard] = useState<any[][]> (Array.from({length: 28}, (_, i) => i !== 24 
  ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
  : Array(12).fill(255)));
  const boardRef = useRef(board);
  const falling = useRef(1000);
  const [ft, setFt] = useState<number>(1000);
  const list = [1, 2, 3, 4, 5, 6, 7];
  

  const playGame = () => {
    if (falling.current > 200) {
      falling.current -= 5;
    }
    if (falling.current % 100 === 0) {
      setFt(falling.current);
    }
    let {x, y, type, rotate} = {...objRef.current}
    let check = true;
    switch (type) {
      case 1:
        for (let i = 0; i < 2; i += 1) {
          if (boardRef.current[y + 5][x - 1 + i] !== 0) check = false;
        }
        break;
      case 2:
        if (rotate === 0) {
          if (boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 6][x + 1] !== 0) check = false;
        }
        if (rotate === 1) {
          if (boardRef.current[y + 6][x - 1] !== 0 || boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 2) {
          if (boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 5][x - 1] !== 0) check = false;
        }
        if (rotate === 3) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 4][x + 1] !== 0) check = false;
        }
        break;
      case 3:
        if (rotate === 0) {
          if (boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 6][x - 1] !== 0) check = false;
        }
        if (rotate === 1) {
          if (boardRef.current[y + 4][x - 1] !== 0 || boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 2) {
          if (boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 3) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 6][x + 1] !== 0) check = false;
        }
        break;
      case 4:
        if (rotate === 0) {
          if (boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 4][x + 1] !== 0) check = false;
        }
        if (rotate === 1) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 6][x + 1] !== 0) check = false;
        }
        if (rotate === 2) {
          if (boardRef.current[y + 6][x - 1] !== 0 || boardRef.current[y + 6][x] !== 0) check = false;
        }
        if (rotate === 3) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        break;
      case 5:
        if (rotate === 0) {
          if (boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 3][x - 1] !== 0) check = false;
        }
        if (rotate === 1) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 2) {
          if (boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 6][x + 1] !== 0) check = false;
        }
        if (rotate === 3) {
          if (boardRef.current[y + 6][x - 1] !== 0 || boardRef.current[y + 5][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        break;
      case 6:
        if (rotate === 0) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 5][x] || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 1) {
          if (boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 2) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 6][x] !== 0 || boardRef.current[y + 5][x + 1] !== 0) check = false;
        }
        if (rotate === 3) {
          if (boardRef.current[y + 5][x - 1] !== 0 || boardRef.current[y + 6][x] !== 0) check = false;
        }
        break;
      case 7:
        if (rotate === 0) {
          if (boardRef.current[y + 6][x] !== 0) check = false;
        }
        if (rotate === 1) {
          for (let i = 0; i < 4; i++) {
            if (boardRef.current[y + 5][x + i - 2] !== 0) check = false;
          }  
        }
        if (rotate === 2) {
          if (boardRef.current[y + 6][x - 1] !== 0) check = false;
        }
        if (rotate === 3) {
          for (let i = 0; i < 4; i++) {
            if (boardRef.current[y + 4][x + i - 2] !== 0) check = false;
          }  
        }
        break;
      default:
        break;
      }
    if (check) {
      y++;
      objRef.current.y = y;
      setObj({...objRef.current});
    } else {
      switch (type) {
        case 1:
          boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1) ? el : type));
          break;
        case 2:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3 && idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x + 1 ? el : type));
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1) ? el : type));
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3 && idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => idx !== x - 1 ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
          }
          break;
        case 3:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x - 1 ? el : type));
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== x - 1 && idx !== x) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3 && idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => idx !== x + 1 ? el : type));
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x - 1 && idx !== x) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
          }
          break;
        case 4:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x - 1 && idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x + 1 ? el : type));
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x - 1 && idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => idx !== x - 1 ? el : type));
          }
          break;
        case 5:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x - 1 && idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => idx !== x + 1 ? el : type));
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4 && idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x - 1 && idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x - 1 ? el : type));
          }
          break;
        case 6:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== x) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1 && idx !== x + 1)? el : type));
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x + 1 && idx !== x - 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 4) ? el : boardRef.current[idx].map((el, idx) => (idx !== x && idx !== x - 1) ? el : type));
            boardRef.current = boardRef.current.map((el, idx) => (idx !== y + 3 && idx !== y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          break;
        case 7:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => (idx < y + 2 || idx > y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => idx !== y + 4 ? el : boardRef.current[idx].map((el, idx) => (idx < x - 2 || idx > x + 1) ? el : type));
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => (idx < y + 2 || idx > y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x - 1 ? el : type));
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => idx !== y + 3 ? el : boardRef.current[idx].map((el, idx) => (idx < x - 2 || idx > x + 1) ? el : type));
          }
      }
      
      let nxtType = [...list.slice(0, list.indexOf(type)), ...list.slice(list.indexOf(type) + 1)][Math.ceil(Math.random() * 100) % 6];
      
      setBoard([...boardRef.current]);
      setObj({x: 5, y: 0, type: nxtType, rotate: 0});
      objRef.current = {x: 5, y: 0, type: nxtType, rotate: 0};
    }
  }

  const collapse = () => {
    const full: any[] = [];
    for (let y = 24; y >= 4; y--) {
      if (board[y].every((el) => el !== 0) && y !== 24) full.push(y);
    }
    let temp = score;
    setScore(temp + 100 * full.length);
    if (full.length) {
      let newBoard = [...board].map((el) => [...el]);
      while (full.length > 0) {
        let line = full.pop();
        newBoard[line] = Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0);
        for (let y = line; y > 0; y--) {
          for (let x = 1; x < 11; x++) {
            [newBoard[y][x], newBoard[y-1][x]] = [newBoard[y-1][x], newBoard[y][x]]; 
          }
        }
      }
      boardRef.current = [...newBoard];
      setBoard([...newBoard]);
    }
  }

  const drawBoard = useCallback(() => {
    const ctx = cvRef.current?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 360, 630);
      for (let i = 0; i < 21; i++) {
        for (let j = 0; j < 12; j++) {
          if (i === 5 && (j !== 0 && j !== 11)) {
            if (board[i][j] !== 0) {
              setStart(false);
              setOver(true);
              let nt = Math.ceil(Math.random() * 7);
              falling.current = 1000;
              objRef.current = {x: 5, y: 0, type: nt, rotate: 0};
              clearInterval(tRef.current);
            }
          }
          ctx.beginPath();
          if (boardRef.current[i+4][j] === 255) {
            ctx.rect(j * 30 + 5, i * 30 + 5, 20, 20);
            ctx.fillStyle = 'black';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 1) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'tomato';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 2) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'darkorange';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 3) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'gold';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 4) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'chartreuse';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 5) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'dodgerblue';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 6) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'navy';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 7) {
            ctx.rect(j * 30 + 1, i * 30 + 1, 28, 28);
            ctx.fillStyle = 'violet';
            ctx.fill();
          } else {
            ctx.rect(j * 30, i * 30, 30, 30);
          }
          ctx.strokeStyle = 'black';
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boardRef.current]);

  const drawFigure = (x: number, y: number, type: number, rotate: number) => {
    const ctx = cvRef.current?.getContext('2d');
    x *= 30;
    y *= 30;
    if (ctx) {
      ctx.beginPath();
      ctx.translate(x + 15, y + 15);
      ctx.rotate((Math.PI * 90 * rotate) / 180);
      switch (type) {
        case 1:
          ctx.resetTransform();
          ctx.translate(x, y);
          ctx.rotate((Math.PI * 90 * rotate) / 180);
          ctx.rect(-29, -29, 28, 28);
          ctx.rect(-29, 1, 28, 28);
          ctx.rect(1, -29, 28, 28);
          ctx.rect(1, 1, 28, 28);
          ctx.fillStyle = 'tomato';
          break;
        case 2:
          ctx.fillStyle = 'darkorange';
          ctx.rect(-14, -44, 28, 28);
          ctx.rect(-14, -14, 28, 28);
          ctx.rect(16, -14, 28, 28);
          ctx.rect(16, 16, 28, 28);
          break;
        case 3:
          ctx.fillStyle = 'gold';
          ctx.rect(-44, -14, 28, 28);
          ctx.rect(-44, 16, 28, 28);
          ctx.rect(-14, -44, 28, 28);
          ctx.rect(-14, -14, 28, 28);
          break;
        case 4:
          ctx.fillStyle = 'chartreuse';
          ctx.rect(-14, -44, 28, 28);
          ctx.rect(16, -44, 28, 28);
          ctx.rect(-14, -14, 28, 28);
          ctx.rect(-14, 16, 28, 28);
          break;
        case 5:
          ctx.fillStyle = 'dodgerblue';
          ctx.rect(-44, -44, 28, 28);
          ctx.rect(-14, -44, 28, 28);
          ctx.rect(-14, -14, 28, 28);
          ctx.rect(-14, 16, 28, 28);
          break;
        case 6:
          ctx.fillStyle = 'navy';
          ctx.rect(-44, -14, 28, 28);
          ctx.rect(-14, -14, 28, 28);
          ctx.rect(16, -14, 28, 28);
          ctx.rect(-14, -44, 28, 28);
          break;
        case 7:
          ctx.fillStyle = 'violet';
          ctx.resetTransform()
          ctx.translate(x, y);
          ctx.rotate((Math.PI * 90 * rotate) / 180);
          ctx.rect(1, -59, 28, 28);
          ctx.rect(1, -29, 28, 28);
          ctx.rect(1, 1, 28, 28);
          ctx.rect(1, 31, 28, 28);
          break;
        default:
          break;
      }
      ctx.fill();
      ctx.resetTransform();
      ctx.closePath();
    }
  }

  const control = (key: string) => {
    let check = true;
    let temp: objI = {...obj};
    let dx = 0;
    let dy = 0;
    switch (key) {
      case 'Meta':
      case 'Escape':
        setPause(true);
        setStart(false);
        break;
      case ' ':
        let ts = score;
        switch (obj.type) {
          case 1:
            while (board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0) {
              dy += 1;
            }
            boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + dy + 4 && idx !== obj.y + dy + 3) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1) ? el : obj.type));
            break;
          case 2:
            if (obj.rotate === 0) {
              while (board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 6 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy && idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x + 1 ? el : obj.type));
            }
            if (obj.rotate === 1) {
              while (board[obj.y + 6 + dy][obj.x - 1] === 0 && board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1) ? el : obj.type));
            }
            if (obj.rotate === 2) {
              while (board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x - 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy && idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x - 1 ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 3) {
              while (board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 4 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
            }
            break;
          case 3:
            if (obj.rotate === 0) {
              while (board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 6 + dy][obj.x - 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x - 1 ? el : obj.type));
            }
            if (obj.rotate === 1) {
              while (board[obj.y + 4 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x - 1 && idx !== obj.x) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
            }
            if (obj.rotate === 2) {
              while (board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy && idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x + 1 ? el : obj.type));
            }
            if (obj.rotate === 3) {
              while (board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 6 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x - 1 && idx !== obj.x) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
            }
            break;
          case 4:
            if (obj.rotate === 0) {
              while(board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 4 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 1) {
              while(board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 6 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x - 1 && idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x + 1 ? el : obj.type));
            }
            if (obj.rotate === 2) {
              while(board[obj.y + 6 + dy][obj.x - 1] === 0 && board[obj.y + 6 + dy][obj.x] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 3) {
              while(board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x - 1 && idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x - 1 ? el : obj.type));            
            }
            break;
          case 5:
            if (obj.rotate === 0) {
              while (board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 4 + dy][obj.x - 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 1) {
              while (board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x - 1 && idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x + 1 ? el : obj.type));
            }
            if (obj.rotate === 2) {
              while (board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 6 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy && idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 3) {
              while (board[obj.y + 6 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x - 1 && idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x - 1 ? el : obj.type));
            }
            break;
          case 6:
            if (obj.rotate === 0) {
              while(board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1 && idx !== obj.x + 1)? el : obj.type));
            }
            if (obj.rotate === 1) {
              while(board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 2) {
              while(board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 6 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x + 1 && idx !== obj.x - 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 3) {
              while(board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 6 + dy][obj.x] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 4 + dy) ? el : boardRef.current[idx].map((el, idx) => (idx !== obj.x && idx !== obj.x - 1) ? el : obj.type));
              boardRef.current = boardRef.current.map((el, idx) => (idx !== obj.y + 3 + dy && idx !== obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            break;
          case 7:
            if (obj.rotate === 0) {
              while (board[obj.y + 6 + dy][obj.x] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx < obj.y + 2 + dy || idx > obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x ? el : obj.type));
            }
            if (obj.rotate === 1) {
              while (board[obj.y + 5 + dy][obj.x - 2] === 0 && board[obj.y + 5 + dy][obj.x - 1] === 0 && board[obj.y + 5 + dy][obj.x] === 0 && board[obj.y + 5 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => idx !== obj.y + 4 + dy ? el : boardRef.current[idx].map((el, idx) => (idx < obj.x - 2 || idx > obj.x + 1) ? el : obj.type));
            }
            if (obj.rotate === 2) {
              while (board[obj.y + 6 + dy][obj.x - 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => (idx < obj.y + 2 + dy || idx > obj.y + 5 + dy) ? el : boardRef.current[idx].map((el, idx) => idx !== obj.x - 1 ? el : obj.type));
            }
            if (obj.rotate === 3) {
              while (board[obj.y + 4 + dy][obj.x - 2] === 0 && board[obj.y + 4 + dy][obj.x - 1] === 0 && board[obj.y + 4 + dy][obj.x] === 0 && board[obj.y +4 + dy][obj.x + 1] === 0) {
                dy += 1;
              }
              boardRef.current = boardRef.current.map((el, idx) => idx !== obj.y + 3 + dy ? el : boardRef.current[idx].map((el, idx) => (idx < obj.x - 2 || idx > obj.x + 1) ? el : obj.type));
            }
            break;
        }
        setScore(ts + dy * 2);
        setBoard([...boardRef.current]);
        let nxtType = [...list.slice(0, list.indexOf(obj.type)), ...list.slice(list.indexOf(obj.type) + 1)][Math.ceil(Math.random() * 100) % 6];
        temp = {x: 5, y: 0, type: nxtType, rotate: 0};
        break;
      case 'w': case 'ArrowUp':
        switch (obj.type) {
          case 1:
            break;
          case 2:
            if (obj.rotate === 3) {
              if (board[obj.y + 5][obj.x + 1] !== 0) {
                if (board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 2][obj.x] === 0) {
                  dy = -1;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 5][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 3][obj.x - 1] === 0) {
                  dx = -1;
                  check = true;
                } else if (board[obj.y + 2][obj.x - 1] === 0 && board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0){
                  dy = -1;
                  dx = -1;
                  check = true;
                }
                else check = false; 
              }
            }
            if (obj.rotate === 0) {
              if (board[obj.y + 5][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 5][obj.x + 1] === 0) {
                  dx = 1;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 2] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 4][obj.x + 3] === 0) {
                  dx = 2;
                  check = true;
                } else if (board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0){
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0) {
                  dy = 1;
                  check = true;
                } else if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0) {
                  dx = 1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 5][obj.x - 1] === 0 && board[obj.y + 6][obj.x - 1] === 0 && board[obj.y + 6][obj.x] === 0 && board[obj.y + 7][obj.x] === 0) {
                  dy = 2
                  check = true;
                } else if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0) {
                  dx = 1;
                  check = true;
                } else if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 6][obj.x + 1] === 0) {
                  dx = 1;
                  dy = 1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 2] === 0) {
                  dx = -1;
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 5][obj.x - 1] === 0) {
                  dy = 1;
                  check = true;
                } else if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 5][obj.x - 1] === 0 && board[obj.y + 5][obj.x - 2] === 0) {
                  dy = 1;
                  dx = -1;
                  check = true;
                } else if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 3][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 3] === 0) {
                  dx = -2;
                  check = true;
                }
                else check = false;
              }
            }
            break;
          case 3:
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0) {
                  dx = 1;
                } else if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 5][obj.x - 1] === 0 && board[obj.y + 6][obj.x - 1] === 0) {
                  dy = 1;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0) {
                  dx = 1;
                  check = true;
                } else if (board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0) {
                  dx = 1;
                } else if (board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 5][obj.x + 1] === 0) {
                  dy = 1;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x - 2] === 0 && board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dx = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 5][obj.x - 1] === 0) {
                  dx = -1;
                } else if (board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0) {
                  dy = 1;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 2][obj.x + 1] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 2] === 0) {
                  dx = 1;
                } else if (board[obj.y + 5][obj.x - 1] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0 && board[obj.y + 6][obj.x + 1] === 0) {
                  dy = 1
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x + 1] !== 0) {
                if (board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 5][obj.x - 1] === 0 && board[obj.y + 5][obj.x] === 0) {
                  dx = -1;
                  check = true;
                } else if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            break;
          case 4: //hear
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 5][obj.x - 1] === 0) {
                  dx = -1;
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 3][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 5][obj.x - 2] === 0) {
                  dx = -2;
                  check = true;
                }
                check = false;
              }
              if (board[obj.y + 5][obj.x]) {
                if (board[obj.y + 2][obj.x] === 0 && board[obj.y + 2][obj.x + 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dy = -1
                  check = true;
                }
                else check = false;
              } 
            }
            if (obj.rotate === 0) {
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 5][obj.x + 2] === 0) {
                  dx = 1;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x + 1] !== 0){
                if (board[obj.y + 2][obj.x - 1] === 0 && board[obj.y + 2][obj.x] === 0 && board[obj.y + 2][obj.x + 1] === 0 && board[obj.y + 3][obj.x + 1] === 0) {
                  dy = -2;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 5][obj.x] === 0) {
                  dx = 1;
                } else if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0 && board[obj.y + 6][obj.x - 1] === 0) {
                  dy = 1;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x - 1] === 0) {
                  dy = -1
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 5][obj.x] === 0) {
                  dx = 1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dx = -1;
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0) {
                  dx = 1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0) {
                  dx = 1;
                  check = true;
                }
                else check = false;
              }
            }
            break;    
          case 5:
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0) {
                  dx = 1;
                } else if (board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0) {
                  dy = 1
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 3][obj.x + 2] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 5][obj.x + 2] === 0) {
                  dx = 2;
                  check = true;
                } else if (board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0) {
                  dy = 1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 2][obj.x - 1] === 0 && board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 2] === 0) {
                  dx = -1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 2] === 0) {
                  dx = -1;
                  check = true;
                } else if (board[obj.y + 2][obj.x + 1] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x - 1] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 3][obj.x + 2] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dx = 1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0 && board[obj.y + 6][obj.x + 1] === 0) {
                  dy = 1;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x + 1] !== 0) {
                if (board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0) {
                  dy = -1;
                  check = true;
                } else if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x  - 1] === 0 && board[obj.y + 5][obj.x - 1] === 0 && board[obj.y + 5][obj.x] === 0) {
                  dx = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0) {
                  dx = 1;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0) {
                  dy = -1;
                  check = true;
                } else if (board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 5][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dx = -1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 5][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0) {
                  dx = 1;
                  check = true;
                } else if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0) {
                  dy = -1;
                  check = true;
                }
                else check = false;
              }
            }
            break;
          case 6:
            if (obj.rotate === 3) {
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 3][obj.x - 1] === 0) {
                  dx = -1;
                }
                else check = false;
              }
            }
            if (obj.rotate === 0) {
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0) {
                  dy = -1;
                }
                else check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 5][obj.x + 1] === 0) {
                  dx = 1;
                }
                else check = false;
              }
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 5][obj.x] === 0 && board[obj.y + 6][obj.x] === 0 && board[obj.y + 5][obj.x - 1] === 0) {
                  dy = 1;
                } else if (board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 5][obj.x + 1] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dx = 1;
                }
                else check = false;
              }
            }
            break;
          case 7:
            if (obj.rotate === 3) {
              if (board[obj.y + 5][obj.x] !== 0) {
                if (board[obj.y + 1][obj.x] === 0 && board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 4][obj.x] === 0) dy = -1;
                else check = false;
              } 
              if (board[obj.y + 4][obj.x] !== 0) {
                if (board[obj.y][obj.x] === 0 && board[obj.y + 1][obj.x] === 0 && board[obj.y + 2][obj.x] === 0 && board[obj.y + 3][obj.x] === 0) {
                  dy = -2;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 2][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 0) {
              if (board[obj.y + 4][obj.x - 2] !== 0) {
                if (board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0) dx = 1;
                else check = false;
              }
              if (board[obj.y + 4][obj.x - 1] !== 0) {
                if (board[obj.y + 4][obj.x] === 0 && board[obj.y + 4][obj.x + 1] === 0 && board[obj.y + 4][obj.x + 2] === 0 && board[obj.y + 4][obj.x + 3] === 0) {
                  dx = 2;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 4][obj.x + 1] !== 0) {
                if (board[obj.y + 4][obj.x - 3] === 0 && board[obj.y + 4][obj.x - 2] === 0 && board[obj.y + 4][obj.x - 1] === 0 && board[obj.y + 4][obj.x] === 0) {
                  dx = -1;
                  check = true;
                }
                else check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 5][obj.x - 1] !== 0) {
                if (board[obj.y + 1][obj.x - 1] === 0 && board[obj.y + 2][obj.x - 1] === 0 && board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 4][obj.x - 1] === 0) {
                  dy = -1;
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x - 1] !== 0) check = false;
              if (board[obj.y + 2][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x - 2] !== 0) {
                if (board[obj.y + 3][obj.x - 1] === 0 && board[obj.y + 3][obj.x] === 0 && board[obj.y + 3][obj.x + 1] === 0 && board[obj.y + 3][obj.x + 2] === 0) {
                  dx = 1;
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x + 1] !== 0) {
                if (board[obj.y + 3][obj.x - 4] === 0 && board[obj.y + 3][obj.x - 3] === 0 && board[obj.y + 3][obj.x - 2] === 0 && board[obj.y + 3][obj.x - 1] === 0) {
                  dx = -1;
                  check = true;
                }
                else check = false;
              }
              if (board[obj.y + 3][obj.x] !== 0) {
                if (board[obj.y + 3][obj.x - 4] === 0 && board[obj.y + 3][obj.x - 3] === 0 && board[obj.y + 3][obj.x - 2] === 0 && board[obj.y + 3][obj.x - 1] === 0) {
                  dx = -2;
                  check = true;
                }
                else check = false;
              }
            }
            break;
        }
        if (check) {
          temp = {...obj, x: obj.x + dx, y: obj.y + dy, rotate: (obj.rotate + 1) % 4};
        }
        break;
      case 'a': case 'ArrowLeft':
        switch (obj.type) {
          case 1:
            for (let i = 0; i < 2; i += 1) {
              if (board[obj.y + 3 + i][obj.x - 2] !== 0) check = false;
            }
            break;
          case 2:
            if (obj.rotate === 0) {
              if (board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 3][obj.x - 1] !== 0) check = false;
              if (board[obj.y + 5][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x - 2] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 3][obj.x - 2] !== 0) check = false;
              if (board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 2] !== 0) check = false;
            }
            break;
          case 3:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 5][obj.x - 2] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x - 2] !== 0 || board[obj.y + 4][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x] !== 0 || board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            break;
          case 4:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 5][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x - 2] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x - 2] !== 0 || board[obj.y + 4][obj.x - 2] !== 0) check = false;
            }
            break;    
          case 5:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x - 2] !== 0 || board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 3][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 5][obj.x - 2] !== 0) check = false;
            }
            break;
          case 6:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 2]) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x  - 1] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x - 1] !== 0 || board[obj.y + 4][obj.x - 2] !== 0 || board[obj.y + 5][obj.x - 1]) check = false;
            }
            break;
          case 7:
            if (obj.rotate === 0) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 2 + i][obj.x - 1] !== 0) check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x - 3] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 2 + i][obj.x - 2] !== 0) check = false;
              }
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x - 3] !== 0) check = false;
            }
            break;
        }
        if (check) {
          temp = {...obj, x: obj.x - 1};
        }
        break;
      case 's': case 'ArrowDown':
        switch (obj.type) {
          case 1:
            for (let i = 0; i < 2; i += 1) {
              if (board[obj.y + 5][obj.x - i] !== 0) check = false;
            }
            break;
          case 2:
            if (obj.rotate === 0) {
              if (board[obj.y + 5][obj.x] !== 0 || board[obj.y + 6][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 6][obj.x - 1] !== 0 || board[obj.y + 6][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 6][obj.x] !== 0 || board[obj.y + 5][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 4][obj.x + 1] !== 0) check = false;
            }
            break;
          case 3:
            if (obj.rotate === 0) {
              if (board[obj.y + 5][obj.x] !== 0 || board[obj.y + 6][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 6][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 6][obj.x] !== 0 || board[obj.y + 6][obj.x + 1] !== 0) check = false;
            }
            break;
          case 4:
            if (obj.rotate === 0) {
              if (board[obj.y + 6][obj.x] !== 0 || board[obj.y + 4][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 6][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 6][obj.x - 1] !== 0 || board[obj.y + 6][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            break;    
          case 5:
            if (obj.rotate === 0) {
              if (board[obj.y + 6][obj.x] !== 0 || board[obj.y + 4][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 6][obj.x] !== 0 || board[obj.y + 6][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 6][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            break;
          case 6:
            if (obj.rotate === 0) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 5][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 6][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 6][obj.x] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 5][obj.x - 1] !== 0 || board[obj.y + 6][obj.x] !== 0) check = false;
            }
            break;
          case 7:
            if (obj.rotate === 0) {
              if (board[obj.y + 6][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 5][obj.x + i - 2] !== 0) check = false;
              }  
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 6][obj.x - 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 4][obj.x + i - 2] !== 0) check = false;
              }  
            }
            break;  
        }
        if (check) {
          let x = score;
          setScore(x += 1);
          temp = {...obj, y: obj.y + 1};
        }
        break;
      case 'd':
      case 'ArrowRight':
        switch (obj.type) {
          case 1:
            for (let i = 0; i < 2; i += 1) {
              if (board[obj.y + 3 + i][obj.x + 1] !== 0) check = false;
            }
            break;
          case 2:
            if (obj.rotate === 0) {
              if (board[obj.y + 4][obj.x + 2] !== 0 || board[obj.y + 5][obj.x + 2] !== 0) check = false;
              if (board[obj.y + 3][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x + 2] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
              if (board[obj.y + 3][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x + 2] !== 0 || board[obj.y + 4][obj.x + 1] !== 0) check = false;
            }
            break;
          case 3:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x + 2] !== 0 || board[obj.y + 4][obj.x + 2] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 2] !== 0) check = false;
            }
            break;
          case 4:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x + 2] !== 0 || board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x + 2] !== 0 || board[obj.y + 5][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x] !== 0 || board[obj.y + 4][obj.x + 2] !== 0) check = false;
            }
            break;    
          case 5:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x + 2] !== 0 || board[obj.y + 4][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 4][obj.x + 2] !== 0 || board[obj.y + 5][obj.x] !== 0) check = false;
            }
            break;
          case 6:
            if (obj.rotate === 0) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 2] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              if (board[obj.y + 5][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x + 1] !== 0 || board[obj.y + 4][obj.x + 1] !== 0 || board[obj.y + 5][obj.x + 1] !== 0) check = false;
            }
            break;
          case 7:
            if (obj.rotate === 0) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 2 + i][obj.x + 1] !== 0) check = false;
              }
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 4][obj.x + 2] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 2 + i][obj.x] !== 0) check = false;
              }
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 3][obj.x + 2] !== 0) check = false;
            }
            break;
        }
        if (check) {
          temp = {...obj, x: obj.x + 1};
        }
        break;
      default:
        break;
    }
    setObj({...temp})
    objRef.current = {...temp}
  }

  useEffect(() => {
    if (start) {
      if (tRef.current) {
        clearInterval(tRef.current);
        tRef.current = setInterval(() => {playGame()}, ft);
      }
      else {
        tRef.current = setInterval(() => {playGame()}, ft);
      }
    } 
    else clearInterval(tRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, ft])

  useEffect(() => {
    keyRef.current?.focus();
    collapse();
    drawBoard();
    drawFigure(obj.x, obj.y, obj.type, obj.rotate);
  });

  return (
    <>
      {
        over 
          ? <GameOver score={score} setFalling={setFt} setOver={setOver} 
          setBoard={setBoard} setScore={setScore} setObj={setObj} type={objRef.current.type} 
          boardRef={boardRef}/>
          : <></>
      }
      {
        pause
          ? <Pause setPause={setPause} setStart={setStart}/>
          : <></>
      }
      <div className='background' onClick={() => keyRef.current?.focus()}>
        <div className='wrap'>
          <canvas ref={cvRef} className='board' width={360} height={630}></canvas>
          <div className='ctrl_board'>
            <div className='title'>TETRIS</div>
            <div className='score'>{score}</div>
            <div className='button_wrap'>
              <button className='button' onClick={() => setStart(true)}>start</button>
              <button className='button' onClick={() => {
                setStart(false)
                setPause(true);
                }}>pause</button>
              <button className='button' onClick={() => {
                setScore(0);
                setBoard(Array.from({length: 26}, (_, i) => i !== 24 
                ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
                : Array(12).fill(255)))
                boardRef.current = Array.from({length: 26}, (_, i) => i !== 24 
                ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
                : Array(12).fill(255));
                clearInterval(tRef.current);
                setStart(false);
                let nt = Math.ceil(Math.random() * 7);
                setObj({x: 5, y: 0, type: nt, rotate: 0});
                setFt(1000);
                falling.current = 1000;
                objRef.current = {x: 5, y: 0, type: nt, rotate: 0};
              }}>reset</button>
            </div>
          </div>
          <div ref={keyRef} className='control' onKeyDown={(e) => {
            if (start) control(e.key);
            }} tabIndex={0}></div>
        </div>
      </div>
    </>
  );
}

export default App;
