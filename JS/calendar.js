const $ = (s) => document.querySelector(s);

let currentDate = new Date();

function getDealsData() {
    return JSON.parse(localStorage.getItem("dealsData")) || [];
}

function saveDealsData(deals) {
    localStorage.setItem("dealsData", JSON.stringify(deals));
    renderCalendar();
    renderUpcomingDeals();
    addNotification("Deal scheduled successfully!", "success");
}

function addNotification(message, type = "info") {
    const notif = {
        id: crypto.randomUUID(),
        type: "deal",
        title: "Deal Updated",
        text: message,
        timestamp: new Date().toISOString(),
        read: false,
    };

    const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
    notifs.unshift(notif);
    localStorage.setItem("notificationsData", JSON.stringify(notifs));
}

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const deals = getDealsData();

    $("#monthYear").textContent = firstDay.toLocaleString("default", {
        month: "long",
        year: "numeric",
    });

    const grid = $("#calendarGrid");

    grid.innerHTML =
        `<div class="day-header">Sun</div>
         <div class="day-header">Mon</div>
         <div class="day-header">Tue</div>
         <div class="day-header">Wed</div>
         <div class="day-header">Thu</div>
         <div class="day-header">Fri</div>
         <div class="day-header">Sat</div>`;

    // Previous month days
    for (let i = firstDay.getDay() - 1; i >= 0; i--) {
        const day = new Date(year, month, -i);
        grid.innerHTML += `<div class="day-cell other-month"><div class="day-number">${day.getDate()}</div></div>`;
    }

    // Current month days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(year, month, day);
        const isToday = date.toDateString() === new Date().toDateString();
        const dateStr = date.toISOString().split("T")[0];

        const dayDeals = deals.filter((d) => d.date === dateStr);

        let html = `<div class="day-cell ${isToday ? "today" : ""}">
                        <div class="day-number">${day}</div>`;

        dayDeals.forEach((d) => {
            html += `<div class="day-event" title="${d.title}">${d.type}</div>`;
        });

        html += `</div>`;

        grid.innerHTML += html;
    }

    // Next month days
    for (let day = 1; day < 7 - lastDay.getDay(); day++) {
        grid.innerHTML += `<div class="day-cell other-month"><div class="day-number">${day}</div></div>`;
    }
}

function renderUpcomingDeals() {
    const deals = getDealsData();
    const today = new Date().toISOString().split("T")[0];

    const upcoming = deals
        .filter((d) => d.date >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 6);

    const container = $("#upcomingDeals");
    container.innerHTML = "";

    if (upcoming.length === 0) {
        container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">No upcoming deals scheduled</div>`;
        return;
    }

    upcoming.forEach((deal) => {
        const dateObj = new Date(deal.date);

        const formattedDate = dateObj.toLocaleDateString("default", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });

        container.innerHTML += `
            <div class="deal-card">
                <div class="deal-date">📅 ${formattedDate} ${deal.time || ""}</div>
                <div class="deal-title">${deal.title}</div>
                <div class="deal-desc"><strong>Type:</strong> ${deal.type}</div>
                <div class="deal-desc"><strong>Agent:</strong> ${deal.agent || "-"}</div>
                <div class="deal-desc"><strong>Property:</strong> ${deal.property || "-"}</div>
                ${
                    deal.desc
                        ? `<div class="deal-desc" style="margin-top: 0.5rem;">${deal.desc}</div>`
                        : ""
                }
                <div class="deal-actions">
                    <button class="btn-sm-gold" onclick="deleteDeal('${deal.id}')">Delete</button>
                </div>
            </div>
        `;
    });
}

function scheduleDeal() {
    const title = $("#dealTitle").value.trim();
    const date = $("#dealDate").value;
    const time = $("#dealTime").value;
    const agent = $("#dealAgent").value.trim();
    const property = $("#dealProperty").value.trim();
    const type = $("#dealType").value;
    const desc = $("#dealDesc").value.trim();

    if (!title || !date) {
        alert("Please fill in title and date");
        return;
    }

    const deal = {
        id: crypto.randomUUID(),
        title,
        date,
        time,
        agent,
        property,
        type,
        desc,
    };

    const deals = getDealsData();
    deals.push(deal);

    saveDealsData(deals);

    // Clear fields
    $("#dealTitle").value = "";
    $("#dealDate").value = "";
    $("#dealTime").value = "";
    $("#dealAgent").value = "";
    $("#dealProperty").value = "";
    $("#dealDesc").value = "";
}

function deleteDeal(id) {
    if (!confirm("Delete this deal?")) return;

    const deals = getDealsData().filter((d) => d.id !== id);
    saveDealsData(deals);
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function todayMonth() {
    currentDate = new Date();
    renderCalendar();
}

function updateNotificationCounter() {
    const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
    const unreadCount = notifs.filter((n) => !n.read).length;

    const counter = document.querySelector(".notification-counter");

    if (counter) {
        if (unreadCount > 0) {
            counter.textContent = unreadCount;
            counter.style.display = "inline-block";
        } else {
            counter.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
    renderUpcomingDeals();
    updateNotificationCounter();
});

window.addEventListener("storage", () => {
    renderCalendar();
    renderUpcomingDeals();
    updateNotificationCounter();
});
