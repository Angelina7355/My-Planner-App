import React, { useState } from "react";
import ProfilePage from "./components/ProfilePage";
import TodoPage from "./components/TodoPage";
import AssignmentPage from "./components/AssignmentPage";
import CalendarPage from "./components/CalendarPage";
import HelpButton from "./components/HelpButton";

import "./styles.css";

function App() {
    const [activeTab, setActiveTab] = useState("todo");
    const [todos, setTodos] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [courses, setCourses] = useState([]);
    const [userName, setUserName] = useState("");

    const tabBackgrounds = {
        todo: "var(--to-do-background)",
        assignment: "var(--assignment-background)",
        calendar: "var(--calendar-background)",
    };

    return (
        <>
            <header>
                <span id="title">
                    <h1>{userName ? `${userName}'s Planner` : "My Planner"}</h1>
                </span>

                <nav>
                    <button
                        className="tab"
                        id="profile-tab"
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
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
                        tabBackgrounds[activeTab] ||
                        "var(--profile-background)",
                }}
            >
                {activeTab === "todo" && (
                    <TodoPage todos={todos} setTodos={setTodos} />
                )}

                {activeTab === "assignment" && (
                    <AssignmentPage
                        assignments={assignments}
                        setAssignments={setAssignments}
                        courses={courses}
                        setCourses={setCourses}
                    />
                )}

                {activeTab === "calendar" && (
                    <CalendarPage
                        todos={todos}
                        assignments={assignments}
                        courses={courses}
                    />
                )}
                {activeTab === "profile" && (
                    <ProfilePage
                        userName={userName}
                        setUserName={setUserName}
                    />
                )}
            </main>
            <HelpButton />
        </>
    );
}

export default App;
