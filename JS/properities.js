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
document.addEventListener("DOMContentLoaded", updateNotificationCounter);
window.addEventListener("storage", updateNotificationCounter);

const $ = (s) => document.querySelector(s);

function qParam(name) {
  const p = new URLSearchParams(location.search);
  return p.get(name);
}

function getRole() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  return String(user.role || "").toLowerCase();
}
const isAdmin = () => getRole() === "admin";

function loadStoredProjectsOnly() {
  const raw = localStorage.getItem("projectsData");
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadProjectsForProperities() {
  const defaults = Array.isArray(window.__DEFAULT_PROJECTS__)
    ? window.__DEFAULT_PROJECTS__
    : [];

  const stored = loadStoredProjectsOnly();

  if (!defaults.length) return stored;

  const merged = defaults.map((dp) => {
    const match = stored.find(
      (sp) =>
        (sp.name || "").trim().toLowerCase() ===
        (dp.name || "").trim().toLowerCase()
    );
    return match
      ? { ...dp, ...match, units: match.units || dp.units || [] }
      : dp;
  });

  stored.forEach((sp) => {
    const exists = merged.some(
      (p) =>
        (p.name || "").trim().toLowerCase() ===
        (sp.name || "").trim().toLowerCase()
    );
    if (!exists) merged.push(sp);
  });

  localStorage.setItem("projectsData", JSON.stringify(merged));
  return merged;
}

function saveProjects(list) {
  localStorage.setItem("projectsData", JSON.stringify(list));
}

function getAllUnitsIndexed(projectsList) {
  let units = [];
  projectsList.forEach((project) => {
    (project.units || []).forEach((unit) => {
      units.push({
        ...unit,
        projectId: project.id,
        projectName: project.name,
        projectLocation: project.location || project.city || "",
        projectImg: project.img || "",
      });
    });
  });
  return units.map((u, i) => ({ ...u, _idx: i }));
}

function statusBadge(status) {
  const s = (status || "available").toLowerCase();
  const cls =
    s === "sold"
      ? "status-sold"
      : s === "pending"
      ? "status-pending"
      : "status-available";
  return `<span class="badge ${cls}">${s}</span>`;
}

function safeImg(src) {
  return src && src.trim()
    ? src
    : "assets/images/project-placeholder.jpg";
}

function renderProjects(projects, query = "") {
  const area = $("#contentArea");
  area.innerHTML = "";
  const q = query.toLowerCase();

  const filtered = projects.filter((p) => {
    const text = `${p.name || ""} ${p.location || ""} ${p.type || ""}`.toLowerCase();
    return !q || text.includes(q);
  });

  if (!filtered.length) {
    area.innerHTML = `
      <div class="col-12">
        <div class="empty">No projects found.</div>
      </div>`;
    return;
  }

  filtered.forEach((p) => {
    const unitsCount = (p.units || []).length;
    const availableCount = (p.units || []).filter(
      (u) => String(u.status || "available").toLowerCase() === "available"
    ).length;
    const soldCount = (p.units || []).filter(
      (u) => String(u.status || "").toLowerCase() === "sold"
    ).length;

    const adminControls = isAdmin()
      ? `
        <div class="proj-admin-actions mt-3 d-flex gap-2">
          <button
            class="btn btn-sm btn-view w-100"
            onclick="event.stopPropagation(); openProject('${p.id}')"
          >
            <i class="fas fa-eye me-1"></i> View
          </button>
          <button
            class="btn btn-sm btn-outline-warning w-100"
            onclick="event.stopPropagation(); openProjectForm('${p.id}')"
          >
            <i class="fas fa-pen me-1"></i> Edit
          </button>
          <button
            class="btn btn-sm btn-outline-danger w-100"
            onclick="event.stopPropagation(); deleteProject('${p.id}')"
          >
            <i class="fas fa-trash me-1"></i> Delete
          </button>
        </div>
      `
      : "";

    area.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="proj-card clickable" onclick="openProject('${p.id}')">
          <img class="proj-img" src="${safeImg(p.img)}" alt="${p.name || "Project"}">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <h5 class="mb-0">${p.name || "Untitled Project"}</h5>
              <span class="badge badge-soft">${p.location || "Unknown"}</span>
            </div>

            <div class="small muted mb-2">
              ${p.unitTypes ? p.unitTypes.join(" • ") : p.type || "Mixed Units"}
            </div>

            <div class="d-flex gap-2 flex-wrap small">
              <span class="badge bg-dark border" style="border-color:#383838;">Units: ${unitsCount}</span>
              <span class="badge bg-dark border" style="border-color:#383838;">Available: ${availableCount}</span>
              <span class="badge bg-dark border" style="border-color:#383838;">Sold: ${soldCount}</span>
            </div>

            <div class="mt-3 d-flex justify-content-between align-items-center">
              <div class="muted small">Check Units</div>
              <i class="fas fa-chevron-right gold"></i>
            </div>

            ${adminControls}
          </div>
        </div>
      </div>`;
  });
}

function renderUnits(units, query = "", projectId = "", status = "") {
  const area = $("#contentArea");
  area.innerHTML = "";

  const q = query.toLowerCase();
  const pid = projectId;
  const st = status.toLowerCase();

  const filtered = units.filter((u) => {
    const text = `${u.name || ""} ${u.type || ""} ${u.projectName || ""} ${u.projectLocation || ""}`.toLowerCase();
    const matchesQ = !q || text.includes(q);
    const matchesProject = !pid || u.projectId === pid;
    const matchesStatus = !st || String(u.status || "available").toLowerCase() === st;
    return matchesQ && matchesProject && matchesStatus;
  });

  if (!filtered.length) {
    area.innerHTML = `
      <div class="col-12">
        <div class="empty">No units found.</div>
      </div>`;
    return;
  }

  filtered.forEach((u) => {
    area.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="unit-card">
          <img class="unit-img" src="${safeImg(u.img || u.projectImg)}" alt="${u.name || "Unit"}">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="mb-0">${u.name || "Unit"}</h6>
              ${statusBadge(u.status)}
            </div>

            <div class="small muted mb-2">
              <i class="fas fa-building me-1"></i>${u.projectName || "-"}
            </div>

            <div class="small">
              <div><span class="muted">Type:</span> ${u.type || "-"}</div>
              <div><span class="muted">Area:</span> ${u.area || "-"}</div>
              <div><span class="muted">Rooms:</span> ${u.rooms ?? "-"}</div>
              <div><span class="muted">Price:</span> ${u.price || "-"}</div>
            </div>

            <div class="mt-3 d-flex gap-2">
              <a class="btn btn-sm btn-view w-100" href="property.html?idx=${u._idx}">
                View Details
              </a>
            </div>
          </div>
        </div>
      </div>`;
  });
}

function openProject(projectId) {
  location.href = `project-units.html?id=${projectId}`;
}

let projectFormModal = null;

function openProjectForm(id = null) {
  if (!isAdmin()) return;

  const title = $("#projectFormTitle");
  const projectId = $("#projectId");
  const name = $("#projectName");
  const locationInput = $("#projectLocation");
  const img = $("#projectImg");
  const imgFile = $("#projectImgFile");
  const imgPreview = $("#projectImgPreview");

  if (id) {
    const p = projects.find((pr) => pr.id === id);
    title.textContent = "Edit Project";
    projectId.value = p.id;
    name.value = p.name || "";
    locationInput.value = p.location || "";
    img.value = p.img || "";
    imgPreview.src = p.img || "assets/images/project-placeholder.jpg";
    imgPreview.style.display = "block";
    imgFile.value = "";
  } else {
    title.textContent = "Add Project";
    projectId.value = "";
    name.value = "";
    locationInput.value = "";
    img.value = "";
    imgPreview.src = "assets/images/project-placeholder.jpg";
    imgPreview.style.display = "none";
    imgFile.value = "";
  }

  projectFormModal.show();
}

function rebuildProjectFilter() {
  const pf = $("#projectFilter");
  pf.innerHTML = `<option value="">All Projects</option>`;
  projects.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name || "Project";
    pf.appendChild(opt);
  });
}

function handleSaveProject() {
  if (!isAdmin()) return;

  const id = $("#projectId").value;
  const name = $("#projectName").value.trim();
  const location = $("#projectLocation").value.trim();
  const img = $("#projectImg").value.trim();

  if (!name) {
    alert("Project Name cannot be empty.");
    return;
  }

  if (id) {
    const p = projects.find((pr) => pr.id === id);
    if (p) {
      p.name = name;
      p.location = location;
      p.img = img || p.img;
    }
  } else {
    const exists = projects.some(
      (p) => (p.name || "").trim().toLowerCase() === name.toLowerCase()
    );
    if (exists) {
      alert("A project with this name already exists.");
      return;
    }

    projects.push({
      id: crypto.randomUUID(),
      name,
      location,
      img: img || "",
      units: [],
    });
  }

  saveProjects(projects);
  units = getAllUnitsIndexed(projects);
  rebuildProjectFilter();
  projectFormModal.hide();
  refresh();
}

function deleteProject(id) {
  if (!isAdmin()) return;

  if (!confirm("Are you sure you want to delete this project and all its units?"))
    return;

  projects = projects.filter((p) => p.id !== id);
  saveProjects(projects);
  units = getAllUnitsIndexed(projects);
  rebuildProjectFilter();
  refresh();
}

function wireProjectImagePreview() {
  const fileInput = $("#projectImgFile");
  const urlInput = $("#projectImg");
  const preview = $("#projectImgPreview");

  fileInput?.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
      urlInput.value = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  urlInput?.addEventListener("input", function () {
    const val = this.value.trim();
    if (val.startsWith("data:image") || val.startsWith("http")) {
      preview.src = val;
      preview.style.display = "block";
    } else {
      preview.style.display = "none";
      preview.src = "assets/images/project-placeholder.jpg";
    }
  });
}

let currentView = "projects";
let projects = [];
let units = [];

function refresh() {
  const q = $("#searchInput").value;
  const pid = $("#projectFilter").value;
  const st = $("#statusFilter").value;

  if (currentView === "projects") {
    renderProjects(projects, q);
    $("#projectFilter").disabled = true;
    $("#statusFilter").disabled = true;
  } else {
    renderUnits(units, q, pid, st);
    $("#projectFilter").disabled = false;
    $("#statusFilter").disabled = false;
  }
}

function setView(view) {
  currentView = view;
  $("#btnProjects").classList.toggle("active", view === "projects");
  $("#btnUnits").classList.toggle("active", view === "units");
  refresh();

  const url = new URL(location.href);
  url.searchParams.set("view", view);
  history.replaceState({}, "", url);
}

(function init() {
  projects = loadProjectsForProperities();
  units = getAllUnitsIndexed(projects);

  rebuildProjectFilter();

  const v = (qParam("view") || "projects").toLowerCase();
  currentView = v === "units" ? "units" : "projects";

  $("#btnProjects").addEventListener("click", () => setView("projects"));
  $("#btnUnits").addEventListener("click", () => setView("units"));

  $("#searchInput").addEventListener("input", refresh);
  $("#projectFilter").addEventListener("change", refresh);
  $("#statusFilter").addEventListener("change", refresh);

  const modalEl = document.getElementById("projectFormModal");
  if (modalEl) projectFormModal = new bootstrap.Modal(modalEl);

  $("#saveProjectBtn")?.addEventListener("click", handleSaveProject);

  wireProjectImagePreview();

  const adminActions = $("#adminActions");
  if (adminActions && isAdmin()) {
    adminActions.innerHTML = `
      <button class="btn btn-sm btn-warning fw-semibold" id="addProjectBtn">
        <i class="fas fa-plus me-1"></i> Add Project
      </button>
    `;
    $("#addProjectBtn").addEventListener("click", () => openProjectForm());
  }

  setView(currentView);
})();
