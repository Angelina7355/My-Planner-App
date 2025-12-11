import React from "react";

export default function TodoItem({ todo }) {
    return (
        <>
            <li className="to-do">
                <span>{todo.text}</span>
                {todo.date ? <p>{todo.date}</p> : <p>{"\u00A0"}</p>}
            </li>
            <hr />
        </>
    );
}
