import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function CalendarPage({ todos, assignments = [], courses }) {
    const [holidayEvents, setHolidayEvents] = useState([]);
    const [loadedHolidayYears, setLoadedHolidayYears] = useState([]);

    // Add events to calendar
    const todoEvents = todos
        .filter((todo) => todo.date)
        .map((todo) => ({
            title: todo.text,
            start: todo.date,
            allDay: true,
            color: "#97acc4",
        }));

    // Get color corresponding to an assignment's course
    function getCourseColor(assignment) {
        const courseObj = courses.find((c) => c.name === assignment.course);
        return courseObj ? courseObj.color : undefined;
    }

    // Add assignments to calendar
    const assignmentEvents = assignments.map((assignment) => ({
        title: assignment.name,
        start: assignment.posted,
        end: assignment.due,
        allDay: true,
        color: getCourseColor(assignment),
        display: "background",
    }));

    const fetchHolidayAPI = (year) => {
        if (loadedHolidayYears.includes(year)) return;

        fetch(`https://date.nager.at/api/v3/PublicHolidays/${year}/US`)
            .then((res) => res.json())
            .then((holidays) => {
                const events = [];
                let goodFridayPrinted = false;
                let christmasPrinted = false;

                holidays.forEach((holiday) => {
                    if (holiday.localName === "Good Friday") {
                        if (!goodFridayPrinted) {
                            events.push({
                                title: holiday.localName,
                                start: holiday.date,
                                color: "#dc9d93",
                            });
                            goodFridayPrinted = true;
                        }
                    } else if (holiday.localName === "Christmas") {
                        if (!christmasPrinted) {
                            events.push({
                                title: holiday.localName,
                                start: holiday.date,
                                color: "#dc9d93",
                            });
                            christmasPrinted = true;
                        }
                    } else {
                        events.push({
                            title: holiday.localName,
                            start: holiday.date,
                            color: "#dc9d93",
                        });
                    }
                });

                setHolidayEvents((prev) => [
                    ...prev,
                    ...events.filter(
                        (event) =>
                            !prev.some(
                                (e) =>
                                    e.title === event.title &&
                                    e.start === event.start
                            )
                    ),
                ]);
                setLoadedHolidayYears((prev) => [...prev, year]);
            })
            .catch((err) => console.error("Error fetching holidays:", err));
    };

    return (
        <div id="calendar-page">
            <h2>Calendar</h2>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                events={[...todoEvents, ...assignmentEvents, ...holidayEvents]}
                datesSet={(info) => {
                    const year = info.view.currentStart.getFullYear();
                    fetchHolidayAPI(year);
                }}
            />
        </div>
    );
}
