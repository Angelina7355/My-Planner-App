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
            { id: Date.now(), name, posted, due, course: selectedCourse },
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
                min={posted || undefined} // Prevents selecting a due date before posted
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
                disabled={
                    !name.trim() ||
                    !posted.trim() ||
                    !due.trim() ||
                    (posted && due && due < posted) // Ensure due date comes after posted date
                }
                onClick={handleAssignmentAdd}
            >
                Add Assignment
            </button>
            <hr />

            <ul>
                {assignments.map((a) => (
                    <AssignmentItem
                        key={a.id}
                        assignment={a}
                        courses={courses}
                        onEdit={(updatedAssignment) => {
                            setAssignments(
                                assignments.map((item) =>
                                    item.id === a.id ? updatedAssignment : item
                                )
                            );
                        }}
                        onDelete={() =>
                            setAssignments(
                                assignments.filter((item) => item.id !== a.id)
                            )
                        }
                    />
                ))}
            </ul>
        </div>
    );
}
