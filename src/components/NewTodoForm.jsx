import React, { useState } from "react";

function NewTodoForm({ todos, setTodos }) {
    const [newTodo, setNewTodo] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [dateConfirmed, setDateConfirmed] = useState(false);

    const handleAddTodo = () => {
        if (!newTodo.trim()) return;

        const todoItem = {
            text: newTodo,
            date: dateConfirmed ? dateInput : null,
        };

        setTodos([...todos, todoItem]);

        setNewTodo("");
        setDateInput("");
        setDateConfirmed(false);
    };

    const handleConfirmDate = () => setDateConfirmed(true);
    const handleCancelDate = () => {
        setDateInput("");
        setDateConfirmed(false);
    };

    return (
        <li className="input-to-do">
            <input
                type="text"
                placeholder="add to-do item here"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />

            <button disabled={!newTodo.trim()} onClick={handleAddTodo}>
                add to-do
            </button>

            {!dateConfirmed && (
                <>
                    <input
                        type="date"
                        value={dateInput}
                        onChange={(e) => setDateInput(e.target.value)}
                    />
                    <button disabled={!dateInput} onClick={handleConfirmDate}>
                        confirm
                    </button>
                    <button onClick={handleCancelDate}>cancel</button>
                </>
            )}

            {dateConfirmed && (
                <button onClick={() => setDateConfirmed(false)}>
                    change date
                </button>
            )}
        </li>
    );
}

export default NewTodoForm;
