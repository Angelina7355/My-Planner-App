import React, { useState } from "react";
import CourseList from "./CourseList";

export default function AssignmentPage({ assignments, setAssignments }) {
    const [name, setName] = useState("");
    const [posted, setPosted] = useState("");
    const [due, setDue] = useState("");
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState("");
    const [showCourseList, setShowCourseList] = useState(false);

    const handleAssignmentAdd = () => {
        if (!name || !posted || !due) return;
        setAssignments([...assignments, { name, posted, due }]);
        setName("");
        setPosted("");
        setDue("");
    };

    return (
        <div id="assignment-page">
            <h2>Assignments</h2>
            <p id="count">Assignment Count: {assignments.length}</p>

            <button
                id="course-list-button"
                onClick={() => setShowCourseList(!showCourseList)}
            >
                {showCourseList ? "Hide Courses" : "View Courses"}
            </button>

            {showCourseList && (
                <CourseList courses={courses} setCourses={setCourses} />
            )}

            <input
                placeholder="Add assignment here"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <span>Date Assigned:</span>
            <input
                type="date"
                value={posted}
                onChange={(e) => setPosted(e.target.value)}
            />
            <span>Due:</span>
            <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
            />

            <select
                class="assignment"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
            >
                <option value="">Select Course</option>
                {courses.map((course, idx) => (
                    <option key={idx} value={course}>
                        {course}
                    </option>
                ))}
            </select>

            <button
                class="add-assignment"
                disabled={!name.trim()}
                onClick={handleAssignmentAdd}
            >
                Add Assignment
            </button>
            <hr />
            <ul>
                {assignments.map((a, i) => (
                    <>
                        <li key={i}>
                            {a.name}: {a.posted} → {a.due}
                        </li>
                        <hr />
                    </>
                ))}
            </ul>
        </div>
    );
}
