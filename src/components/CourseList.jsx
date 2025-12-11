import React, { useState } from "react";

export default function CourseList({ courses, setCourses }) {
    const [input, setInput] = useState("");

    const handleAddCourse = () => {
        const trimmed = input.trim();
        if (trimmed && !courses.includes(trimmed)) {
            setCourses([...courses, trimmed]);
            setInput("");
        }
    };

    const handleRemoveCourse = (course) => {
        setCourses(courses.filter((c) => c !== course));
    };

    return (
        <div class="course-list-section">
            <h3>Courses</h3>
            <input
                type="text"
                placeholder="Add course name"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddCourse()}
            />
            <button
                class="assignment-btn"
                disabled={!input.trim()}
                onClick={handleAddCourse}
            >
                Add
            </button>
            <ul>
                {courses.map((course, idx) => (
                    <li key={idx}>
                        {course}
                        <button
                            class="assignment-btn"
                            onClick={() => handleRemoveCourse(course)}
                            style={{ marginLeft: "1em" }}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
