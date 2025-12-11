import React, { useState } from "react";
import TodoList from "./components/TodoList";
import CalendarPage from "./components/CalendarPage";
import "./styles.css";

function App() {
    const [activeTab, setActiveTab] = useState("todo");
    const [todos, setTodos] = useState([]);

    return (
        <div>
            <header>
                <span id="title">
                    <h1>My Planner</h1>
                </span>

                <nav>
                    <button
                        className="tab"
                        id="to-do-tab"
                        onClick={() => setActiveTab("todo")}
                    >
                        To-Do's
                    </button>

                    <button
                        className="tab"
                        id="calendar-tab"
                        onClick={() => setActiveTab("calendar")}
                    >
                        Calendar
                    </button>
                </nav>
            </header>

            <main
                style={{
                    backgroundColor:
                        activeTab === "todo"
                            ? "var(--to-do-background)"
                            : "var(--calendar-background)",
                }}
            >
                {activeTab === "todo" ? (
                    <div id="to-do-page">
                        <TodoList todos={todos} setTodos={setTodos} />
                    </div>
                ) : (
                    <div id="calendar-page">
                        <CalendarPage todos={todos} />
                    </div>
                )}
            </main>
        </div>
    );
}

export default App;