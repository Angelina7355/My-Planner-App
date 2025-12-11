import React from "react";

function TodoItem({ todo }) {
    return (
        <>
            <li className="to-do">
                <span>{todo.text}</span>
                {todo.date && <p>{new Date(todo.date).toLocaleDateString()}</p>}
            </li>
            <hr />
        </>
    );
}

export default TodoItem;
