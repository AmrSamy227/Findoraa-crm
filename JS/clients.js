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

const EMPLOYEES_STORAGE_KEY = "employeesData";

const INITIAL_EMPLOYEES = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "Senior Agent",
    team: "Residential",
    status: "Active",
    deals: 0,
    revenue: 0,
  },
  {
    id: 2,
    name: "Fatima Ahmed",
    role: "Agent",
    team: "Residential",
    status: "Active",
    deals: 0,
    revenue: 0,
  },
  {
    id: 3,
    name: "Mohammed Ali",
    role: "Junior Agent",
    team: "Commercial",
    status: "Active",
    deals: 0,
    revenue: 0,
  },
  {
    id: 4,
    name: "Layla Saleh",
    role: "Senior Agent",
    team: "Commercial",
    status: "Active",
    deals: 0,
    revenue: 0,
  },
  {
    id: 5,
    name: "Karim Ibrahim",
    role: "Agent",
    team: "Residential",
    status: "On Leave",
    deals: 0,
    revenue: 0,
  },
];

function loadEmployees() {
  const saved = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Error loading employeesData:", e);
      return [...INITIAL_EMPLOYEES];
    }
  }
  return [...INITIAL_EMPLOYEES];
}

function getCurrentAgents() {
  const employees = loadEmployees();
  return employees.filter(
    (e) =>
      (e.role || "").toLowerCase().includes("agent") && e.status !== "Inactive"
  );
}

function fillAgentDropdown(selectId, selectedName = "") {
  const select = document.getElementById(selectId);
  if (!select) return;

  const agents = getCurrentAgents();
  select.innerHTML = "";

  if (!agents.length) {
    select.innerHTML = `<option disabled selected>No agents available</option>`;
    return;
  }

  select.insertAdjacentHTML(
    "beforeend",
    `<option value="" disabled ${
      !selectedName ? "selected" : ""
    }>Select agent</option>`
  );

  agents.forEach((agent) => {
    const opt = document.createElement("option");
    opt.value = agent.name;
    opt.textContent = agent.name;
    if (agent.name === selectedName) opt.selected = true;
    select.appendChild(opt);
  });
}

function refreshAgentDropdowns() {
  fillAgentDropdown("contactAgent");
  const currentEditVal = document.getElementById("editAgent")?.value || "";
  fillAgentDropdown("editAgent", currentEditVal);
}

// Update agents when HR changes employees in another tab
window.addEventListener("storage", (e) => {
  if (e.key === EMPLOYEES_STORAGE_KEY) refreshAgentDropdowns();
});
// Update agents when HR dispatches custom event (same tab)
window.addEventListener("employeesDataUpdated", refreshAgentDropdowns);

// Polling fallback (guarantees updates no matter what)
let lastEmployeesSnapshot = localStorage.getItem(EMPLOYEES_STORAGE_KEY) || "";
setInterval(() => {
  const snap = localStorage.getItem(EMPLOYEES_STORAGE_KEY) || "";
  if (snap !== lastEmployeesSnapshot) {
    lastEmployeesSnapshot = snap;
    refreshAgentDropdowns();
  }
}, 3000);

document
  .getElementById("addContactModal")
  .addEventListener("show.bs.modal", refreshAgentDropdowns);
document
  .getElementById("editContactModal")
  .addEventListener("show.bs.modal", refreshAgentDropdowns);

const CONTACTS_STORAGE_KEY = "contactsData";

function loadContacts() {
  const saved = localStorage.getItem(CONTACTS_STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error("Bad contactsData in storage:", e);
    }
  }
  return null;
}

function saveContacts() {
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
}

let contacts = loadContacts() || [
  {
    name: "Sophia Carter",
    number: "+1234567890",
    status: "Hot",
    agent: "Ethan Bennett",
    lastContact: new Date().toISOString(),
    notes: "Important client",
  },
];

saveContacts();

function renderContacts(filteredContacts = null) {
  const contactsToRender = filteredContacts || contacts;
  const tableBody = document.getElementById("contactsTable");
  tableBody.innerHTML = "";

  if (contactsToRender.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4">No contacts found.</td></tr>`;
    document.getElementById("searchInfo").style.display = "none";
    return;
  }

  contactsToRender.forEach((contact, index) => {
    const originalIndex = contacts.findIndex(
      (c) =>
        c.name === contact.name &&
        c.number === contact.number &&
        c.status === contact.status &&
        c.agent === contact.agent &&
        c.lastContact === contact.lastContact &&
        c.notes === contact.notes
    );

    const row = `
            <tr>
              <td>${contact.name}</td>
              <td>${contact.number}</td>
              <td><span class="status-badge">${contact.status}</span></td>
              <td>${contact.agent || "-"}</td>
              <td>${formatLastContact(contact.lastContact)}</td>
              <td>${contact.notes ? contact.notes : "-"}</td>
              <td>
                <button class="btn-edit editBtn" data-index="${
                  originalIndex !== -1 ? originalIndex : index
                }">Edit</button>
                <button class="btn-delete deleteBtn" data-index="${
                  originalIndex !== -1 ? originalIndex : index
                }">Delete</button>
              </td>
            </tr>
          `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });

  const searchInfo = document.getElementById("searchInfo");
  const resultsCount = document.getElementById("searchResultsCount");
  if (filteredContacts) {
    resultsCount.textContent = filteredContacts.length;
    searchInfo.style.display = "block";
  } else {
    searchInfo.style.display = "none";
  }
}

function formatLastContact(dateStr) {
  const contactDate = new Date(dateStr);
  if (isNaN(contactDate.getTime())) return dateStr || "-";
  const now = new Date();
  const diffMs = now - contactDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return contactDate.toLocaleDateString();
}

function searchContacts(query) {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) {
    renderContacts();
    return;
  }

  const filtered = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm) ||
      contact.status.toLowerCase().includes(searchTerm) ||
      contact.number.toLowerCase().includes(searchTerm) ||
      (contact.agent || "").toLowerCase().includes(searchTerm) ||
      (contact.lastContact || "").toLowerCase().includes(searchTerm) ||
      (contact.notes && contact.notes.toLowerCase().includes(searchTerm))
  );

  renderContacts(filtered);
}

// Delete contact
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("deleteBtn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    if (!isNaN(index) && index >= 0 && index < contacts.length) {
      contacts.splice(index, 1);
      saveContacts();
      renderContacts();
    }
  }
});

// Add new contact
document
  .getElementById("addContactForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const newContact = {
      name: document.getElementById("contactName").value.trim(),
      number: document.getElementById("contactNumber").value.trim(),
      status: document.getElementById("contactStatus").value,
      agent: document.getElementById("contactAgent").value,
      lastContact: new Date().toISOString(),
      notes: document.getElementById("contactNotes").value.trim(),
    };

    if (!newContact.name || !newContact.number || !newContact.agent) {
      alert("Name, Number, and Agent are required.");
      return;
    }

    contacts.push(newContact);
    saveContacts();
    renderContacts();

    document.getElementById("addContactForm").reset();
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("addContactModal")
    );
    modal.hide();
    alert("Contact added successfully!");
  });

let currentEditIndex = null;
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("editBtn")) {
    currentEditIndex = parseInt(e.target.getAttribute("data-index"));
    if (
      !isNaN(currentEditIndex) &&
      currentEditIndex >= 0 &&
      currentEditIndex < contacts.length
    ) {
      const contact = contacts[currentEditIndex];
      document.getElementById("editName").value = contact.name;
      document.getElementById("editNumber").value = contact.number;
      document.getElementById("editStatus").value = contact.status;

      fillAgentDropdown("editAgent", contact.agent);

      document.getElementById("editNotes").value = contact.notes || "";
      new bootstrap.Modal(document.getElementById("editContactModal")).show();
    }
  }
});

document
  .getElementById("editContactForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    if (
      currentEditIndex !== null &&
      !isNaN(currentEditIndex) &&
      currentEditIndex >= 0 &&
      currentEditIndex < contacts.length
    ) {
      const updatedContact = {
        name: document.getElementById("editName").value.trim(),
        number: document.getElementById("editNumber").value.trim(),
        status: document.getElementById("editStatus").value,
        agent: document.getElementById("editAgent").value,
        lastContact: new Date().toISOString(),
        notes: document.getElementById("editNotes").value.trim(),
      };

      if (
        !updatedContact.name ||
        !updatedContact.number ||
        !updatedContact.agent
      ) {
        alert("Name, Number, and Agent are required.");
        return;
      }

      contacts[currentEditIndex] = updatedContact;
      saveContacts();
      renderContacts();

      bootstrap.Modal.getInstance(
        document.getElementById("editContactModal")
      ).hide();

      alert("Contact updated successfully!");
      currentEditIndex = null;
    }
  });

document
  .getElementById("contactSearch")
  .addEventListener("input", function (e) {
    searchContacts(e.target.value);
  });

document
  .getElementById("uploadExcelBtn")
  .addEventListener("click", function () {
    const fileInput = document.getElementById("excelFile");
    const file = fileInput.files[0];

    if (!file) {
      alert("Please select an Excel file to import.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const newContacts = json
          .map((row) => ({
            name: (row["Name"] || "").toString().trim(),
            number: (row["Number"] || "").toString().trim(),
            status: (row["Status"] || "Cold").toString().trim(),
            agent: (row["Agent"] || "").toString().trim(),
            lastContact: (row["Last Contact"] || "").toString().trim(),
            notes: (row["Notes"] || "").toString().trim(),
          }))
          .filter((c) => c.name && c.number);

        if (newContacts.length > 0) {
          contacts = contacts.concat(newContacts);
          saveContacts();
          renderContacts();

          alert(`${newContacts.length} contacts imported successfully!`);
        } else {
          alert("No valid contacts found. Check headers/data.");
        }
      } catch (err) {
        console.error("Excel import error:", err);
        alert("Error processing Excel file.");
      } finally {
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("importExcelModal")
        );
        modal.hide();
        fileInput.value = "";
      }
    };
    reader.onerror = () => alert("Error reading file. Try again.");
    reader.readAsArrayBuffer(file);
  });

// Chat Ball
document.getElementById("chatBallBtn").onclick = function () {
  document.getElementById("chatBallModal").classList.add("active");
};
document.getElementById("chatBallForm").onsubmit = function (e) {
  e.preventDefault();
  document.getElementById("chatBallSuccess").style.display = "block";
  setTimeout(function () {
    document.getElementById("chatBallSuccess").style.display = "none";
    document.getElementById("chatBallModal").classList.remove("active");
    document.getElementById("chatBallForm").reset();
  }, 2000);
};

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  location.href = "login.html";
});

window.addEventListener("storage", (e) => {
  if (e.key === CONTACTS_STORAGE_KEY) {
    const fresh = loadContacts();
    if (fresh) {
      contacts = fresh;
      renderContacts();
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  refreshAgentDropdowns();
  renderContacts();
});

