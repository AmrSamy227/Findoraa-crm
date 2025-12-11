const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let currentFilter = "all";
let lastHash = "";

function getNotifications() {
  try {
    return JSON.parse(localStorage.getItem("notificationsData")) || [];
  } catch {
    return [];
  }
}

function saveNotifications(list) {
  localStorage.setItem("notificationsData", JSON.stringify(list));
}

function iconFor(type) {
  const m = {
    project: "📁",
    unit: "🏠",
    deal: "💼",
    agent: "👤",
    sell: "✅",
    pending: "⏳",
    available: "✨",
  };
  return m[type] || "🔔";
}

function timeAgo(ts) {
  const d = new Date(ts);
  const now = new Date();
  const diff = now - d;
  const mins = Math.floor(diff / 60000);
  const hrs = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hrs < 24) return `${hrs}h ago`;
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString();
}

function render() {
  const all = getNotifications().sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const unread = all.filter((n) => !n.read).length;
  $("#unreadCount").textContent = unread;

  const counter = $(".notification-counter");
  if (counter) {
    if (unread > 0) {
      counter.textContent = unread;
      counter.style.display = "block";
    } else {
      counter.style.display = "none";
    }
  }

  const filtered =
    currentFilter === "all"
      ? all
      : all.filter((n) => String(n.type) === String(currentFilter));

  const container = $("#notificationsList");
  if (!filtered.length) {
    container.innerHTML = `
      <div class="empty-state">
        <i class="fas fa-bell-slash"></i>
        <div class="fw-bold mb-1">No notifications</div>
        <div class="small muted">Try another filter.</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered
    .map((n) => {
      const agent = n.agentName
        ? `<span class="meta-agent">• Agent: ${n.agentName}</span>`
        : "";
      return `
        <div class="notif-card ${n.read ? "" : "unread"}" data-id="${n.id}">
          <div class="notif-icon">${iconFor(n.type)}</div>
          <div class="notif-body">
            <div class="notif-title">${n.title || "Notification"}</div>
            <div class="notif-text">${n.text || ""} ${agent}</div>
            <div class="notif-meta">
              <span class="type-pill">${String(
                n.type || "info"
              ).toUpperCase()}</span>
              <span>${timeAgo(n.timestamp)}</span>
            </div>
          </div>
          <div class="notif-actions">
            <button class="action-btn mark-btn" title="Mark as read">
              ${n.read ? "✓✓" : "✓"}
            </button>
            <button class="action-btn del-btn" title="Delete">
              ✕
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  container.querySelectorAll(".notif-card").forEach((card) => {
    const id = card.dataset.id;
    card
      .querySelector(".mark-btn")
      .addEventListener("click", () => markRead(id));
    card.querySelector(".del-btn").addEventListener("click", () => delOne(id));
    card.addEventListener("click", (e) => {
      if (e.target.closest(".notif-actions")) return;
      markRead(id);
    });
  });

  const hash = JSON.stringify({ currentFilter, unread, len: all.length });
  lastHash = hash;
}

function markRead(id) {
  const list = getNotifications();
  const n = list.find((x) => x.id === id);
  if (!n || n.read) return;
  n.read = true;
  saveNotifications(list);
  render();
}

function delOne(id) {
  const list = getNotifications().filter((x) => x.id !== id);
  saveNotifications(list);
  render();
}

function markAllRead() {
  const list = getNotifications();
  let changed = false;
  list.forEach((n) => {
    if (!n.read) {
      n.read = true;
      changed = true;
    }
  });
  if (changed) saveNotifications(list);
  render();
}

function clearAll() {
  const ok = confirm("Clear all notifications?");
  if (!ok) return;
  saveNotifications([]);
  render();
}

function setFilter(type, btn) {
  currentFilter = type;
  $$(".filter-chip").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  render();
}

document.addEventListener("DOMContentLoaded", () => {
  $$(".filter-chip").forEach((btn) => {
    btn.addEventListener("click", () => setFilter(btn.dataset.filter, btn));
  });

  $("#markAllBtn").addEventListener("click", markAllRead);
  $("#clearAllBtn").addEventListener("click", clearAll);

  render();
});

window.addEventListener("storage", render);

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) render();
});
