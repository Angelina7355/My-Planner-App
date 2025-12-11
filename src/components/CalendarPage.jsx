import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

function CalendarPage({ todos }) {
    const [holidayEvents, setHolidayEvents] = useState([]);
    const [loadedHolidayYears, setLoadedHolidayYears] = useState([]);

    const todoEvents = todos
        .filter((todo) => todo.date)
        .map((todo) => ({
            title: todo.text,
            start: todo.date,
            allDay: true,
            color: "#97acc4",
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
                events={[...todoEvents, ...holidayEvents]}
                datesSet={(info) => {
                    const year = info.view.currentStart.getFullYear();
                    fetchHolidayAPI(year);
                }}
            />
        </div>
    );
}

export default CalendarPage;
