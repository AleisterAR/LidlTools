import { useState, useRef } from 'react';

export default function Calculator() {

    const [currentCalculation, setCalculation] = useState({
        currentInput: "0",
        previousInput: "",
        operator: null,
        result: ""
    });
    const [lidlInput, setlidlInput] = useState("");
    const [showInput, setshowInput] = useState("0");

    function doCalculation(n1, op, n2) {
        return eval(n1 + op + n2);
    }

    function formatNumberWithCommas(number_string) {
        const formatter = new Intl.NumberFormat('en-US');
        return formatter.format(parseFloat(number_string));
    }

    function handleNumericalClick(e) {
        let value = e.target.value.toString();
        setCalculation((prevCalculation) => {
            let updatedInput;
            if (!currentCalculation.operator && !currentCalculation.result) {
                if (prevCalculation.currentInput === "0" && value !== ".") {
                    updatedInput = value;
                }
                else {
                    if (value === '.') {
                        if (prevCalculation.currentInput.length - 1 >= 4) {
                            updatedInput = formatNumberWithCommas(prevCalculation.currentInput) + value;
                        }
                        else {
                            updatedInput = prevCalculation.currentInput + value;
                        }
                    }
                    else {
                        updatedInput = prevCalculation.currentInput + value;
                    }
                }
                setshowInput(updatedInput);
                return {
                    ...prevCalculation,
                    currentInput: updatedInput,
                };
            }
            else if (currentCalculation.operator && currentCalculation.currentInput) {
                if (prevCalculation.previousInput === "0" && value !== ".") {
                    updatedInput = value;
                }
                else {
                    if (value === '.') {
                        if (prevCalculation.previousInput.length - 1 >= 4) {
                            updatedInput = formatNumberWithCommas(prevCalculation.previousInput) + value;
                        }
                        else {
                            updatedInput = prevCalculation.previousInput + value;
                        }
                    }
                    else {
                        updatedInput = prevCalculation.previousInput + value;
                    }
                }
                setshowInput(updatedInput);
                return {
                    ...prevCalculation,
                    previousInput: updatedInput,
                };
            }
            else if (currentCalculation.result && !currentCalculation.operator){
                if (value !== ".") {
                    updatedInput = value;
                }
                else{
                    updatedInput = "0" + value;
                }
                setshowInput(updatedInput);
                setlidlInput("");
                return {
                    ...prevCalculation,
                    currentInput: updatedInput,
                    result: '',
                };
            }
        })
    }

    function handleReset() {
        setshowInput("0");
        setCalculation(
            {
                currentInput: "0",
                previousInput: "",
                operator: null,
                result: ""
            }
        );
        setlidlInput("");
    }

    function giveLidlCalculation(n1, op, n2 = "", equal = "") {
        op = op.replace("/", '÷').replace("*", "×")
        if (!n2 && !equal) {
            return formatNumberWithCommas(n1) + " " + op
        }
        return formatNumberWithCommas(n1) + " " + op + " " + formatNumberWithCommas(n2) + equal
    }

    function handleOperatorClick(e) {
        if (currentCalculation.currentInput && !currentCalculation.previousInput) {
            setCalculation((prevCalculation) => {
                setlidlInput(giveLidlCalculation(prevCalculation.currentInput, e.target.value));
                return { ...prevCalculation, operator: e.target.value };
            })
        }
        else if (currentCalculation.currentInput && currentCalculation.previousInput && currentCalculation.operator) {
            setshowInput(() => {
                let temp_result = doCalculation(currentCalculation.currentInput, currentCalculation.operator, currentCalculation.previousInput);
                setCalculation((prevCalculation) => {
                    setlidlInput(giveLidlCalculation(temp_result, e.target.value));
                    return {
                        currentInput: temp_result,
                        previousInput: "",
                        operator: e.target.value,
                        result: temp_result,
                    }
                });
                return formatNumberWithCommas(temp_result);
            });
        }
    }

    function handleDeleteClick() {
        if (!currentCalculation.result && !currentCalculation.operator) {
            setCalculation((prevCalculation) => {
                let updatedValue = prevCalculation.currentInput.slice(0, -1) || "0";
                setshowInput(formatNumberWithCommas(updatedValue));
                return {
                    ...prevCalculation,
                    currentInput: updatedValue ?? "0"
                }
            });
        }
        else if (currentCalculation.currentInput && currentCalculation.result) {
            setlidlInput(() => "");
        }
    }

    function handleResultClick() {
        if (currentCalculation.currentInput && currentCalculation.previousInput && currentCalculation.operator) {
            setshowInput(() => {
                let temp_result = doCalculation(currentCalculation.currentInput, currentCalculation.operator, currentCalculation.previousInput);
                setCalculation((prevCalculation) => {
                    setlidlInput(giveLidlCalculation(currentCalculation.currentInput, currentCalculation.operator, currentCalculation.previousInput, " ="))
                    return {
                        currentInput: temp_result,
                        previousInput: "",
                        operator: null,
                        result: temp_result,
                    }
                });
                return formatNumberWithCommas(temp_result);
            });
        }
    }
    return (
        <div className='container mx-auto mb-16 mt-[8.5rem]'>
            <div className='flex flex-col justify-center items-center gap-4'>
                <div className='flex justify-center items-center'>
                    <div className='bg-[#f2f2f2] w-[22.5rem] h-[4.85rem] rounded-md text-end py-4 px-5 flex flex-col justify-end'>
                        <span className='font-light text-sm text-gray-600 font-mono'>{lidlInput}</span>
                        <span className='font-bold text-3xl font-mono'>
                            {showInput}
                        </span>
                    </div>
                </div>
                <div className='flex justify-center items-center'>
                    <div className='bg-[#f2f2f2] w-[22.5rem] rounded-md text-end py-4 px-5'>
                        <div className='grid grid-cols-4 gap-4 mb-4'>
                            <button className='btn kbd' value={7} onClick={handleNumericalClick}>7</button>
                            <button className='btn kbd' value={8} onClick={handleNumericalClick}>8</button>
                            <button className='btn kbd' value={9} onClick={handleNumericalClick}>9</button>
                            <button className='btn bg-red-500 hover:bg-red-600 text-white' onClick={handleDeleteClick}>DEL</button>
                        </div>
                        <div className='grid grid-cols-4 gap-4 mb-4'>
                            <button className='btn kbd' value={4} onClick={handleNumericalClick}>4</button>
                            <button className='btn kbd' value={5} onClick={handleNumericalClick}>5</button>
                            <button className='btn kbd' value={6} onClick={handleNumericalClick}>6</button>
                            <button className='btn kbd' value={'+'} onClick={handleOperatorClick}>+</button>
                        </div>
                        <div className='grid grid-cols-4 gap-4 mb-4'>
                            <button className='btn kbd' value={1} onClick={handleNumericalClick}>1</button>
                            <button className='btn kbd' value={2} onClick={handleNumericalClick}>2</button>
                            <button className='btn kbd' value={3} onClick={handleNumericalClick}>3</button>
                            <button className='btn kbd' value={"-"} onClick={handleOperatorClick}>-</button>
                        </div>
                        <div className='grid grid-cols-4 gap-4 mb-4'>
                            <button className='btn kbd' value={"."} onClick={handleNumericalClick} >.</button>
                            <button className='btn kbd' value={0} onClick={handleNumericalClick}>0</button>
                            <button className='btn kbd' value={"/"} onClick={handleOperatorClick}>÷</button>
                            <button className='btn kbd' value={"*"} onClick={handleOperatorClick}>×</button>
                        </div>
                        <div className='grid grid-cols-4 gap-4 mb-4'>
                            <button className='btn col-span-2 btn-warning text-white' onClick={handleReset} >RESET</button>
                            <button className='btn col-span-2 btn-success text-white' onClick={handleResultClick}>=</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}