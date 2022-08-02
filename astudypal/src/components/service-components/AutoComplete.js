import React, { useState } from 'react';

const AutoComplete = ({ result, setInput }) => {
    const [selected, setSelected] = useState(false);
    const suggestion = result.map((row, key) => {
        return <li key={key} onClick={e => {
            setInput(row);
            setSelected(true);
        }}>{row}</li>;
    })

    return (
        <div className={"auto-complete-div"}>
            {!selected && suggestion}
        </div>
    )
}

export default AutoComplete;
