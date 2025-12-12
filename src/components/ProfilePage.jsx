import React from "react";

export default function ProfilePage({ userName, setUserName }) {
    return (
        <div id="profile-page">
            <h2>Profile</h2>
            <label className="profile-label">
                Enter Your Name:
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </label>
        </div>
    );
}
