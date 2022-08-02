import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";

export default function EnglishClass() {
    return (
        <>
            <h1>English Class <Link to="/table-of-contents/"><AiOutlineHome className="list-icon"/></Link></h1>
            <hr/>
            <div className="class-body-div">
                <div className="sub-class-list">
                    <h3>Class Content</h3>
                    <Link to="/table-of-contents/english-class/sub-class-editor">Editor</Link>     
                </div>
            </div>
        </>
    )
}
