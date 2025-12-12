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
                    <p>Welcome to My Planner!</p>
                    <br />

                    <p>
                        Use the tabs above to switch between your To-Do list,
                        Assignments, and Calendar. Try adding, editing, or
                        deleting your to-dos and assignments in their
                        corresponding tabs, and color-code your assignments by
                        their course title with custom colors!{" "}
                    </p>
                    <br />

                    <p>
                        Enjoy seeing the satisfying results organized nicely in
                        the calendar tab!
                    </p>
                </div>
            )}
        </div>
    );
}
