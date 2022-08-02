import { GeometryMath } from "../../class-services/math-server-ping";
import { VscListFlat } from 'react-icons/vsc';
import { Button } from "react-bootstrap";
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';

export default function Geometry() {
    const [geoFunction, setGeoFunction] = useState("");
    const [answered, setAnswered] = useState(false);
    const [geoAnswer, setGeoAnswer] = useState("");
    const [geoValues, setGeoValues] = useState([
        {nums: ""}
    ]);
    const [link, setLink] = useState("");
    
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...geoValues];
        list[index][name] = value;
        setGeoValues(list);
    }

    function getLink(name) {
        switch(name) {
            case "quad-perimeter":
                setLink("Quadrilateral Perimeter");
                break;
            case "quad-area":
                setLink("Quadrilateral Area");
                break;
            case "circ-circum-radius":
                setLink("Circumference Of A Circle");
                break;
            case "circ-area":
                setLink("Area Of A Circle");
                break;
            default:
                setLink("");
                break;
        }
    }

    async function handleMathPush(e) {
        const { name } = e.target;
        const values = geoValues.map((data) => {
            return Number.parseInt(data.nums);
        });
        const operationName = {operation: name, values: values, subclass: "Geometry"};
        const geo = new GeometryMath(operationName);

        getLink(name);

        setGeoAnswer(await geo.calc_data());
        setGeoFunction(name)
        setAnswered(true);
    }

    function handleAddInputBox(e) {        
        return setGeoValues([...geoValues, {nums: ""}]);
    }

    function handleRemoveInputBox(index) {
        const list = [...geoValues];
        list.splice(index, 1);
        return setGeoValues(list);
    }

    return (
        <div className="geo-div">
            <h1>Geometry <Link to="/table-of-contents/math-class/"><VscListFlat className="list-icon"/></Link></h1>
            <hr/>
            <div className="wrapper-wrapper">
                <div className="wrapper">
                    <h2>Values</h2>
                    {geoValues.map((item,key) => {
                        return (
                            <div className="dynam-input" key={key}>
                                <input type="text" name="nums" placeholder="" value={item.nums} onChange={e => handleChange(e, key)} style={{marginRight: "20px"}}/>
                                {geoValues.length !== 1 && <Button value="Remove" onClick={() => handleRemoveInputBox(key)} style={{marginRight: "5px"}}>Remove</Button>}
                                {geoValues.length - 1 === key && <Button value="Add" onClick={handleAddInputBox}>Add</Button>}
                            </div>
                        );
                    })}
                    {geoValues.length < 2 && <p>Example: sin(45) Values to be Entered: 45</p>}
                </div>
                <div className="operations">
                    <h2>Operations</h2>
                    <ul>
                        <li><button name="quad-perimeter" onClick={handleMathPush}>Find The Quadrilateral Perimeter</button></li>
                        <li><button name="quad-area" onClick={handleMathPush}>Find The Quadrilateral Area</button></li>
                        <li><button name="circ-circum-radius" onClick={handleMathPush}>Find The Circumference of a Circle</button></li>
                        <li><button name="circ-area" onClick={handleMathPush}>Find The Circle Area</button></li>
                        <li><button name="degree-sin" onClick={handleMathPush}>Sin(θ)</button></li>
                        <li><button name="degree-cos" onClick={handleMathPush}>Cos(θ)</button></li>
                        <li><button name="degree-tan" onClick={handleMathPush}>Tan(θ)</button></li>
                    </ul>
                </div>
                {answered && <div className="answer-box">
                    <h1>Answer</h1>
                    <h5>{geoAnswer}</h5>
                    {geoFunction === "degree-sin" || geoFunction === "degree-cos" || geoFunction === "degree-tan" ? "" : <NavLink className="how-to-link" to={`/understanding/geometry=${link}`}>How to?</NavLink>}
                </div>}
            </div>
        </div>
    )
}
