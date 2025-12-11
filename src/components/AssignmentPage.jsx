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
            <button onClick={() => setShowCourseList(!showCourseList)}>
                {showCourseList ? "Hide Courses" : "View Courses"}
            </button>

            {showCourseList && (
                <CourseList courses={courses} setCourses={setCourses} />
            )}

            <input
                placeholder="Assignment Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="date"
                value={posted}
                onChange={(e) => setPosted(e.target.value)}
            />
            <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
            />

            <select
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

            <button onClick={handleAssignmentAdd}>Add Assignment</button>
            <ul>
                {assignments.map((a, i) => (
                    <li key={i}>
                        {a.name}: {a.posted} → {a.due}
                    </li>
                ))}
            </ul>
        </div>
    );
}
