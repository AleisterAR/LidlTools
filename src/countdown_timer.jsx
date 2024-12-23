import { useState, useEffect, useRef } from 'react';

export default function CountDownTimer() {

    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setPause] = useState(false);
    const [inputTime, setInputTime] = useState({ hour: 0, minute: 0, second: 0 });
    const refSeconds = useRef(0);

    useEffect(() => {
        if (isRunning && !isPaused) {
            refSeconds.current = setInterval(() => {
                setTotalSeconds((prevSeconds) => prevSeconds - 1);
                displayRemainingTime(totalSeconds);
                if (totalSeconds <= 0) {
                    setTotalSeconds(0);
                    clearInterval(refSeconds.current);
                    setIsRunning(false);
                    setPause(false);
                }
            }, 1000);
            return () => clearInterval(refSeconds.current);
        }
    }, [totalSeconds, isRunning, isPaused])

    function displayRemainingTime(seconds) {
        const display_hours = Math.floor(seconds / 3600);
        const display_minutes = Math.floor((seconds % 3600) / 60);
        const display_seconds = seconds % 60;
        setInputTime({
            hour: display_hours, minute: display_minutes, second: display_seconds
        })
    }

    function handleResume() {
        setPause(false);
        clearInterval(refSeconds.current);
    }

    function handlePause() {
        setPause(true);
        clearInterval(refSeconds.current);
    }

    function handleReset() {
        clearInterval(refSeconds.current);
        setIsRunning(false);
        setTotalSeconds(0);
        setInputTime({ hour: 0, minute: 0, second: 0 });
    }

    function handleInputChange(e) {
        const { name, value } = e.target;
        setInputTime((prevRemainingTime) => ({
            ...prevRemainingTime,
            [name]: parseInt(value) || 0
        }));
    }

    function handleTimeSubmit() {
        if (inputTime.hour || inputTime.minute || inputTime.second){
            let totalTime = inputTime.hour * 3600 + inputTime.minute * 60 + inputTime.second;
            setTotalSeconds(totalTime);
            setIsRunning(true);
            setPause(false);
        }
    }

    function handleNumericInput(e) {
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }

    return (
        <div className='container mb-16 mx-auto mt-56'>
            <span className="countdown font-mono text-6xl pt-1 mb-8">
                <span style={{ "--value": inputTime.hour }}></span>:
                <span style={{ "--value": inputTime.minute }}></span>:
                <span style={{ "--value": inputTime.second }}></span>
            </span>
            {isRunning ?
                <div className='flex gap-4 justify-center mb-8'>
                    <button className="btn btn-success text-white" onClick={handleResume}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="btn btn-error text-white" onClick={handlePause}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M7 5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H7Z" />
                        </svg>
                    </button>
                    <button className="btn btn-warning text-white" onClick={handleReset}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4" />
                        </svg>
                    </button>
                </div> 
                :
                <div className='flex gap-4 font-mono justify-center'>
                    <input value={inputTime.hour} name='hour' type="text" className='w-24' onInput={handleNumericInput} onChange={handleInputChange} />
                    <span className='text-3xl'>:</span>
                    <input value={inputTime.minute} name='minute' type="text" className='w-24' onInput={handleNumericInput} onChange={handleInputChange} />
                    <span className='text-3xl'>:</span>
                    <input value={inputTime.second} name='second' type="text" className='w-24' onInput={handleNumericInput} onChange={handleInputChange} />
                    <button className='btn btn-primary text-white w-24' onClick={handleTimeSubmit}>Set</button>
                </div>
            }

        </div>
    );
}