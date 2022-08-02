import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { VscListFlat } from 'react-icons/vsc';
import { ChemistryScience } from '../../class-services/science-server-ping';

export default function Chemistry() {
    const elementRef = useRef();
    const [chemistryAnswer, setChemistryAnswer] = useState({});
    const [answered, setAnswered] = useState(false);

    async function handleElementPush() {
        const result = new ChemistryScience({values: elementRef.current.value, subclass: "Chemistry"});
        setChemistryAnswer(await result.search());
        setAnswered(true);
    }

    return (
        <div>
            <h1>Chemistry <Link to="/table-of-contents/science-class/"><VscListFlat className="list-icon"/></Link></h1>
            <hr/>
            <div className="periodic-table-result-div">
                <img className="periodic-table-graphic" src="/periodic-table.png"/>
                {answered && <div className="element-result" style={{backgroundColor: chemistryAnswer.backgroundColor}}>
                    <h5 className="atomic-number">{chemistryAnswer.atomicNumber}</h5>
                    <hr/>
                    <h5 className="element-symbol">{chemistryAnswer.elementSymbol}</h5>
                    <h5 className="element-name">{chemistryAnswer.name}</h5>
                    <h5 className="atomic-mass">{chemistryAnswer.atomicMass}</h5>
                    <h6 className="electron-configuration">{chemistryAnswer.electronConfig}</h6>
                    <hr/>
                    <h5 className="category">{chemistryAnswer.category}</h5>
                </div>}
            </div>
            <input name="element-search-bar" ref={elementRef} type="text" />
            <button name="element-search-button" onClick={handleElementPush} className="element-search-button">Search Element</button>
        </div>
    )
}
