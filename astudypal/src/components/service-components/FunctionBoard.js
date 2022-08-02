export default function FunctionBoard({ functions, setInput }) {
    const keys = functions.map((func, key) => {
        return <button key={key} onClick={(e) => {
            setInput(func);
        }}>{func}</button>
    })

    return (
        <div className="fboard">
            {keys}
        </div>
    )
}