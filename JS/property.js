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
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function getAllEmployees() {
  const employeesLocal = JSON.parse(localStorage.getItem("employeesData")) || [
    {
      id: 1,
      name: "Ahmed Hassan",
      deals: 0,
      revenue: 0,
      image: "https://picsum.photos/50/50?random=1",
    },
    {
      id: 2,
      name: "Fatima Ahmed",
      deals: 0,
      revenue: 0,
      image: "https://picsum.photos/50/50?random=2",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      deals: 0,
      revenue: 0,
      image: "https://picsum.photos/50/50?random=3",
    },
    {
      id: 4,
      name: "Layla Saleh",
      deals: 0,
      revenue: 0,
      image: "https://picsum.photos/50/50?random=4",
    },
    {
      id: 5,
      name: "Karim Ibrahim",
      deals: 0,
      revenue: 0,
      image: "https://picsum.photos/50/50?random=5",
    },
  ];
  return employeesLocal;
}

function getAllUnitsIndexed() {
  const projectsLocal = JSON.parse(localStorage.getItem("projectsData")) || [];
  let units = [];
  projectsLocal.forEach((project) => {
    (project.units || []).forEach((unit) => {
      units.push({
        ...unit,
        projectName: project.name,
        projectImg: project.img,
        projectId: project.id,
      });
    });
  });

  if (units.length === 0) {
    units.push({
      id: "U401",
      name: "Luxury Penthouse 401",
      projectName: "The Skyline Residence",
      type: "Apartment",
      status: "available",
      price: "$1,500,000",
      area: "180 sqm",
      rooms: 4,
      payment: "Installments",
      delivery: "Q4 2026",
      desc: "A stunning, modern penthouse with panoramic city views and exclusive access to rooftop amenities. Features open-plan living, smart home systems, and high-end finishes throughout.",
      img: "https://picsum.photos/900/600?random=1",
      address: "100 Main St, Metropolis",
      images: [
        "https://picsum.photos/900/600?random=2",
        "https://picsum.photos/900/600?random=3",
      ],
    });
  }

  return units.map((u, i) => ({ ...u, _idx: i }));
}

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

function updateEmployeeDealCount(agentId, price) {
  const employees = getAllEmployees();
  const updatedEmployees = employees.map((emp) => {
    if (emp.id === agentId) {
      emp.deals = (emp.deals || 0) + 1;
      emp.revenue =
        (emp.revenue || 0) +
        parseFloat(String(price || "").replace(/[^0-9.-]+/g, ""));
    }
    return emp;
  });
  localStorage.setItem("employeesData", JSON.stringify(updatedEmployees));
}

function assignAgentToProperty(index, agentId) {
  const units = getAllUnitsIndexed();
  const unitToUpdate = units[index];
  if (!unitToUpdate) return;

  unitToUpdate.assignedAgent = agentId;

  const projectsLocal = JSON.parse(localStorage.getItem("projectsData")) || [];
  let found = false;

  const updatedProjects = projectsLocal.map((project) => {
    if (project.units) {
      project.units = project.units.map((unit) => {
        if (
          unit.name === unitToUpdate.name &&
          project.name === unitToUpdate.projectName
        ) {
          unit.assignedAgent = agentId;
          found = true;
        }
        return unit;
      });
    }
    return project;
  });

  if (found)
    localStorage.setItem("projectsData", JSON.stringify(updatedProjects));
}

function updateUnitStatus(index, newStatus) {
  const units = getAllUnitsIndexed();
  const unitToUpdate = units[index];
  if (!unitToUpdate) return;

  const oldStatus = String(unitToUpdate.status || "").toLowerCase();
  const employees = getAllEmployees();
  const assignedAgent =
    employees.find((e) => e.id == unitToUpdate.assignedAgent) || {};

  const ns = String(newStatus || "").toLowerCase();
  unitToUpdate.status = ns;

  if (ns === "sold") {
    const assignedAgentId = $("#agentSelect")?.value;
    if (assignedAgentId) {
      unitToUpdate.assignedAgent = assignedAgentId;
      unitToUpdate.soldDate = new Date().toISOString();
      updateEmployeeDealCount(parseInt(assignedAgentId), unitToUpdate.price);

      const agentName =
        employees.find((e) => e.id == assignedAgentId)?.name || "Agent";
      addNotificationWithAgent(
        "deal",
        `Deal Closed: ${unitToUpdate.name}`,
        `Unit "${unitToUpdate.name}" in ${unitToUpdate.projectName} sold by ${agentName}. Amount: ${unitToUpdate.price}`,
        agentName,
        assignedAgentId
      );
    }
  } else if (oldStatus === "sold" && ns !== "sold") {
    const agentName = assignedAgent?.name || "Agent";
    addNotificationWithAgent(
      "deal",
      `Deal Collapsed: ${unitToUpdate.name}`,
      `Unit "${
        unitToUpdate.name
      }" status changed from Sold to ${newStatus.toUpperCase()}. Deal with ${agentName} has collapsed.`,
      agentName,
      unitToUpdate.assignedAgent
    );
  } else if (ns === "pending") {
    addNotificationWithAgent(
      "unit",
      `Unit "${unitToUpdate.name}" - Deal Pending`,
      `Unit in ${unitToUpdate.projectName} is now pending.`,
      null,
      null
    );
  } else if (ns === "available") {
    addNotificationWithAgent(
      "unit",
      `Unit "${unitToUpdate.name}" Available`,
      `Unit in ${unitToUpdate.projectName} is now available.`,
      null,
      null
    );
  }

  const projectsLocal = JSON.parse(localStorage.getItem("projectsData")) || [];
  let found = false;

  const updatedProjects = projectsLocal.map((project) => {
    if (project.units) {
      project.units = project.units.map((unit) => {
        if (
          unit.name === unitToUpdate.name &&
          project.name === unitToUpdate.projectName
        ) {
          unit.status = ns;
          unit.assignedAgent = unitToUpdate.assignedAgent || unit.assignedAgent;
          unit.soldDate = unitToUpdate.soldDate || unit.soldDate;
          found = true;
        }
        return unit;
      });
    }
    return project;
  });

  if (found)
    localStorage.setItem("projectsData", JSON.stringify(updatedProjects));

  renderProperty(unitToUpdate);
}

function safeImgs(u) {
  let imgs = [];

  if (u.images) {
    if (Array.isArray(u.images)) imgs = u.images.slice();
    else if (typeof u.images === "string") {
      try {
        const parsed = JSON.parse(u.images);
        if (Array.isArray(parsed)) imgs = parsed;
      } catch {}
    }
  }

  if (u.img && !imgs.includes(u.img)) imgs.unshift(u.img);
  if (u.projectImg && !imgs.includes(u.projectImg)) imgs.push(u.projectImg);
  if (!imgs.length) imgs.push("https://picsum.photos/900/600");

  return imgs;
}

function createFeatureCard(icon, value, label) {
  return `
    <div class="feature-card">
      <i class="${icon}"></i>
      <strong>${value}</strong>
      <small>${label}</small>
    </div>
  `;
}

let galleryIndex = 0;
let galleryImgs = [];

function updateGallery(i) {
  galleryIndex = (i + galleryImgs.length) % galleryImgs.length;
  $("#mainImg").src = galleryImgs[galleryIndex];
  document.querySelectorAll(".gallery-thumbs img").forEach((t, idx) => {
    t.classList.toggle("active", idx === galleryIndex);
  });
}

window.nextGallery = function () {
  updateGallery(galleryIndex + 1);
};
window.prevGallery = function () {
  updateGallery(galleryIndex - 1);
};

function renderProperty(u) {
  const content = $("#content");

  if (!u) {
    content.innerHTML = `
      <div class="property-card p-4 p-lg-5 text-center">
        <h2 class="unit-name">Property not found</h2>
        <p class="project-meta">The requested property could not be located.</p>
        <a href="search.html" class="btn btn-primary mt-2">Back to search</a>
      </div>
    `;
    return;
  }

  galleryImgs = safeImgs(u);
  galleryIndex = 0;

  const mapQuery = encodeURIComponent(
    u.address || `${u.projectName} ${u.name}`
  );
  const mapSrc = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const currentStatus = String(u.status || "available").toUpperCase();
  let statusClass = "status-available";
  if (currentStatus === "SOLD") statusClass = "status-sold";
  else if (currentStatus === "PENDING") statusClass = "status-pending";

  const statusOptions = ["AVAILABLE", "PENDING", "SOLD"];

  const statusDropdown = `
    <div class="dropdown">
      <button class="status-badge-btn ${statusClass} dropdown-toggle" type="button" data-bs-toggle="dropdown">
        <i class="fas fa-circle" style="font-size:.6rem"></i>${currentStatus}
      </button>
      <ul class="dropdown-menu">
        ${statusOptions
          .map(
            (status) => `
              <li>
                <a class="dropdown-item ${
                  status === currentStatus ? "active" : ""
                }" href="#" data-status="${status}">
                  ${status}
                </a>
              </li>
            `
          )
          .join("")}
      </ul>
    </div>
  `;

  const employees = getAllEmployees();
  const assignedAgentId = u.assignedAgent || "";

  const agentDropdown = `
    <div class="agent-box">
      <div class="section-title mb-1"><i class="fas fa-user-tie me-2"></i>Assigned Agent</div>
      <select id="agentSelect" class="form-select">
        <option value="">-- Select an Agent --</option>
        ${employees
          .map(
            (emp) =>
              `<option value="${emp.id}" ${
                assignedAgentId == emp.id ? "selected" : ""
              }>${emp.name}</option>`
          )
          .join("")}
      </select>
      <div class="small project-meta mb-0">
        ${
          assignedAgentId
            ? "Agent assigned on this property"
            : "Select an agent to handle this property"
        }
      </div>
    </div>
  `;

  content.innerHTML = `
    <div class="property-card p-3 p-lg-5">
      <div class="header-row mb-3">
        <div>
          <h1 class="unit-name">${u.name || "Unit"}</h1>
          <div class="project-meta">
            <i class="fas fa-building me-1"></i>${u.projectName || "-"}
            <span class="mx-2">|</span>
            <i class="fas fa-tag me-1"></i>${u.type || "Unit"}
          </div>
        </div>
        ${statusDropdown}
      </div>

      <div class="row g-4 g-lg-5">
        <div class="col-lg-8">
          <div class="gallery-wrap mb-3">
            <img id="mainImg" src="${
              galleryImgs[0]
            }" class="gallery-main" alt="${u.name}" />
            <div class="gallery-nav">
              <button class="gallery-btn" type="button" onclick="prevGallery()">
                <i class="fas fa-chevron-left"></i>
              </button>
              <button class="gallery-btn" type="button" onclick="nextGallery()">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          <div class="gallery-thumbs mb-4">
            ${galleryImgs
              .map(
                (src, i) =>
                  `<img data-src="${src}" class="${
                    i === 0 ? "active" : ""
                  }" src="${src}" alt="${u.name} ${i + 1}"/>`
              )
              .join("")}
          </div>

          <div class="section-title">Key Features</div>
          <div class="feature-row mb-4">
            ${createFeatureCard(
              "fas fa-hand-holding-usd",
              u.price || "-",
              "Price"
            )}
            ${createFeatureCard("fas fa-ruler-combined", u.area || "-", "Area")}
            ${createFeatureCard("fas fa-bed", u.rooms ?? "-", "Rooms")}
            ${createFeatureCard(
              "fas fa-credit-card",
              u.payment || "-",
              "Payment"
            )}
            ${createFeatureCard(
              "fas fa-truck-loading",
              u.delivery || "-",
              "Delivery"
            )}
          </div>

          <div class="section-title">Description</div>
          <p class="description mb-0">
            ${u.desc || "No detailed description available for this property."}
          </p>
        </div>

        <div class="col-lg-4">
          <div class="side-card">
            <div>
              <div class="section-title"><i class="fas fa-map-marker-alt me-2"></i>Location</div>
              <div class="map-wrap mt-2">
                <iframe src="${mapSrc}" width="100%" height="100%" style="border:0" loading="lazy" allowfullscreen></iframe>
              </div>
              <a target="_blank" href="${mapLink}" class="btn btn-primary w-100 mt-3">
                Open in Google Maps
              </a>
            </div>

            ${agentDropdown}

            <div>
              <div class="section-title"><i class="fas fa-info-circle me-2"></i>Inquire</div>
              <div class="project-meta small mb-2">
                Interested in this property? Contact us to schedule a viewing.
              </div>
              <button class="btn btn-outline-light w-100 mb-2" id="callBtn">
                <i class="fas fa-phone-alt me-2"></i>Request a Call
              </button>
              <a href="search.html" class="btn btn-outline-light w-100 d-none d-lg-inline-flex">
                <i class="fas fa-arrow-left me-2"></i>Back to Search
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".gallery-thumbs img").forEach((img, i) => {
    img.addEventListener("click", () => updateGallery(i));
  });

  document.querySelectorAll(".dropdown-item[data-status]").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      updateUnitStatus(u._idx, item.dataset.status);
    });
  });

  $("#agentSelect").addEventListener("change", function () {
    assignAgentToProperty(u._idx, this.value);
  });

  $("#callBtn").addEventListener("click", () => {
    alert("Contact form / modal would open here!");
  });

  $("#mobileCallBtn")?.addEventListener("click", () => {
    alert("Contact form / modal would open here!");
  });

  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach(
        (e) => e.isIntersecting && e.target.classList.add("visible")
      ),
    { threshold: 0.12 }
  );
  document.querySelectorAll(".fade-up").forEach((el) => obs.observe(el));
}

(function init() {
  const idx = parseInt(qParam("idx"));
  const units = getAllUnitsIndexed();
  const unit =
    Number.isInteger(idx) && idx >= 0
      ? units[idx]
      : units.length > 0
      ? units[0]
      : null;

  renderProperty(unit);
})();
