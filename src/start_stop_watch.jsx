import { useState, useRef } from "react";

export function Stopwatch() {
    const [now, setNow] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [running, setRunning] = useState(false);
    const refInterval = useRef(null);

    function handleStart() {
        if (!running) {
            const currentStartTime = Date.now() - elapsedTime;
            setStartTime(currentStartTime);
            setRunning(true);

            refInterval.current = setInterval(() => {
                setNow(Date.now());
            }, 10);
        }
    }

    function handleStop() {
        if (running) {
            clearInterval(refInterval.current);
            refInterval.current = null;
            setElapsedTime(Date.now() - startTime);
            console.log(Date.now() - startTime);
            setRunning(false);
        }
    }

    function handleReset() {
        clearInterval(refInterval.current);
        refInterval.current = null;
        setStartTime(null);
        setElapsedTime(0);
        setNow(null);
        setRunning(false);
    }

    let secondsPassed = elapsedTime / 1000;
    if (startTime !== null && now !== null && running) {
        secondsPassed = (now - startTime) / 1000;
    }

    return (
        <div className="container mb-16 mt-60 mx-auto">
            <div className="flex flex-col justify-center items-center">
                <h1 className="mb-8 text-xl font-bold leading-none tracking-tight text-gray-900 md:text-2xl lg:text-3xl">
                    Time Passed:{" "}
                    <span className="w-20 text-lg font-medium leading-none tracking-tight text-gray-900 md:text-xl lg:text-2xl font-mono">
                        {secondsPassed.toFixed(2)} {secondsPassed === 1 ? "second" : "seconds"}
                    </span>
                </h1>
                <div className="max-w-80 grid grid-cols-3 mx-auto gap-4">
                    <button className="btn btn-success text-white" onClick={handleStart}>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="btn btn-error text-white" onClick={handleStop}>
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
            </div>
        </div>
    );
}
