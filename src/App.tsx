import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  const [start, setStart] = useState<boolean>(false);
  const [obj, setObj] = useState<objI>({
    x: 4,
    y: 0,
    type: 7,
    rotate: 0
  });
  const tRef:any = useRef();
  const objRef = useRef(obj);
  const [board, setBoard] = useState<any[][]> (Array.from({length: 26}, (_, i) => i !== 24 
  ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
  : Array(12).fill(255)));
  const boardRef = useRef(board);
  const falling = useRef(1000);

  const playGame = () => {
    // let x = objRef.current.x;
    let {x, y, type, rotate} = {...objRef.current}
    let check = true;
    console.log(x, y, type, rotate);
    switch (type) {
      case 1:

        break;
      case 2:
        if (rotate === 0) {

        }
        if (rotate === 1) {
          
        }
        if (rotate === 2) {
          
        }
        if (rotate === 3) {
          
        }
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
        if (rotate === 0) {
          for (let i = 0; i < 4; i++) {
            if (boardRef.current[y + 5][x + i - 2] !== 0) check = false;
          }  
        }
        if (rotate === 1) {
          if (boardRef.current[y + 6][x] !== 0) check = false;
        }
        if (rotate === 2) {
          for (let i = 0; i < 4; i++) {
            if (boardRef.current[y + 4][x + i - 2] !== 0) check = false;
          }  
        }
        if (rotate === 3) {
          if (boardRef.current[y + 6][x - 1] !== 0) check = false;
        }
        break;
      default:
        break;
      }
      // setBoard(board.map((el, i) => i !== y + 4 ? el : board[i].map((el, i) => i !== x - 2 ? el : 3)));
    if (check) {
      y++;
      objRef.current.y = y;
      setObj({...objRef.current});
    } else {
      switch (type) {
        case 7:
          if (rotate === 0) {
            boardRef.current = boardRef.current.map((el, idx) => idx !== y + 4 ? el : boardRef.current[idx].map((el, idx) => (idx < x - 2 || idx > x + 1) ? el : type));
            setBoard([...boardRef.current]);
          }
          if (rotate === 1) {
            boardRef.current = boardRef.current.map((el, idx) => (idx < y + 2 || idx > y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x ? el : type));
            setBoard([...boardRef.current]);
          }
          if (rotate === 2) {
            boardRef.current = boardRef.current.map((el, idx) => idx !== y + 3 ? el : boardRef.current[idx].map((el, idx) => (idx < x - 2 || idx > x + 1) ? el : type));
            setBoard([...boardRef.current]);
          }
          if (rotate === 3) {
            boardRef.current = boardRef.current.map((el, idx) => (idx < y + 2 || idx > y + 5) ? el : boardRef.current[idx].map((el, idx) => idx !== x - 1 ? el : type));
            setBoard([...boardRef.current]);
          }
      }

      setObj({x: 5, y: 0, type: 7, rotate: 0});
      objRef.current = {x: 5, y: 0, type: 7, rotate: 0};
    }
  }

  const collapse = () => {
    const full: any[] = [];
    for (let y = 0; y < 26; y++) {
      if (board[y].every((el) => el !== 0) && y !== 24) full.push(y);
    }
    if (full.length) {
      console.log('full');
      let newBoard = [...board].map((el) => [...el]);
      while (full.length) {
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
          ctx.beginPath();
          if (boardRef.current[i+4][j] === 255) {
            ctx.rect(j * 30 + 5, i * 30 + 5, 20, 20);
            ctx.fillStyle = 'black';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 1) {
            ctx.rect(j * 30, i * 30, 30, 30);
            ctx.fillStyle = 'red';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 2) {
            ctx.rect(j * 30, i * 30, 30, 30);
            ctx.fillStyle = 'orange';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 3) {
            ctx.rect(j * 30, i * 30, 30, 30);
            ctx.fillStyle = 'yellow';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 4) {
            ctx.rect(j * 30, i * 30, 30, 30);
            ctx.fillStyle = 'green';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 5) {
            ctx.rect(j * 30, i * 30, 30, 30);
            ctx.fillStyle = 'blue';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 6) {
            ctx.rect(j * 30, i * 30, 30, 30);
            ctx.fillStyle = 'indigo';
            ctx.fill();
          } else if (boardRef.current[i+4][j] === 7) {
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
  }

  const control = (key: string) => {
    let check = true;
    let temp: objI = {...obj};
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
            if (obj.rotate === 0) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 2 + i][obj.x] !== 0) check = false;
              }
            }
            if (obj.rotate === 1) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 3][obj.x - 2 + i] !== 0) check = false;
              }
            }
            if (obj.rotate === 2) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 2 + i][obj.x - 1] !== 0) check = false;
              }
            }
            if (obj.rotate === 3) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 4][obj.x - 2 + i] !== 0) check = false;
              }
            }
            break;
        }
        if (check) {
          temp = {...obj, rotate: (obj.rotate + 1) % 4};
        }
        break;
      case 'a': case 'ArrowLeft':
        temp = {...obj, x: obj.x - 1};
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
            if (obj.rotate === 0) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 5][obj.x + i - 2] !== 0) check = false;
              }  
            }
            if (obj.rotate === 1) {
              if (board[obj.y + 6][obj.x] !== 0) check = false;
            }
            if (obj.rotate === 2) {
              for (let i = 0; i < 4; i++) {
                if (board[obj.y + 4][obj.x + i - 2] !== 0) check = false;
              }  
            }
            if (obj.rotate === 3) {
              if (board[obj.y + 6][obj.x - 1] !== 0) check = false;
            }
            if (check) {
              temp = {...obj, y: obj.y + 1};
            }
            break;
        }
        break;
      case 'd':
      case 'ArrowRight':
        temp = {...obj, x: obj.x + 1};
        break;
      default:
        break;
    }
    console.log(obj.x, obj.y);
    setObj({...temp})
    objRef.current = {...temp}
  }

  useEffect(() => {
    if (start) tRef.current = setInterval(() => {playGame()}, falling.current);
    else clearInterval(tRef.current);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  useEffect(() => {
    keyRef.current?.focus();
    collapse();
    drawBoard();
    drawFigure(obj.x, obj.y, obj.type, obj.rotate);
  });

  return (
    <div className='background' onClick={() => keyRef.current?.focus()}>
      <canvas ref={cvRef} className='board' width={360} height={630} onClick={() => {
        drawBoard();
        setStart(!start);
        }}></canvas>
      <div ref={keyRef} className='control' onKeyDown={(e) => {
        control(e.key);
        }} tabIndex={0}></div>
    </div>
  );
}

export default App;
