import React from 'react'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

export default function ScienceClass() {
    return (
        <>
            <h1>Science Class <Link to="/table-of-contents/"><AiOutlineHome className="list-icon"/></Link></h1>
            <hr/>
            <div className="modified-body-div">
                <div className="sub-class-list">
                    <h3>Class Content</h3>
                    <Link to="/table-of-contents/science-class/sub-class-chemistry">Chemistry</Link>       
                    <Link to="/table-of-contents/science-class/sub-class-biology">Biology</Link> 
                    <Link to="/table-of-contents/science-class/sub-class-anatomy">Anatomy</Link>     
                    <Link to="/table-of-contents/science-class/sub-class-earth-science">Earth Science</Link>     
                    <Link to="/table-of-contents/science-class/sub-class-zoology">Zoology</Link>     
                    <Link to="/table-of-contents/science-class/sub-class-forensics">Forensics</Link>     
                    <Link to="/table-of-contents/science-class/sub-class-food-science">Food Science</Link>     
                </div>
            </div>
        </>
    )
}
