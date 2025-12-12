import React, { useState } from "react";

export default function CourseList({ courses, setCourses }) {
    const [input, setInput] = useState("");
    const [color, setColor] = useState("#a168f7");

    const handleAddCourse = () => {
        const trimmed = input.trim();
        if (trimmed && !courses.some((c) => c.name === trimmed)) {
            setCourses([...courses, { name: trimmed, color }]);
            setInput("");
            setColor("#a168f7");
        }
    };

    const handleRemoveCourse = (name) => {
        setCourses(courses.filter((c) => c.name !== name));
    };

    const handleColorChange = (name, newColor) => {
        setCourses(
            courses.map((c) =>
                c.name === name ? { ...c, color: newColor } : c
            )
        );
    };

    return (
        // Add course logic
        <div className="course-list-section">
            <h3>Courses</h3>
            <div className="course-input-row">
                <input
                    type="text"
                    placeholder="Add course name here"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddCourse()}
                    className="course-input"
                />
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="course-color-picker"
                />
                <button
                    className="assignment-btn"
                    disabled={!input.trim()}
                    onClick={handleAddCourse}
                >
                    Add Course
                </button>

                <ul className="course-list">
                    {courses.map((course, idx) => (
                        <li key={idx} className="course-list-item">
                            <span className="course-name">{course.name}</span>
                            <input
                                type="color"
                                value={course.color}
                                onChange={(e) =>
                                    handleColorChange(
                                        course.name,
                                        e.target.value
                                    )
                                }
                                className="course-color-picker"
                            />
                            <button
                                className="assignment-btn"
                                onClick={() => handleRemoveCourse(course.name)}
                            >
                                Remove Course
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
