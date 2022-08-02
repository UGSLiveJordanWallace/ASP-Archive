import { PreCalculusMath } from '../../class-services/math-server-ping';
import FunctionBoard from '../../../service-components/FunctionBoard';
import { Link, NavLink } from 'react-router-dom';
import React, { useRef, useState } from 'react';
import { VscListFlat } from 'react-icons/vsc';

export default function PreCalculus() {
    const expressionRef = useRef();
    const [answered, setAnswered] = useState(false);
    const [preCalAnswer, setPreCalAnswer] = useState({});

    async function handleMathPush(e) {
        e.preventDefault();
        const preCal = new PreCalculusMath({values: expressionRef.current.value, subclass: "PreCalculus"});
        setPreCalAnswer(await preCal.calc());
        setAnswered(true);
    }

    function setInput(value) {
        const cursorPosition = expressionRef.current?.selectionStart || 0;
        return expressionRef.current.value = expressionRef.current.value.substring(0, cursorPosition) + value + expressionRef.current.value.substring(cursorPosition);
    }

    return (
        <div>
            <h1>PreCalculus <Link to="/table-of-contents/math-class/"><VscListFlat className="list-icon"/></Link></h1>
            <hr/>
            <div className="wrapper-wrapper">
                <div className="wrapper" style={{width: "98%"}}>
                    <h2>Values</h2>
                    <div className="dynam-input">
                        <input name="nums" placeholder="" ref={expressionRef} style={{marginRight: "20px"}}/>
                    </div>
                    <button className="alg-calculations-btn" onClick={handleMathPush}>Calculate</button>
                </div>
                {answered && <div className="answer-box" style={{marginTop: "20px", width: "98%"}}>
                    <h1>Answer</h1>
                    {preCalAnswer.answer ? <p>{preCalAnswer.answer}</p> : <p>{preCalAnswer.error}</p>}
                    {preCalAnswer.numerator && <div className="fraction">
                        <p className="numerator">{preCalAnswer.numerator}</p> 
                        <p className="denominator">{preCalAnswer.denominator} </p> 
                    </div>}
                    {!preCalAnswer.error && <NavLink className="how-to-link" to={`/understanding/pre-calculus=${preCalAnswer.stepsToAnswer}`}>How To?</NavLink>}
                </div>}
            </div>
            <div style={{width: '100%'}}>
                <FunctionBoard functions={["𝝅", "°"]} setInput={setInput}/>
            </div>
        </div>
    )
}