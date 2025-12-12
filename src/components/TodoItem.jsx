import React from "react";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
}

export default function TodoItem({ todo }) {
    return (
        <>
            <li className="to-do">
                <span>{todo.text}</span>
                {todo.date ? <p>{formatDate(todo.date)}</p> : <p>{"\u00A0"}</p>}
            </li>
            <hr />
        </>
    );
}
