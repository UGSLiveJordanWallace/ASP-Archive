import { Radar } from 'react-chartjs-2';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { AiOutlineArrowRight } from 'react-icons/ai';
import React, { useEffect, useState } from 'react'

export const LineGraph = ({ line }) => {
    console.log(line);
    return (
        <div className="line-graph">
            <div className="mid-line">
                <div className="line">
                    {(line.line > 0 && line.equation.includes(">")) && <><AiOutlineArrowRight /> <div className="bar-pos-open" style={{width: "300px"}}></div></>}
                    {(line.line > 0 && line.equation.includes("≥")) && <><AiOutlineArrowRight /> <div className="bar-pos-closed" style={{width: "300px"}}></div></>}
                    {(line.line < 0 && line.equation.includes("<")) && <><AiOutlineArrowLeft /> <div className="bar-neg-open" style={{width: "300px"}}></div></>}
                    {(line.line < 0 && line.equation.includes("≤")) && <><AiOutlineArrowLeft /> <div className="bar-neg-closed" style={{width: "300px"}}></div></>}
                </div>
                <hr/>
            </div>
            <div className="main-line">
                <hr/>
            </div>
        </div> 
    )
}

const Graph = ({ data }) => {
    const labels = [];
    for (let i = 360; i >= 1; i -= 10) {
        labels.push(`${i}`);
    }

    return (
        <div>
            <Radar data={{
                labels: labels,
                datasets: [{
                    label: ["degrees"], 
                    data: data,
                    borderColor: [
                        "rgb(0, 0, 344, 89)"
                    ]
                }]
            }} width={350} height={200} options={{ maintainAspectRatio: true }}/>
        </div>
    )
}

export default Graph;