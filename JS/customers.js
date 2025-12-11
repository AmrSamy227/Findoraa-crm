const companies = [
  {
    id: 1,
    name: "Real Estate Pro",
    icon: "🏢",
    description:
      "Leading property management solutions for modern brokers",
    products: [
      "Property Listings",
      "Client Manager",
      "Deal Tracker",
      "Analytics",
    ],
    properties: "2,450",
    clients: "850",
    deals: "340",
  },
  {
    id: 2,
    name: "BuildTech Solutions",
    icon: "🏗️",
    description: "Construction and real estate development platform",
    products: [
      "Project Manager",
      "Budget Tracker",
      "Timeline Tool",
      "Reports",
    ],
    properties: "1,800",
    clients: "620",
    deals: "250",
  },
  {
    id: 3,
    name: "Urban Properties",
    icon: "🏙️",
    description:
      "Specializing in urban residential and commercial spaces",
    products: [
      "Virtual Tours",
      "Property Search",
      "Investment Analysis",
      "CRM",
    ],
    properties: "3,120",
    clients: "1,200",
    deals: "520",
  },
  {
    id: 4,
    name: "LandMark Realty",
    icon: "🗺️",
    description: "Geographic-based property discovery and management",
    products: [
      "Map Integration",
      "Location Analytics",
      "Neighborhood Insights",
      "Comparables",
    ],
    properties: "2,890",
    clients: "950",
    deals: "410",
  },
  {
    id: 5,
    name: "InvestRight Capital",
    icon: "💰",
    description: "Investment-focused real estate platform for portfolios",
    products: [
      "Portfolio Manager",
      "ROI Calculator",
      "Market Analysis",
      "Funding Tools",
    ],
    properties: "1,560",
    clients: "420",
    deals: "180",
  },
  {
    id: 6,
    name: "HomeConnect Hub",
    icon: "🏠",
    description: "Residential real estate network for agents and buyers",
    products: [
      "Agent Dashboard",
      "MLS Integration",
      "Marketing Suite",
      "Client Portal",
    ],
    properties: "4,200",
    clients: "1,850",
    deals: "680",
  },
  {
    id: 7,
    name: "Commercial Nexus",
    icon: "🏛️",
    description: "Commercial property trading and management hub",
    products: [
      "Space Optimizer",
      "Lease Manager",
      "Tenant Portal",
      "Compliance Tools",
    ],
    properties: "980",
    clients: "340",
    deals: "120",
  },
  {
    id: 8,
    name: "Digital Estate",
    icon: "💻",
    description: "Tech-enabled property solutions for the modern era",
    products: [
      "AI Search",
      "Smart Pricing",
      "Digital Contracts",
      "E-Signature",
    ],
    properties: "3,540",
    clients: "1,450",
    deals: "580",
  },
];

function renderCompanies() {
  const grid = document.getElementById("companiesGrid");
  grid.innerHTML = companies
    .map(
      (company) => `
    <div class="company-card">
      <div class="company-icon">${company.icon}</div>
      <h3>${company.name}</h3>
      <p class="company-description">${company.description}</p>
      
      <div class="company-stats">
        <div class="stat">
          <div class="stat-number">${company.properties}</div>
          <div class="stat-label">Properties</div>
        </div>
        <div class="stat">
          <div class="stat-number">${company.clients}</div>
          <div class="stat-label">Clients</div>
        </div>
        <div class="stat">
          <div class="stat-number">${company.deals}</div>
          <div class="stat-label">Deals</div>
        </div>
      </div>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", function () {
  renderCompanies();

  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
