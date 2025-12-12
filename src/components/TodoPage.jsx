import React, { useState } from "react";
import TodoItem from "./TodoItem";

export default function TodoPage({ todos, setTodos }) {
    const [input, setInput] = useState("");
    const [date, setDate] = useState("");
    const [showDateInput, setShowDateInput] = useState(false);

    const handleAddTodo = () => {
        if (!input.trim()) return;

        setTodos([...todos, { text: input, date: date || null }]);
        setInput("");
        setDate("");
        setShowDateInput(false);
    };

    return (
        <div id="to-do-page">
            <h2>To-Do List</h2>
            <p id="count">To-Do Count: {todos.length}</p>

            <ul id="to-do-list">
                <li className="input-to-do">
                    <input
                        id="new-to-do"
                        type="text"
                        placeholder="add to-do item here"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />

                    {!showDateInput && (
                        <button
                            type="button"
                            className="add-to-calendar"
                            onClick={() => setShowDateInput(!showDateInput)}
                        >
                            {date ? "change date" : "add date"}
                        </button>
                    )}

                    <input
                        id="date-input"
                        className={showDateInput ? "" : "hidden"}
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <button
                        type="button"
                        className={
                            showDateInput ? "add-to-do hidden" : "add-to-do"
                        }
                        disabled={!input.trim()}
                        onClick={handleAddTodo}
                    >
                        add to-do
                    </button>

                    {showDateInput && (
                        <button
                            type="button"
                            className="confirm-date"
                            onClick={() => setShowDateInput(false)}
                        >
                            confirm
                        </button>
                    )}

                    {showDateInput && (
                        <button
                            type="button"
                            className="cancel"
                            onClick={() => {
                                setShowDateInput(false);
                                setDate("");
                            }}
                        >
                            cancel
                        </button>
                    )}
                </li>

                <hr />

                {todos.map((todo, index) => (
                    <TodoItem
                        key={index}
                        todo={todo}
                        onEdit={(newText, newDate) => {
                            const updated = [...todos];
                            updated[index] = {
                                ...todo,
                                text: newText,
                                date: newDate,
                            };
                            setTodos(updated);
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}
