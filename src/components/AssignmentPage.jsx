import React, { useState } from "react";

export default function AssignmentPage({ assignments, setAssignments }) {
    const [name, setName] = useState("");
    const [posted, setPosted] = useState("");
    const [due, setDue] = useState("");

    const handleAdd = () => {
        if (!name || !posted || !due) return;
        setAssignments([...assignments, { name, posted, due }]);
        setName("");
        setPosted("");
        setDue("");
    };

    return (
        <div id="assignment-page">
            <h2>Assignments</h2>
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
            <button onClick={handleAdd}>Add Assignment</button>
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
