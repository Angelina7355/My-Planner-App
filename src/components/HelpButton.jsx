import React, { useState } from "react";

export default function HelpButton() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="help-button-container"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <button className="help-button">?</button>
            {hovered && (
                <div className="help-popup">
                    Welcome to My Planner! Use the tabs above to switch between
                    your To-Do list, Assignments, and Calendar. Try color coding 
                    your assignments by their course title! Add your tasks
                    and assignments, and see them organized in your Calendar!
                </div>
            )}
        </div>
    );
}
