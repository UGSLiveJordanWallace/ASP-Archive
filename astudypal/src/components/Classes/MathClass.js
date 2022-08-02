import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from "react-icons/ai";

export default function MathClass() {
    return (
        <>
            <h1>Math Class <Link to="/table-of-contents/"><AiOutlineHome className="list-icon"/></Link></h1>
            <hr/>
            <div className="class-body-div">
                <div className="sub-class-list">
                    <h3>Class Content</h3>
                    <Link to="/table-of-contents/math-class/sub-class-geometry">Geometry</Link>       
                    <Link to="/table-of-contents/math-class/sub-class-algebra1">Algebra 1</Link> 
                    <Link to="/table-of-contents/math-class/sub-class-algebra2">Algebra 2</Link>
                </div>
            </div>
        </>
    )
}
