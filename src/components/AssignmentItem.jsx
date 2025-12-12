import React, { useState } from "react";

function formatDate(dateStr) {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${month}/${day}/${year}`;
}

export default function AssignmentItem({ assignment, courses, onEdit }) {
    const [editing, setEditing] = useState(false);
    const [editName, setEditName] = useState(assignment.name);
    const [editPosted, setEditPosted] = useState(assignment.posted);
    const [editDue, setEditDue] = useState(assignment.due);
    const [editCourse, setEditCourse] = useState(assignment.course);

    function getCourseColor(courseName) {
        const courseObj = courses.find((c) => c.name === courseName);
        return courseObj ? courseObj.color : "#97c4b6";
    }

    const handleSave = () => {
        onEdit({
            ...assignment,
            name: editName,
            posted: editPosted,
            due: editDue,
            course: editCourse,
        });
        setEditing(false);
    };

    if (editing) {
        return (
            <li className="items editing">
                <div className="assignment-edit-row">
                    <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editPosted}
                        onChange={(e) => setEditPosted(e.target.value)}
                    />
                    <input
                        type="date"
                        value={editDue}
                        onChange={(e) => setEditDue(e.target.value)}
                    />
                    <select
                        value={editCourse}
                        onChange={(e) => setEditCourse(e.target.value)}
                    >
                        <option value="">Select Course</option>
                        {courses.map((course, idx) => (
                            <option key={idx} value={course.name}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => setEditing(false)}>Cancel</button>
                </div>
            </li>
        );
    }

    return (
        <>
            <li className="items assignment-list-item">
                <div className="assignment-info">
                    <span>
                        {assignment.name}
                        {assignment.course && (
                            <span
                                style={{
                                    color: getCourseColor(assignment.course),
                                }}
                            >
                                {` (${assignment.course})`}
                            </span>
                        )}
                        :
                    </span>
                    <span className="date">
                        {formatDate(assignment.posted)} →{" "}
                        {formatDate(assignment.due)}
                    </span>
                </div>

                <button
                    className="edit-assignment-btn"
                    onClick={() => setEditing(true)}
                >
                    Edit
                </button>
            </li>
            <hr />
        </>
    );
}
