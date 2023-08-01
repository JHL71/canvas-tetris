import { MutableRefObject } from 'react';
import './gameover.css';

interface xytr {
    x: number,
    y: number,
    type: number,
    rotate: number;
}

type GameOverProps = {
    score: number,
    setOver: React.Dispatch<React.SetStateAction<boolean>>,
    setFalling: React.Dispatch<React.SetStateAction<number>>,
    setBoard: React.Dispatch<React.SetStateAction<any[][]>>,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setObj: React.Dispatch<React.SetStateAction<xytr>>,
    boardRef: MutableRefObject<any[][]>,
    type: number
}

function GameOver({score, setOver, setFalling, setBoard, setScore, setObj, boardRef, type}:GameOverProps) {

    const click = () => {
        setOver(false);
        setFalling(1000);
        setBoard(Array.from({length: 26}, (_, i) => i !== 24 
            ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
            : Array(12).fill(255)));
        boardRef.current = Array.from({length: 26}, (_, i) => i !== 24 
            ? Array.from({length: 12}, (_, i) => (i === 0 || i === 11) ? 255 : 0)
            : Array(12).fill(255));
        setScore(0);
        setObj({x: 5, y: 0, type: type, rotate: 0})
    }

    return (
        <div className='over_background'>
            <div className='over_wrap'>
                <div className='over_message'>Game Over</div>
                <div className='over_score'>Score : {score}</div>
                <button className='over_button' onClick={click}>retry</button>
            </div>
        </div>
    )
}

export default GameOver;