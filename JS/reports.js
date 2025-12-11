function fitTextToContainer(el, minPx) {
  if (!el) return;
  const style = window.getComputedStyle(el);
  let size = parseFloat(style.fontSize);   
  const min = minPx || 10;                 

  while (el.scrollWidth > el.clientWidth && size > min) {
    size -= 1;
    el.style.fontSize = size + "px";
  }
}

const $ = (s) => document.querySelector(s);

const EMPLOYEES_STORAGE_KEY = "employeesData";

function getProjectsData() {
  try {
    return JSON.parse(localStorage.getItem("projectsData")) || [];
  } catch {
    return [];
  }
}

function getAgentsData() {
  try {
    const all = JSON.parse(localStorage.getItem(EMPLOYEES_STORAGE_KEY)) || [];
    return all.filter((e) =>
      String(e.role || "")
        .toLowerCase()
        .includes("agent")
    );
  } catch {
    return [];
  }
}

function normalizeStatus(status) {
  return String(status || "available")
    .trim()
    .toLowerCase();
}

function parsePrice(value) {
  if (value == null) return 0;
  const cleaned = String(value).replace(/[^\d.]/g, "");
  const num = parseFloat(cleaned);
  return Number.isFinite(num) ? num : 0;
}

const formatCurrency = (v) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EGP",
    minimumFractionDigits: 0,
  }).format(v || 0);

function calculateMetrics(projects) {
  const metrics = {
    totalProjects: projects.length,
    totalUnits: 0,
    unitsSold: 0,
    unitsAvailable: 0,
    unitsPending: 0,
    totalRevenue: 0,
  };

  projects.forEach((p) => {
    const units = Array.isArray(p.units) ? p.units : [];
    units.forEach((u) => {
      metrics.totalUnits++;
      const st = normalizeStatus(u.status);
      const price = parsePrice(u.price);

      if (st === "sold") {
        metrics.unitsSold++;
        metrics.totalRevenue += price;
      } else if (st === "pending") {
        metrics.unitsPending++;
      } else {
        metrics.unitsAvailable++;
      }
    });
  });

  return metrics;
}

function buildScopeOptions(projects) {
  const scope = $("#projectScope");
  scope.innerHTML = `<option value="all" selected>All Projects</option>`;
  projects.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = String(p.id);
    opt.textContent = p.name || "Project";
    scope.appendChild(opt);
  });
}

function applyScopes(projects) {
  const projectScope = $("#projectScope").value;
  let filtered = projects;

  if (projectScope !== "all") {
    filtered = filtered.filter((p) => String(p.id) === String(projectScope));
  }

  const periodScope = $("#periodScope").value;
  if (periodScope !== "all") {
    const days = parseInt(periodScope, 10);
    const from = Date.now() - days * 24 * 60 * 60 * 1000;

    filtered = filtered.map((p) => {
      const units = (p.units || []).filter((u) => {
        const ts = u.updatedAt || u.timestamp || u.soldAt;
        if (!ts) return true;
        const t = new Date(ts).getTime();
        return Number.isFinite(t) ? t >= from : true;
      });
      return { ...p, units };
    });
  }

  return filtered;
}

function renderReports() {
  const allProjects = getProjectsData();
  const projects = applyScopes(allProjects);
  const agents = getAgentsData();
  const metrics = calculateMetrics(projects);

  $("#totalProjects").textContent = metrics.totalProjects;
  $("#totalUnits").textContent = metrics.totalUnits;
  $("#unitsSold").textContent = metrics.unitsSold;
  $("#unitsAvailable").textContent = metrics.unitsAvailable;
  $("#unitsPending").textContent = metrics.unitsPending;
  $("#totalRevenue").textContent = formatCurrency(metrics.totalRevenue);
  $("#totalRevenue").textContent = formatCurrency(metrics.totalRevenue);

  const revEl = document.getElementById("totalRevenue");
  if (revEl) {
    revEl.style.fontSize =
      revEl.textContent.length > 14 ? "clamp(0.9rem, 3.2vw, 1.15rem)" : "";
  }

  const projectsBody = $("#projectsTableBody");
  projectsBody.innerHTML = "";

  if (!projects.length) {
    projectsBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-4">No projects found.</td>
      </tr>`;
  } else {
    projects.forEach((p) => {
      const units = Array.isArray(p.units) ? p.units : [];
      const sold = units.filter(
        (u) => normalizeStatus(u.status) === "sold"
      ).length;
      const pending = units.filter(
        (u) => normalizeStatus(u.status) === "pending"
      ).length;
      const available = units.length - sold - pending;

      projectsBody.innerHTML += `
        <tr>
          <td>${p.name || "-"}</td>
          <td>${p.location || p.city || "-"}</td>
          <td class="text-end">${units.length}</td>
          <td class="text-end positive">${sold}</td>
          <td class="text-end">${available}</td>
          <td class="text-end warning">${pending}</td>
        </tr>`;
    });
  }

  const agentsBody = $("#agentsTableBody");
  agentsBody.innerHTML = "";

  if (!agents.length) {
    agentsBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-4">No agents found.</td>
      </tr>`;
  } else {
    agents
      .sort((a, b) => (b.deals || 0) - (a.deals || 0))
      .forEach((a) => {
        const dealsClosed = Number(a.deals || 0);
        const revenue = Number(a.revenue || 0);
        const commissionRate = Number(a.commissionRate || 3.5);
        const commissionBase = revenue > 0 ? revenue : dealsClosed * 85000;
        const estimatedCommissionValue =
          (commissionBase * commissionRate) / 100;
        const st = normalizeStatus(a.status);

        const badgeClass =
          st === "active"
            ? "bg-success"
            : st === "on leave"
            ? "bg-warning text-dark"
            : "bg-danger";

        agentsBody.innerHTML += `
          <tr>
            <td>${a.name || "-"}</td>
            <td><span class="badge badge-status ${badgeClass}">${
          a.status || "Active"
        }</span></td>
            <td class="text-end">${dealsClosed}</td>
            <td class="text-end">${commissionRate}%</td>
            <td class="text-end positive">${formatCurrency(
              estimatedCommissionValue
            )}</td>
          </tr>`;
      });
  }

  const unitsBody = $("#unitsTableBody");
  unitsBody.innerHTML = "";
  let anyUnits = false;

  projects.forEach((p) => {
    const units = Array.isArray(p.units) ? p.units : [];
    units.forEach((u) => {
      anyUnits = true;
      const st = normalizeStatus(u.status);

      const badgeClass =
        st === "sold"
          ? "bg-danger"
          : st === "pending"
          ? "bg-warning text-dark"
          : "bg-success";

      unitsBody.innerHTML += `
        <tr>
          <td>${p.name || "-"}</td>
          <td>${u.name || "-"}</td>
          <td>${u.type || "-"}</td>
          <td class="text-end">${u.price || "-"}</td>
          <td><span class="badge badge-status ${badgeClass}">${
        u.status || "Available"
      }</span></td>
          <td>${u.payment || "-"}</td>
        </tr>`;
    });
  });

  if (!anyUnits) {
    unitsBody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-4">No units found.</td>
      </tr>`;
  }

  $("#projectSummaryHint").textContent =
    $("#projectScope").value === "all"
      ? "Showing all projects"
      : "Filtered by selected project";

  $("#unitsBreakdownHint").textContent =
    $("#periodScope").value === "all"
      ? "All units across time"
      : `Filtered by last ${$("#periodScope").value} days`;
}

function updateNotificationCounter() {
  const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
  const unreadCount = notifs.filter((n) => !n.read).length;
  const counter = document.querySelector(".notification-counter");
  if (!counter) return;
  if (unreadCount > 0) {
    counter.textContent = unreadCount;
    counter.style.display = "inline-block";
  } else {
    counter.style.display = "none";
  }
}

function exportPDF() {
  window.print();
}

document.addEventListener("DOMContentLoaded", () => {
  const projects = getProjectsData();
  buildScopeOptions(projects);

  $("#projectScope").addEventListener("change", renderReports);
  $("#periodScope").addEventListener("change", renderReports);
  $("#exportBtn").addEventListener("click", exportPDF);

  renderReports();
  updateNotificationCounter();
});

window.addEventListener("storage", () => {
  renderReports();
  updateNotificationCounter();
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) renderReports();
});

