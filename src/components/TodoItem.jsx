import React, { useState } from "react";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
}

export default function TodoItem({ todo, onEdit, onDelete }) {
    const [editing, setEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);
    const [editDate, setEditDate] = useState(todo.date || "");

    const handleSave = () => {
        onEdit(editText, editDate);
        setEditing(false);
    };

    if (editing) {
        return (
            <li className="to-do editing">
                <div className="to-do-info">
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                </div>

                <div className="edit-btns-container">
                    <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                    />
                    <button onClick={onDelete}>Delete</button>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </div>
            </li>
        );
    }

    return (
        <>
            <li className="to-do">
                <div className="to-do-info">
                    <span>{todo.text}</span>
                    {todo.date ? (
                        <p>{formatDate(todo.date)}</p>
                    ) : (
                        <p>{"\u00A0"}</p>
                    )}
                </div>

                <button
                    className="edit-todo-btn"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>
            </li>
            <hr />
        </>
    );
}
