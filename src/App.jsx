import React, { useState } from "react";
import TodoPage from "./components/TodoPage";
import CalendarPage from "./components/CalendarPage";
import "./styles.css";

function App() {
    const [activeTab, setActiveTab] = useState("todo");
    const [todos, setTodos] = useState([]);

    return (
        <>
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
                    <TodoPage todos={todos} setTodos={setTodos} />
                ) : (
                    <CalendarPage todos={todos} />
                )}
            </main>
        </>
    );
}

export default App;
