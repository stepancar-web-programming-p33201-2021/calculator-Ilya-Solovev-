import {useState} from "react";
import './App.css'

function App() {

    const [value, setValue] = useState('');
    const [operator, setOperator] = useState('');
    const [lvalue, setLvalue] = useState('');

    function handleClick(event) {
        handleValue(event.target.name)
    }

    function handleValue(eventValue) {
        console.log(eventValue);

        if (eventValue.match(/[0-9]/)) {
            setValue(value + eventValue);
        } else if (eventValue === "Clear") {
            setValue("");
            setOperator("");
            setLvalue("");
        } else if (eventValue === ".") {
            if (!value.match(/\./) && value !== "") {
                setValue(value + eventValue);
            }
        } else if (eventValue === "=") {
            if (!value.match(/^.*\.$/) && value !== "") {
                switch (operator) {
                    case "+":
                        setValue((parseFloat(lvalue) + parseFloat(value)).toString());
                        break;
                    case "-":
                        setValue((parseFloat(lvalue) - parseFloat(value)).toString());
                        break;
                    case "*":
                        setValue((parseFloat(lvalue) * parseFloat(value)).toString());
                        break;
                    case "/":
                        setValue((parseFloat(lvalue) / parseFloat(value)).toString());
                        break;
                    case "^":
                        setValue(
                            Math.pow(parseFloat(lvalue), parseFloat(value)).toString()
                        );
                        break;
                }
            }
                setOperator("");
                setLvalue("");


        } else {
            if (!value.match(/^=.*\.$/)) {
                if (operator === "" && value !== "") {
                    setLvalue(value);
                    setValue("");
                }
                setOperator(eventValue);
            }
        }
    }

        function onChangeInput(event) {
            const eventValue = event.target.value;
            if (
                eventValue.match(/^[0-9]*$/) ||
                eventValue.match(/^[0-9]*\.[0-9]*$/) ||
                eventValue.match(/^[0-9]*\.$/)
            ) {
                setValue(eventValue);
            } else if (eventValue.slice(-1).match(/[*\-%^+=]/)) {
                handleValue(eventValue.slice(-1));
            }
        }

    function handleKeyboard(event) {
        const key = event.key;
        if (key === "Escape") {
            handleValue("Сlear");
        } else if (key === "Enter") {
            handleValue("=");
        }
    }

        return (
            <div className="App">
                <div className="calc-wrapper">
                    <div className="row">
                        <input type="text" value={value} onChange={onChangeInput} onKeyUp={handleKeyboard}/>
                    </div>
                    <div className="row">
                        <button onClick={handleClick} name={'7'}>7</button>
                        <button onClick={handleClick} name={'8'}>8</button>
                        <button onClick={handleClick} name={'9'}>9</button>
                        <button onClick={handleClick} name={'/'}>/</button>
                    </div>
                    <div className="row">
                        <button onClick={handleClick} name={'4'}>4</button>
                        <button onClick={handleClick} name={'5'}>5</button>
                        <button onClick={handleClick} name={'6'}>6</button>
                        <button onClick={handleClick} name={'*'}>*</button>
                    </div>
                    <div className="row">
                        <button onClick={handleClick} name={'1'}>1</button>
                        <button onClick={handleClick} name={'2'}>2</button>
                        <button onClick={handleClick} name={'3'}>3</button>
                        <button onClick={handleClick} name={'+'}>+</button>
                    </div>
                    <div className="row">
                        <button onClick={handleClick} name={'.'}>.</button>
                        <button onClick={handleClick} name={'0'}>0</button>
                        <button onClick={handleClick} name={'='}>=</button>
                        <button onClick={handleClick} name={'-'}>-</button>
                    </div>
                    <div className="row">
                        <button onClick={handleClick} name={'Clear'}>Clear</button>
                    </div>
                    <div className="operator">{operator}</div>
                </div>
            </div>
        );
}
export default App;

