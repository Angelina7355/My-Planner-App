import React, { useState } from "react";
import TodoPage from "./components/TodoPage";
import AssignmentPage from "./components/AssignmentPage";
import CalendarPage from "./components/CalendarPage";
import "./styles.css";

function App() {
    const [activeTab, setActiveTab] = useState("todo");
    const [todos, setTodos] = useState([]);
    const [assignments, setAssignments] = useState([]);

    const tabBackgrounds = {
        todo: "var(--to-do-background)",
        assignment: "var(--assignment-background)",
        calendar: "var(--calendar-background)",
    };

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
                        id="assignment-tab"
                        onClick={() => setActiveTab("assignment")}
                    >
                        Assignments
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
                        tabBackgrounds[activeTab] || "var(--to-do-background)",
                }}
            >
                {activeTab === "todo" && (
                    <TodoPage todos={todos} setTodos={setTodos} />
                )}

                {activeTab === "assignment" && (
                    <AssignmentPage
                        assignments={assignments}
                        setAssignments={setAssignments}
                    />
                )}

                {activeTab === "calendar" && (
                    <CalendarPage todos={todos} assignments={assignments} />
                )}
            </main>
        </>
    );
}

export default App;
