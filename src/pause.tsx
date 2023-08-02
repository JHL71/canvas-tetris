import './pause.css';

type PauseProps = {
    setPause: React.Dispatch<React.SetStateAction<boolean>>,
    setStart: React.Dispatch<React.SetStateAction<boolean>>
}

function Pause({setPause, setStart}:PauseProps) {

    return (
        <div className='pause_background' onClick={() => {
            setStart(true);
            setPause(false);
        }}>
            <div className='pause_message'>Pause</div>
        </div>
    )
}

export default Pause;