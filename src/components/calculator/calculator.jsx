
import { useState } from "react";
import style from "./calculator.module.css";
import Button from "../buttons/buttons";
import { evaluate } from "mathjs";

function Calculator() {

  const [input, setInput] = useState('');

//   Buttons with their respected labels
  const buttons = [
    { label: 'C', className: style.clear, value: 'C' },
    { label: '+/-', value: '+/-' },
    { label: '%', value: '%' },
    { label: '÷', className: style.operations, value: '/' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '×', className: style.operations, value: '*' },
    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '-', className: style.operations, value: '-' },
    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '+', className: style.operations, value: '+' },
    { label: '0', className: style.zero, value: '0' },
    { label: '.', value: '.' },
    { label: '=', className: style.operations, value: '=' }
  ];

//   Clears the input
  const handleClear = () => {
    setInput("");
  };

//   Handles the Calculations
const handleClick = (value)=>{
    switch(value){
        case "C":
            handleClear();
            break;
        case "=":
            handleCalculate();
            break;
        case "+/-":
            handlePlusMinus();
            break;
        case "%":
            handlePercentage();
            break;
        default :
            setInput(prev=>prev+value);
            break;
      }
}
  
// Operations on PlusMinus
  const handlePlusMinus = () => {
    try {
      const result = evaluate(`${input} * -1`).toString();
      setInput(result);
    } catch (e) {
      console.log(e);
      setInput('Error');
    }
  };

//   Final Calculation
  const handleCalculate = () => {
    try {
      const result = evaluate(input).toString();
      setInput(result);
    } catch (e) {
      console.log(e);
      setInput('Error');
    }
  };

//   Handles Percentage Operations
  const handlePercentage = () => {
    try {
      const lastNumberMatch = input.match(/(\d+\.?\d*)$/);
      if (lastNumberMatch) {
        const lastNumber = lastNumberMatch[0];
        const percentage = (parseFloat(lastNumber) / 100).toString();
        const newInput = input.slice(0, -lastNumber.length) + percentage;
        setInput(newInput);
      } else {
        setInput('Error');
      }
    } catch (e) {
      console.log(e);
      setInput('Error');
    }
  };


  

  return (
    <div className={style.calculator}>
      <div className={style.statusBar}>
        <span className={style.redDot}></span>
        <span className={style.yellowDot}></span>
        <span className={style.greenDot}></span>
      </div>
      <input type="text" value={input} readOnly />
      <div className={style.buttons}>
        {/* rendering the buttons */}
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleClick(button.value)}
            className={button.className}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
