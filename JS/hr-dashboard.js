const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

const EMPLOYEES_STORAGE_KEY = "employeesData";
const INITIAL_EMPLOYEES = [
  { id: 1, name: "Ahmed Hassan", role: "Senior Agent", team: "Residential", status: "Active", deals: 0, revenue: 0 },
  { id: 2, name: "Fatima Ahmed", role: "Agent", team: "Residential", status: "Active", deals: 0, revenue: 0 },
  { id: 3, name: "Mohammed Ali", role: "Junior Agent", team: "Commercial", status: "Active", deals: 0, revenue: 0 },
  { id: 4, name: "Layla Saleh", role: "Senior Agent", team: "Commercial", status: "Active", deals: 0, revenue: 0 },
  { id: 5, name: "Karim Ibrahim", role: "Agent", team: "Residential", status: "On Leave", deals: 0, revenue: 0 }
];

function updateNotificationCounter() {
  const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
  const unread = notifs.filter((n) => !n.read).length;
  const counters = document.querySelectorAll(".notification-counter");

  if (!counters.length) return;

  counters.forEach((counter) => {
    if (unread > 0) {
      counter.textContent = unread;
      counter.style.display = "inline-flex"; // أو "inline-block" لو حابب
    } else {
      counter.style.display = "none";
    }
  });
}

document.addEventListener("DOMContentLoaded", updateNotificationCounter);
window.addEventListener("storage", updateNotificationCounter);

const loadEmployees = () => {
  const saved = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
  if (!saved) return [...INITIAL_EMPLOYEES];
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error("Error loading employees:", e);
    return [...INITIAL_EMPLOYEES];
  }
};

const saveEmployees = (list) =>
  localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(list));

let employees = loadEmployees();

const tbody = $("#employeeTbody"),
  leaderboardTbody = $("#leaderboardTbody"),
  topPerformersContainer = $("#topPerformersContainer"),
  totalEmployeesKpi = $("#totalEmployeesKpi"),
  totalDealsKpi = $("#totalDealsKpi"),
  totalRevenueKpi = $("#totalRevenueKpi"),
  activeEmployeesKpi = $("#activeEmployeesKpi"),
  searchInput = $("#searchInput"),
  roleFilter = $("#roleFilter"),
  statusFilter = $("#statusFilter"),
  resetDealsBtn = $("#resetDealsBtn");

const addEmployeeModal = new bootstrap.Modal($("#addEmployeeModal"));
const employeeIdInput = $("#employeeId"),
  employeeNameInput = $("#employeeName"),
  employeeRoleInput = $("#employeeRole"),
  employeeTeamInput = $("#employeeTeam"),
  employeeStatusInput = $("#employeeStatus"),
  saveEmployeeBtn = $("#saveEmployeeBtn"),
  modalTitle = $("#modalTitle");

const statusBadge = (s) =>
  s === "Active"
    ? '<span class="badge bg-success">Active</span>'
    : s === "On Leave"
    ? '<span class="badge bg-warning text-dark">On Leave</span>'
    : '<span class="badge bg-secondary">Inactive</span>';

const formatCurrency = (v) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(v || 0);

  const revEl = document.getElementById("totalRevenueKpi");
if (revEl) {
  revEl.classList.toggle("long", revEl.textContent.length > 14);
}


const updateKpis = () => {
  totalEmployeesKpi.textContent = employees.length;
  activeEmployeesKpi.textContent = employees.filter((e) => e.status === "Active").length;
  totalDealsKpi.textContent = employees.reduce((s, e) => s + (e.deals || 0), 0);
  totalRevenueKpi.textContent = formatCurrency(employees.reduce((s, e) => s + (e.revenue || 0), 0));
};

const renderEmployees = (list = employees) => {
  tbody.innerHTML = "";
  if (!list.length) {
    tbody.innerHTML =
      '<tr class="empty-row"><td colspan="7" class="text-center py-4">No employees found.</td></tr>';
    updateKpis();
    return;
  }

  list.forEach((emp) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.id}</td>
      <td><strong>${emp.name}</strong></td>
      <td>${emp.role}</td>
      <td>${emp.team}</td>
      <td>${statusBadge(emp.status)}</td>
      <td class="text-end">${formatCurrency(emp.revenue || 0)}</td>
      <td class="text-end">
        <button class="btn btn-sm btn-info" onclick="editEmployee(${emp.id})" title="Edit"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-danger" onclick="deleteEmployee(${emp.id})" title="Delete"><i class="fas fa-trash"></i></button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  updateKpis();
};

const renderLeaderboard = () => {
  leaderboardTbody.innerHTML = "";
  const sorted = [...employees].sort((a, b) => (b.deals || 0) - (a.deals || 0));

  if (!sorted.length) {
    leaderboardTbody.innerHTML =
      '<tr class="empty-row"><td colspan="4" class="text-center py-4">No employees found.</td></tr>';
    return;
  }

  sorted.forEach((emp, idx) => {
    const tr = document.createElement("tr");
    tr.className = idx === 0 ? "rank-1" : idx === 1 ? "rank-2" : idx === 2 ? "rank-3" : "";
    const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : "";

    tr.innerHTML = `
      <td>${medal}</td>
      <td><strong>${emp.name}</strong> <span class="text-secondary-muted small">${emp.role}</span></td>
      <td class="text-end"><strong style="color:var(--primary-gold);">${emp.deals || 0}</strong></td>
      <td class="text-end"><strong style="color:var(--primary-gold);">${formatCurrency(emp.revenue || 0)}</strong></td>
    `;
    leaderboardTbody.appendChild(tr);
  });
};

const renderTopPerformers = () => {
  const top = [...employees]
    .sort((a, b) => (b.revenue || 0) - (a.revenue || 0))
    .slice(0, 3);

  if (!top.length) {
    topPerformersContainer.innerHTML =
      '<p class="text-center mb-0 text-secondary-muted">No revenue data yet</p>';
    return;
  }

  topPerformersContainer.innerHTML = `
    <div class="d-flex flex-column gap-2">
      ${top
        .map(
          (emp, i) => `
          <div class="d-flex justify-content-between align-items-center p-2 rounded" style="background:var(--dark-bg)">
            <div>
              <div class="text-light"><strong>${i + 1}. ${emp.name}</strong></div>
              <div class="text-secondary-muted small">${emp.role}</div>
            </div>
            <div class="text-end">
              <div class="gold" style="font-size:1.2rem;font-weight:700">${formatCurrency(emp.revenue || 0)}</div>
              <div class="text-secondary-muted small">${emp.deals || 0} deals</div>
            </div>
          </div>`
        )
        .join("")}
    </div>
  `;
};

const applyFilters = () => {
  const q = searchInput.value.toLowerCase().trim(),
    role = roleFilter.value,
    status = statusFilter.value;

  renderEmployees(
    employees.filter((emp) => {
      const matchesQ =
        !q ||
        emp.name.toLowerCase().includes(q) ||
        emp.id.toString().includes(q) ||
        emp.role.toLowerCase().includes(q) ||
        emp.team.toLowerCase().includes(q);

      return matchesQ && (!role || emp.role === role) && (!status || emp.status === status);
    })
  );
};

window.addNewEmployee = () => {
  employeeIdInput.value = "";
  employeeNameInput.value = "";
  employeeRoleInput.value = "";
  employeeTeamInput.value = "";
  employeeStatusInput.value = "";
  modalTitle.textContent = "Add New Employee";
  addEmployeeModal.show();
};

window.editEmployee = (id) => {
  const emp = employees.find((e) => e.id === id);
  if (!emp) return;

  employeeIdInput.value = emp.id;
  employeeNameInput.value = emp.name;
  employeeRoleInput.value = emp.role;
  employeeTeamInput.value = emp.team;
  employeeStatusInput.value = emp.status;
  modalTitle.textContent = "Edit Employee";
  addEmployeeModal.show();
};

window.deleteEmployee = (id) => {
  if (!confirm("Are you sure you want to delete this employee?")) return;

  const emp = employees.find((e) => e.id === id);
  const empName = emp?.name || "Agent";

  employees = employees.filter((e) => e.id !== id);
  saveEmployees(employees);

  addNotificationWithAgent(
    "agent",
    `Agent Removed: ${empName}`,
    `${empName} (${emp?.role}) has been removed from the system.`,
    empName,
    id
  );

  renderEmployees();
  renderLeaderboard();
  renderTopPerformers();
};

saveEmployeeBtn.addEventListener("click", () => {
  const id = employeeIdInput.value,
    name = employeeNameInput.value.trim(),
    role = employeeRoleInput.value,
    team = employeeTeamInput.value,
    status = employeeStatusInput.value;

  if (!name || !role || !team || !status) return alert("Please fill in all fields");

  if (id) {
    const emp = employees.find((e) => e.id == id);
    const oldStatus = emp?.status;

    if (emp) {
      emp.name = name;
      emp.role = role;
      emp.team = team;
      emp.status = status;

      if (oldStatus !== status) {
        const msg =
          status === "On Leave"
            ? "is now on leave."
            : status === "Inactive"
            ? "status changed to Inactive."
            : "is now Active.";

        addNotificationWithAgent("agent", `Agent ${status}: ${name}`, `${name} ${msg}`, name, id);
      }
    }
  } else {
    const newId = Math.max(...employees.map((e) => e.id), 0) + 1;
    employees.push({ id: newId, name, role, team, status, deals: 0, revenue: 0 });

    addNotificationWithAgent(
      "agent",
      `Agent Added: ${name}`,
      `${name} joined as ${role} in ${team} team. Status: ${status}`,
      name,
      newId
    );
  }

  saveEmployees(employees);
  renderEmployees();
  renderLeaderboard();
  renderTopPerformers();
  addEmployeeModal.hide();
});

resetDealsBtn.addEventListener("click", () => {
  if (!confirm("Reset all agent deal counts and revenue to 0? This cannot be undone.")) return;

  employees = employees.map((e) => ({ ...e, deals: 0, revenue: 0 }));
  saveEmployees(employees);

  renderLeaderboard();
  renderTopPerformers();
  updateKpis();
});

searchInput.addEventListener("input", applyFilters);
roleFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

const addNotificationWithAgent = (type, title, text, agentName, agentId) => {
  const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
  notifs.push({
    id: crypto.randomUUID(),
    type,
    title,
    text,
    agentName,
    agentId,
    timestamp: new Date().toISOString(),
    read: false
  });
  localStorage.setItem("notificationsData", JSON.stringify(notifs));
};

renderEmployees();
renderLeaderboard();
renderTopPerformers();

