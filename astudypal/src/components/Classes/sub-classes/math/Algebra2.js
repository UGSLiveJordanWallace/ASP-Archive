import { AlgebraMath } from "../../class-services/math-server-ping";
import React, { useState, useRef } from 'react';
import { VscListFlat } from "react-icons/vsc";
import { Link, NavLink } from "react-router-dom";

export default function Algebra2() {
    const [algAnswer, setAlgAnswer] = useState({});
    const algebraicExpression = useRef();
    const [answered, setAnswered] = useState(false);
    
    async function handleMathPush(e) {
        e.preventDefault();
        const alg = new AlgebraMath({values: algebraicExpression.current.value, subclass: "Algebra 2"});
        const algerbraReturn = await alg.calculate_alg();
        setAlgAnswer(algerbraReturn);
        setAnswered(true);
    }

    return (
        <div className="alg-div">
            <h1>Algebra 2 <Link to="/table-of-contents/math-class/"><VscListFlat className="list-icon"/></Link></h1>
            <hr/>
            <div className="wrapper-wrapper">
                <div className="wrapper">
                    <h2>Values</h2>
                    <div className="dynam-input">
                        <input type="text" name="nums" placeholder="" ref={algebraicExpression} style={{marginRight: "20px"}}/>
                    </div>
                    <button className="alg-calculations-btn" onClick={handleMathPush}>Calculate</button>
                </div>
                <div className="operations">
                    {answered && <div>
                        <h3>{algAnswer.stepsToAnswer}</h3>
                        <ul>
                            {algAnswer.listOfSteps.map((row, key) => {
                                return <li key={key}>{row}</li>
                            })}
                        </ul>
                        {/* <NavLink className="how-to-link" to={`/understanding/algebra=${algAnswer.stepsToAnswer}`}>How To?</NavLink> */}
                    </div>}
                </div>
                {answered && !algAnswer.errorResponse ? <div className="answer-box" style={{marginTop: "20px"}}>
                    <h1>Answer</h1>
                    <p>{algAnswer.answer}</p>
                    {algAnswer.numerator && <div className="fraction"> 
                        <p className="numerator">{algAnswer.numerator}</p> 
                        <p className="denominator">{algAnswer.denominator} </p>
                    </div>}
                </div>: <div>
                    <h3>{algAnswer.errorResponse}</h3>    
                </div>}
            </div>
        </div>
    )
}
