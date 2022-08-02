import { AlgebraMath } from "../../class-services/math-server-ping";
import React, { useState, useRef } from 'react';
import FunctionBoard from "../../../service-components/FunctionBoard";
import { VscListFlat } from "react-icons/vsc";
import { Link, NavLink } from "react-router-dom";

export default function Algebra1() {
    const [algAnswer, setAlgAnswer] = useState({});
    const algebraicExpression = useRef();
    const [answered, setAnswered] = useState(false);
    
    async function handleMathPush(e) {
        e.preventDefault();
        const alg = new AlgebraMath({values: algebraicExpression.current.value, subclass: "Algebra 1"});
        const algerbraReturn = await alg.calculate_alg();
        console.log(algerbraReturn)
        setAlgAnswer(algerbraReturn);
        setAnswered(true);
    }

    function setInput(value) {
        const cursorPosition = algebraicExpression.current?.selectionStart || 0;
        return algebraicExpression.current.value = algebraicExpression.current.value.substring(0, cursorPosition) + value + algebraicExpression.current.value.substring(cursorPosition);
    }

    return (
        <div className="alg-div">
            <h1>Algebra 1 <Link to="/table-of-contents/math-class/"><VscListFlat className="list-icon"/></Link></h1>
            <hr/>
            <div className="wrapper-wrapper">
                <div className="wrapper">
                    <h2>Values</h2>
                    <div className="dynam-input">
                        <input type="text" name="nums" placeholder="" ref={algebraicExpression} style={{marginRight: "20px"}}/>
                    </div>
                    <button className="alg-calculations-btn" onClick={handleMathPush}>Calculate</button>
                    <p>Equation: 9x = 18 Values to be Entered: 9x = 18 || Polynomial: 78x + 567 + 45v || Inequality: 8x ≥ 24</p>
                </div>
                {answered && !algAnswer.errorResponse ? 
                    <div className="operations">
                        <div>
                            <h3>{algAnswer.stepsToAnswer}</h3>
                            <ul>
                                {algAnswer.listOfSteps.map((row, key) => {
                                    return <li key={key}>{row}</li>
                                })}
                            </ul>
                            {algAnswer.type && <NavLink className="how-to-link" to={`/understanding/algebra=${algAnswer.stepsToAnswer}`}>How To?</NavLink>}
                        </div>
                    </div> : <div className="operations">
                        {algAnswer.errorResponse && <h3>No Operations Available, Error!!</h3>}
                    </div>}
                {answered && !algAnswer.errorResponse ?
                    <div className="answer-box" style={{marginTop: "20px"}}>
                        <h1>Answer</h1>
                        <p>{algAnswer.answer}</p>
                    </div> : <div className="answer-box" style={{marginTop: "20px"}}>
                    <h3>{algAnswer.errorResponse}</h3>    
                    {algAnswer.errorResponse && <p>Invalid Input</p>}
                </div>}
            </div>
            <div style={{width: '100%'}}>
                <FunctionBoard functions={["<", ">", "≤", "≥"]} setInput={setInput}/>
            </div>
        </div>
    )
}
