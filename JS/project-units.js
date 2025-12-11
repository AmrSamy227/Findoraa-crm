/****************************************************
 * NOTIFICATIONS COUNTER (unchanged)
 ****************************************************/
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

function safeImg(src, salt = 20) {
  return src || `https://picsum.photos/600/400?random=${salt}`;
}

function statusBadge(status) {
  const s = String(status || "Available").toLowerCase();
  const cls =
    s === "sold"
      ? "status-sold"
      : s === "pending"
      ? "status-pending"
      : "status-available";
  return `<span class="badge ${cls}">${s}</span>`;
}

let projects = JSON.parse(localStorage.getItem("projectsData")) || [];
function saveProjects() {
  localStorage.setItem("projectsData", JSON.stringify(projects));
}
function findProject(id) {
  return projects.find((p) => String(p.id) === String(id));
}

let currentProjectId = null;
let currentProject = null;

function renderHeader(project) {
  const units = project.units || [];
  const total = units.length;
  const available = units.filter(
    (u) => String(u.status || "Available").toLowerCase() === "available"
  ).length;
  const sold = units.filter(
    (u) => String(u.status || "").toLowerCase() === "sold"
  ).length;

  $("#projectHeader").innerHTML = `
    <img class="cover" src="${safeImg(project.img, 5)}" alt="${project.name}">
    <div class="p-4">
      <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
        <div>
          <h2 class="gold mb-1">${project.name || "Project"}</h2>
          <div class="muted">
            <i class="fas fa-map-marker-alt me-1"></i>${
              project.location || "Unknown location"
            }
          </div>
        </div>
        <a href="properities.html" class="btn btn-outline-light">
          <i class="fas fa-arrow-left me-2"></i>Back to Properities
        </a>
      </div>

      <div class="d-flex gap-2 flex-wrap mt-3">
        <span class="badge bg-dark border" style="border-color:#383838;">Total Units: ${total}</span>
        <span class="badge bg-dark border" style="border-color:#383838;">Available: ${available}</span>
        <span class="badge bg-dark border" style="border-color:#383838;">Sold: ${sold}</span>
      </div>
    </div>
  `;
}

function renderUnits() {
  const area = $("#unitsArea");
  area.innerHTML = "";

  const q = $("#searchInput").value.toLowerCase().trim();
  const st = String($("#statusFilter").value || "").toLowerCase();

  const units = (currentProject.units || []).filter((u) => {
    const text = `${u.name || ""} ${u.type || ""} ${
      u.price || ""
    }`.toLowerCase();
    const matchesQ = !q || text.includes(q);
    const matchesStatus =
      !st || String(u.status || "Available").toLowerCase() === st;
    return matchesQ && matchesStatus;
  });

  if (!units.length) {
    area.innerHTML = `<div class="col-12"><div class="empty">No units found for this project.</div></div>`;
    return;
  }

  units.forEach((u, i) => {
    area.innerHTML += `
      <div class="col-xl-3 col-lg-4 col-md-6">
        <div class="unit-card">
          <img class="unit-img" src="${safeImg(
            u.img || currentProject.img,
            i + 30
          )}" alt="${u.name}">
          <div class="p-3">
            <div class="d-flex justify-content-between align-items-start mb-1">
              <h6 class="mb-0">${u.name || "Unit"}</h6>
              ${statusBadge(u.status)}
            </div>

            <div class="small muted mb-2">${u.type || "-"}</div>

            <div class="small">
              <div><span class="muted">Area:</span> ${u.area || "-"}</div>
              <div><span class="muted">Rooms:</span> ${u.rooms ?? "-"}</div>
              <div><span class="muted">Price:</span> ${u.price || "-"}</div>
              <div><span class="muted">Payment:</span> ${u.payment || "-"}</div>
              <div><span class="muted">Delivery:</span> ${
                u.delivery || "-"
              }</div>
            </div>

            <div class="mt-3 d-flex gap-2">
              <button class="btn btn-sm btn-primary w-100" onclick="openUnitForm('${
                u.id
              }')">
                <i class="fas fa-pen me-1"></i>Edit
              </button>
              <button class="btn btn-sm btn-primary btn-danger w-100" onclick="deleteUnit('${
                u.id
              }')">
                <i class="fas fa-trash me-1"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

const unitFormModal = new bootstrap.Modal($("#unitFormModal"));

function syncUnitPreview(val) {
  const preview = $("#unitImgPreview");
  if (val && (val.startsWith("data:image") || val.startsWith("http"))) {
    preview.src = val;
    preview.style.display = "block";
  } else {
    preview.style.display = "none";
    preview.src = "";
  }
}

window.openUnitForm = function (unitId = null) {
  const title = $("#unitFormTitle");
  const uid = $("#unitId");
  const name = $("#unitName");
  const area = $("#unitArea");
  const rooms = $("#unitRooms");
  const price = $("#unitPrice");
  const payment = $("#unitPayment");
  const delivery = $("#unitDelivery");
  const status = $("#unitStatus");
  const img = $("#unitImg");
  const desc = $("#unitDesc");
  const type = $("#unitType");

  if (unitId) {
    const u = currentProject.units.find((x) => x.id === unitId);
    if (!u) return;

    title.textContent = "Edit Unit";
    uid.value = u.id;
    name.value = u.name || "";
    area.value = String(u.area || "").replace(" m²", "");
    rooms.value = u.rooms ?? "";
    price.value = u.price || "";
    payment.value = u.payment || "Cash";
    delivery.value = u.delivery || "Immediate";
    status.value = u.status || "Available";
    img.value = u.img || "";
    desc.value = u.desc || "";
    type.value = u.type || "Apartment";
    syncUnitPreview(img.value);
  } else {
    title.textContent = "Add Unit";
    uid.value = "";
    name.value = "";
    area.value = "";
    rooms.value = "";
    price.value = "";
    payment.value = "Cash";
    delivery.value = "Immediate";
    status.value = "Available";
    img.value = "";
    desc.value = "";
    type.value = "Apartment";
    syncUnitPreview("");
  }

  unitFormModal.show();
};

$("#saveUnitBtn").addEventListener("click", () => {
  if (!currentProject) return;

  const uid = $("#unitId").value;
  const name = $("#unitName").value.trim();
  const area = parseFloat($("#unitArea").value) || 0;
  const rooms = parseInt($("#unitRooms").value || "0", 10);
  const price = $("#unitPrice").value.trim();
  const payment = $("#unitPayment").value;
  const delivery = $("#unitDelivery").value;
  const status = $("#unitStatus").value;
  const img = $("#unitImg").value.trim();
  const desc = $("#unitDesc").value.trim();
  const type = $("#unitType").value;

  if (!name) {
    alert("Unit Name cannot be empty.");
    return;
  }

  if (uid) {
    const u = currentProject.units.find((x) => x.id === uid);
    if (u) {
      const oldStatus = u.status;

      u.name = name;
      u.area = area > 0 ? `${area} m²` : "";
      u.rooms = rooms;
      u.price = price;
      u.payment = payment;
      u.delivery = delivery;
      u.status = status;
      u.img = img;
      u.desc = desc;
      u.type = type;

      if (oldStatus !== status) {
        if (status === "Sold") {
          addNotificationWithAgent(
            "deal",
            `Deal Closed: ${name}`,
            `Unit "${name}" in ${currentProject.name} has been sold. Amount: ${price}`,
            null,
            null
          );
        } else if (oldStatus === "Sold" && status !== "Sold") {
          addNotificationWithAgent(
            "deal",
            `Deal Collapsed: ${name}`,
            `Unit "${name}" status changed from Sold to ${status.toUpperCase()}. Deal has collapsed.`,
            null,
            null
          );
        } else if (status === "Pending") {
          addNotificationWithAgent(
            "unit",
            `Unit "${name}" - Deal Pending`,
            `Unit in ${currentProject.name} is now pending.`,
            null,
            null
          );
        } else if (status === "Available") {
          addNotificationWithAgent(
            "unit",
            `Unit "${name}" Available`,
            `Unit in ${currentProject.name} is now available.`,
            null,
            null
          );
        }
      }
    }
  } else {
    if (currentProject.units.some((u) => u.name === name)) {
      alert("A unit with this name already exists in this project.");
      return;
    }

    currentProject.units.push({
      id: crypto.randomUUID(),
      name,
      area: area > 0 ? `${area} m²` : "",
      rooms,
      price,
      payment,
      delivery,
      status,
      img,
      desc,
      type,
    });

    addNotificationWithAgent(
      "unit",
      `Unit "${name}" Added`,
      `New unit "${name}" has been added to ${currentProject.name}.`,
      null,
      null
    );
  }

  saveProjects();
  unitFormModal.hide();
  renderHeader(currentProject);
  renderUnits();
});

window.deleteUnit = function (unitId) {
  if (!confirm("Are you sure you want to delete this unit?")) return;
  currentProject.units = currentProject.units.filter((u) => u.id !== unitId);
  saveProjects();
  renderHeader(currentProject);
  renderUnits();
};

$("#unitImgFile").addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    $("#unitImg").value = e.target.result;
    syncUnitPreview(e.target.result);
  };
  reader.readAsDataURL(file);
});

$("#unitImg").addEventListener("input", function () {
  syncUnitPreview(this.value.trim());
});

(function init() {
  currentProjectId = qParam("id");
  currentProject = findProject(currentProjectId);

  if (!currentProject) {
    $("#projectHeader").innerHTML = `
      <div class="p-5 text-center header-card">
        <h3 class="gold">Project not found</h3>
        <p class="muted mb-3">The project you requested doesn't exist in localStorage.</p>
        <a href="properities.html" class="btn btn-primary fw-bold">Back</a>
      </div>
    `;
    return;
  }

  if (!Array.isArray(currentProject.units)) currentProject.units = [];

  renderHeader(currentProject);
  renderUnits();

  $("#searchInput").addEventListener("input", renderUnits);
  $("#statusFilter").addEventListener("change", renderUnits);
  $("#addUnitBtnPage").addEventListener("click", () => openUnitForm());
})();

function addNotificationWithAgent(type, title, text, agentName, agentId) {
  const notifs = JSON.parse(localStorage.getItem("notificationsData")) || [];
  notifs.push({
    id: crypto.randomUUID(),
    type,
    title,
    text,
    agentName,
    agentId,
    timestamp: new Date().toISOString(),
    read: false,
  });
  localStorage.setItem("notificationsData", JSON.stringify(notifs));
}
