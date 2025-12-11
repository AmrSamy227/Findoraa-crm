const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

let view = "units";
let projects = [];
let units = [];

function parseNum(v) {
  if (v == null) return 0;
  const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function safeImg(src, salt = 1) {
  return src || `https://picsum.photos/600/400?random=${salt}`;
}

function loadData() {
  projects = JSON.parse(localStorage.getItem("projectsData")) || [];
  units = [];
  projects.forEach((p) => {
    (p.units || []).forEach((u) => {
      units.push({
        ...u,
        projectId: p.id,
        projectName: p.name,
        projectLocation: p.location || p.city || "",
        projectImg: p.img || "",
      });
    });
  });
  units = units.map((u, i) => ({ ...u, _idx: i }));
}

function setView(v) {
  view = v;
  $("#btnUnits").classList.toggle("active", v === "units");
  $("#btnProjects").classList.toggle("active", v === "projects");

  const unitOnlyBlocks = $$(".unit-only");
  unitOnlyBlocks.forEach((b) => b.classList.toggle("disabled", v === "projects"));
  $("#filtersHint").textContent =
    v === "projects" ? "Project filters enabled" : "Units filters enabled";

  filter();
}

function clearFilters() {
  $("#keywordSearch").value = "";
  $("#minPrice").value = "";
  $("#maxPrice").value = "";
  $("#minArea").value = "";
  $("#maxArea").value = "";
  $("#location").value = "";
  $("#unitTypeSearch").value = "";
  $("#paymentStatus").value = "";
  $("#deliveryStatus").value = "";
  $("#rooms").value = "";
  filter();
}

function filterUnits() {
  const kw = $("#keywordSearch").value.trim().toLowerCase();
  const minP = parseNum($("#minPrice").value);
  const maxP = parseNum($("#maxPrice").value) || Infinity;
  const minA = parseNum($("#minArea").value);
  const maxA = parseNum($("#maxArea").value) || Infinity;
  const loc = $("#location").value.trim().toLowerCase();
  const type = $("#unitTypeSearch").value;
  const pay = $("#paymentStatus").value;
  const del = $("#deliveryStatus").value;
  const rms = parseInt($("#rooms").value || "0", 10);

  return units.filter((u) => {
    const fields = [
      u.name,
      u.projectName,
      u.desc,
      u.price,
      u.status,
      u.payment,
      u.delivery,
      u.area,
      u.type,
      u.projectLocation,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const keywordMatch =
      !kw ||
      fields.includes(kw) ||
      (kw.match(/^\d+$/) &&
        (parseInt(u.rooms || "0", 10) === parseInt(kw, 10) ||
          parseNum(u.area) === parseInt(kw, 10)));

    const priceVal = parseNum(u.price);
    const areaVal = parseNum(u.area);

    const priceMatch = priceVal >= minP && priceVal <= maxP;
    const areaMatch = areaVal >= minA && areaVal <= maxA;

    const locationMatch =
      !loc ||
      String(u.projectLocation || "").toLowerCase().includes(loc) ||
      String(u.desc || "").toLowerCase().includes(loc);

    const typeMatch = !type || String(u.type || "") === type;
    const payMatch = !pay || String(u.payment || "") === pay;
    const delMatch =
      !del ||
      String(u.delivery || "") === del ||
      (del === "Later" && String(u.delivery || "") === "After period");

    const roomsMatch = !rms || parseInt(u.rooms || "0", 10) === rms;

    return (
      keywordMatch &&
      priceMatch &&
      areaMatch &&
      locationMatch &&
      typeMatch &&
      payMatch &&
      delMatch &&
      roomsMatch
    );
  });
}

function filterProjects() {
  const kw = $("#keywordSearch").value.trim().toLowerCase();
  const minP = parseNum($("#minPrice").value);
  const maxP = parseNum($("#maxPrice").value) || Infinity;
  const loc = $("#location").value.trim().toLowerCase();

  return projects.filter((p) => {
    const text = [
      p.name,
      p.location,
      p.city,
      p.type,
      (p.unitTypes || []).join(" "),
      p.desc,
      p.priceFrom,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    const keywordMatch = !kw || text.includes(kw);

    const locationMatch =
      !loc ||
      String(p.location || p.city || "").toLowerCase().includes(loc) ||
      text.includes(loc);

    const priceVal = parseNum(p.priceFrom);
    const priceMatch =
      (priceVal === 0 && minP === 0 && maxP === Infinity) ||
      (priceVal >= minP && priceVal <= maxP);

    return keywordMatch && locationMatch && priceMatch;
  });
}

function renderUnits(list) {
  const container = $("#resultsContainer");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = `<p class="text-center mt-3 muted">No units found</p>`;
    return;
  }

  list.forEach((u, i) => {
    container.innerHTML += `
      <div class="card mb-3 p-3">
        <div class="row g-0 align-items-center">
          <div class="col-md-4">
            <img src="${safeImg(u.img || u.projectImg, i + 5)}" class="property-img">
          </div>
          <div class="col-md-6 p-3">
            <h6 class="mb-1">
              ${u.name || "Unit"}
              <span class="text-info small">(${u.projectName || "-"})</span>
            </h6>
            <p class="mb-1 small">
              ${(u.rooms ?? "-")} Rooms |
              ${u.area || "-"} |
              ${u.price || "-"} |
              ${u.payment || "-"} |
              ${u.delivery || "-"} |
              ${u.status || "-"} |
              <span class="badge bg-secondary">${u.type || "-"}</span>
            </p>
            <p class="mb-0 small">${u.desc || ""}</p>
          </div>
          <div class="col-md-2 text-md-end text-center">
            <a href="property.html?idx=${u._idx}" class="btn btn-primary mt-2 mt-md-0">View Details</a>
          </div>
        </div>
      </div>
    `;
  });
}

function renderProjects(list) {
  const container = $("#resultsContainer");
  container.innerHTML = "";

  if (!list.length) {
    container.innerHTML = `<p class="text-center mt-3 muted">No projects found</p>`;
    return;
  }

  list.forEach((p, i) => {
    const unitsCount = (p.units || []).length;
    const availableCount = (p.units || []).filter(
      (u) => String(u.status || "available").toLowerCase() === "available"
    ).length;

    container.innerHTML += `
      <div class="card mb-3 p-3">
        <div class="row g-0 align-items-center">
          <div class="col-md-4">
            <img src="${safeImg(p.img, i + 20)}" class="property-img">
          </div>
          <div class="col-md-6 p-3">
            <h6 class="mb-1">${p.name || "Project"}</h6>
            <p class="mb-1 small muted">
              <i class="fas fa-location-dot me-1"></i>${p.location || p.city || "-"}
            </p>
            <p class="mb-1 small">
              ${p.type || (p.unitTypes ? p.unitTypes.join(" • ") : "Mixed Units")}
            </p>
            <div class="d-flex gap-2 flex-wrap small">
              <span class="badge bg-dark border" style="border-color:#383838;">Units: ${unitsCount}</span>
              <span class="badge bg-dark border" style="border-color:#383838;">Available: ${availableCount}</span>
              <span class="badge bg-dark border" style="border-color:#383838;">From: ${p.priceFrom || "-"}</span>
            </div>
          </div>
          <div class="col-md-2 text-md-end text-center">
            <button class="btn btn-primary mt-2 mt-md-0" onclick="openProject('${p.id}')">
              Open Project
            </button>
          </div>
        </div>
      </div>
    `;
  });
}

window.openProject = function (projectId) {
  const user = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const role = String(user.role || "").toLowerCase();
  if (role === "agent") {
    alert("Agents can't open project details page.");
    return;
  }
  location.href = `project-units.html?id=${projectId}`;
};

function filter() {
  loadData();
  if (view === "units") {
    const res = filterUnits();
    $("#resultsCount").textContent = `Results: ${res.length}`;
    renderUnits(res);
  } else {
    const res = filterProjects();
    $("#resultsCount").textContent = `Results: ${res.length}`;
    renderProjects(res);
  }
}

function setQuickFilter(val) {
  $("#keywordSearch").value = val;
  filter();
  $("#resultsContainer").scrollIntoView({ behavior: "smooth" });
}

function updateNotificationCounter() {
  const notifications = JSON.parse(localStorage.getItem("notificationsData")) || [];
  const unreadCount = notifications.filter((n) => !n.read).length;
  const counterElement = $(".notification-counter");
  if (!counterElement) return;
  if (unreadCount > 0) {
    counterElement.textContent = unreadCount;
    counterElement.style.display = "block";
  } else {
    counterElement.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  $("#btnUnits").addEventListener("click", () => setView("units"));
  $("#btnProjects").addEventListener("click", () => setView("projects"));

  $("#clearBtn").addEventListener("click", clearFilters);

  $$("input,select").forEach((el) => el.addEventListener("input", filter));

  $$(".chip").forEach((chip) =>
    chip.addEventListener("click", () => setQuickFilter(chip.dataset.quick))
  );

  $("#chatBallBtn").addEventListener("click", () =>
    $("#chatBallModal").classList.add("active")
  );
  $("#chatCloseBtn").addEventListener("click", () =>
    $("#chatBallModal").classList.remove("active")
  );

  $("#chatBallForm").addEventListener("submit", (e) => {
    e.preventDefault();
    $("#chatBallSuccess").style.display = "block";
    setTimeout(() => {
      $("#chatBallSuccess").style.display = "none";
      $("#chatBallModal").classList.remove("active");
      $("#chatBallForm").reset();
    }, 2000);
  });

  updateNotificationCounter();
  filter();
});
window.addEventListener("storage", updateNotificationCounter);
