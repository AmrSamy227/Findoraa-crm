# FINDORA CRM — Real Estate Management Dashboard (Front-End)

FINDORA is a front-end CRM/dashboard for real-estate teams. It helps manage projects, units/properties, clients, HR/agents performance, notifications, calendar events, and financial reports — all in one place.  
The project is built using plain HTML/CSS/JavaScript with Bootstrap, and uses **localStorage** for persistence (no backend required).

---

## Features

- **Dashboard**
  - High-level KPIs and quick navigation across modules.
- **Projects & Units**
  - Manage real-estate projects and their units.
  - Status tracking (Available / Pending / Sold).
  - Agent assignment and deal logging.
- **Properties**
  - Detailed unit/property view with:
    - Image gallery
    - Map embed
    - Status control
    - Agent assignment
- **Search**
  - Advanced unit filters.
  - Search mode for projects and units.
- **Clients / Customers**
  - Store and manage client records.
  - Track related activity and deals.
- **HR Dashboard**
  - Agent performance (deals, revenue, commissions).
  - Status tracking for employees/agents.
- **Reports**
  - Financial overviews (projects summary, units breakdown, agents performance, revenue).
  - Print/Export friendly layout.
- **Notifications**
  - Central inbox for unit/project/deal events.
  - Read/unread support and filtering.
- **Calendar**
  - Scheduling and follow-up view.
- **Authentication (UI-side)**
  - Login / Signup UI with role-based gates in the interface.

---

## Tech Stack

- **HTML5 / CSS3 / JavaScript (ES6)**
- **Bootstrap 5** (layout and base components)
- **Font Awesome / Bootstrap Icons**
- **localStorage** (client-side persistence)
- **Google Maps Embed** (location preview)

---

## Project Structure

```txt
FTEST/
├─ CSS/                              # Stylesheets per page + shared libs
│  ├─ About.css                      # About page styles
│  ├─ bootstrap.css                  # Bootstrap local build (optional if using CDN)
│  ├─ calendar.css                   # Calendar page styles
│  ├─ clients.css                    # Clients page styles
│  ├─ customers.css                  # Customers page styles
│  ├─ Dashboard.css                  # Main dashboard styles
│  ├─ hr-dashboard.css               # HR dashboard styles
│  ├─ index.css                      # Landing/index styles
│  ├─ login.css                      # Login page styles
│  ├─ notifications.css              # Notifications page styles
│  ├─ project-units.css              # Project units page styles
│  ├─ properities.css                # Properties overview styles (legacy name)
│  ├─ properties.css                 # Properties overview styles (current)
│  ├─ property.css                   # Single property details styles
│  ├─ reports.css                    # Reports page styles
│  ├─ search.css                     # Search page styles
│  ├─ signup.css                     # Signup page styles
│  └─ styles.css                     # Global theme + shared UI components
│
├─ img/                              # Static images/icons/logos
│
├─ JS/                               # Scripts per page + shared libs
│  ├─ auth-utils.js                  # Auth helpers, roles, guards
│  ├─ bootstrap.js                   # Bootstrap JS bundle (optional if using CDN)
│  ├─ calendar.js                    # Calendar page logic
│  ├─ clients.js                     # Clients management logic
│  ├─ customers.js                   # Customers management logic
│  ├─ Dashboard.js                   # Dashboard KPIs/data aggregation
│  ├─ hr-dashboard.js                # HR/agents metrics & operations
│  ├─ index.js                       # Landing/index scripts
│  ├─ login.js                       # Login logic
│  ├─ notifications.js               # Notifications CRUD + counters
│  ├─ project-units.js               # Project → units management logic
│  ├─ properties.js                  # Properties overview logic
│  ├─ property.js                    # Property details logic
│  ├─ reports.js                     # Reports calculations + rendering
│  ├─ search.js                      # Units + projects search/filtering
│  └─ signup.js                      # Signup logic
│
├─ About.html                        # About page
├─ calendar.html                     # Calendar page
├─ clients.html                      # Clients page
├─ customers.html                    # Customers page
├─ dashbord.html                     # Main dashboard page
├─ hr-dashboard.html                 # HR dashboard page
├─ index.html                        # Landing / home page
├─ login.html                        # Login page
├─ notifications.html                # Notifications center
├─ pricing.html                      # Pricing page
├─ project-units.html                # Project units page
├─ properities.html                  # Properties overview page (legacy name)
├─ properties.html                   # Properties overview page (current)
├─ property.html                     # Single property details page
├─ reports.html                      # Financial reports page
├─ search.html                       # Search page
├─ signup.html                       # Signup page
└─ Readme.md                         # Project documentation



Local Storage Data Model
The app stores all data under a few main keys:

projectsData
Array of projects. Each project carries an internal units[] array.

employeesData
Employee/Agent list used by HR, property assignment, and reports.

clientsData / customersData
Stored clients/customers records.

notificationsData
Notifications with type, read/unread, timestamp, and optional agent linkage.

currentUser
Active session object after login.

Example: Project Object
js
Copy code
{
  id: "P1001",
  name: "Creek Town",
  location: "New Cairo",
  img: "img/projects/creek.jpg",
  units: [
    {
      id: "U101",
      name: "Creek Apt 101",
      type: "Apartment",
      price: "EGP 4,500,000",
      area: "128 m²",
      rooms: 3,
      status: "available",
      payment: "Installments",
      delivery: "2025 Q4",
      assignedAgent: 2,
      images: ["img/u101-1.jpg", "img/u101-2.jpg"],
      updatedAt: "2025-12-01T12:00:00.000Z"
    }
  ]
}
Example: Notification Object
js
Copy code
{
  id: "uuid",
  type: "deal",
  title: "Deal Closed: Creek Apt 101",
  text: "Unit sold by Ahmed Hassan. Amount: EGP 4,500,000",
  agentName: "Ahmed Hassan",
  agentId: 2,
  timestamp: "2025-12-01T12:00:00.000Z",
  read: false
}
