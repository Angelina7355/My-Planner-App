import React, { useState } from "react";
import CourseList from "./CourseList";
import AssignmentItem from "./AssignmentItem";

export default function AssignmentPage({
    assignments,
    setAssignments,
    courses,
    setCourses,
}) {
    const [name, setName] = useState("");
    const [posted, setPosted] = useState("");
    const [due, setDue] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [showCourseList, setShowCourseList] = useState(false);

    const handleAssignmentAdd = () => {
        if (!name || !posted || !due) return;
        setAssignments([
            ...assignments,
            { name, posted, due, course: selectedCourse },
        ]);
        setName("");
        setPosted("");
        setDue("");
        setSelectedCourse("");
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
                className="assignment"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
            >
                <option value="">Select Course</option>
                {courses.map((course, idx) => (
                    <option key={idx} value={course.name}>
                        {course.name}
                    </option>
                ))}
            </select>

            <button
                className="add-assignment"
                disabled={!name.trim() || !posted.trim() || !due.trim()}
                onClick={handleAssignmentAdd}
            >
                Add Assignment
            </button>
            <hr />

            <ul>
                {assignments.map((a, i) => (
                    <AssignmentItem
                        key={i}
                        assignment={a}
                        courses={courses}
                        onEdit={(updatedAssignment) => {
                            const updated = [...assignments];
                            updated[i] = updatedAssignment;
                            setAssignments(updated);
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}
