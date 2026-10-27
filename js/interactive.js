/**
 * SKILLSCAPE Phase 1 - Interactive Diagnostic & Pathfinder Engine
 * Implements the Flow: INTEREST -> FIELD -> SKILLS -> LEARNING -> PROJECTS -> POSSIBILITIES
 */

const PATHFINDER_DATA = {
  aec: {
    interest: "Spaces, Architecture & Interior Environments",
    field: "AEC & Interior Design",
    skills: ["AutoCAD 2D/3D", "Revit BIM Architecture", "SketchUp", "3ds Max / V-Ray", "Coohom", "Cost Estimation & BOQ"],
    learning: "Hands-on studio workflows, technical drafting, building information modeling, material specifications, and lighting visualization.",
    projects: "Complete 3BHK Luxury Interior Concept, Commercial BIM Model with MEP coordination, and Photorealistic Exterior Walkthrough.",
    possibilities: ["Interior Designer", "BIM Modeler / Coordinator", "Architectural Drafter", "3D Visualizer"],
    recommendedCourse: "Interior Design Course + Internship",
    courseLink: "course-interior-design.html"
  },
  security: {
    interest: "Cyber Defense, Ethical Hacking & Systems Security",
    field: "Cybersecurity & Offensive Defense",
    skills: ["Network Security", "Ethical Hacking (CEH)", "Penetration Testing (CPENT)", "SOC Analysis", "Bug Bounty Hunting"],
    learning: "Live cyber labs, Kali Linux toolkits, vulnerability assessment, web app security testing, and defensive monitoring.",
    projects: "Simulated Corporate Penetration Test Report, Live Vulnerability Assessment, and Bug Bounty Disclosure Portfolio.",
    possibilities: ["Junior Penetration Tester", "SOC Analyst Tier 1", "Information Security Specialist", "Bug Bounty Hunter"],
    recommendedCourse: "Cybersecurity Program with OpenAI",
    courseLink: "course-cybersecurity.html"
  },
  immersive: {
    interest: "Virtual Worlds, 3D Real-Time Graphics & Game Engines",
    field: "Immersive Technology, AR/VR & Visualization",
    skills: ["Unreal Engine 5", "Unity 3D", "D5 Render", "Lumion", "Real-time Lighting & Shaders"],
    learning: "Interactive environment design, real-time spatial rendering, VR walkthrough creation, and material authoring.",
    projects: "VR Architectural Walkthrough for Meta Quest, Interactive Metaverse Showroom, and Cinematic Cinematic CGI reel.",
    possibilities: ["Real-time 3D Artist", "VR/AR Environment Creator", "Architectural Visualization Lead", "Virtual Production Artist"],
    recommendedCourse: "AI-Powered AR/VR",
    courseLink: "course-arvr.html"
  },
  civil: {
    interest: "Construction Quantities, Budgets, Planning & Structural Tech",
    field: "B.Tech Software & Project Engineering",
    skills: ["CostX Quantity Takeoff", "Planswift", "Primavera P6 Scheduling", "Advanced MS Excel", "ETABS/STAAD.Pro"],
    learning: "Real building drawings analysis, measurement codes, digital takeoffs, cost estimating, and project gantt timeline planning.",
    projects: "High-Rise Residential Quantity Estimate & BOQ, Project Schedule baseline in Primavera P6, and Structural Analysis report.",
    possibilities: ["Quantity Surveyor", "Cost Estimator", "Project Planning Engineer", "Structural BIM Technician"],
    recommendedCourse: "Quantity Estimation (CostX & Planswift)",
    courseLink: "courses.html?cat=btech"
  },
  code: {
    interest: "Building Web Applications, Modern Interfaces & Digital Products",
    field: "Full-Stack Web Development & Data Science",
    skills: ["Modern JavaScript & TypeScript", "React", "Node.js & Python APIs", "Database Design", "Cloud Deployment"],
    learning: "Component architecture, API integration, database modeling, responsive UI systems, and live web apps.",
    projects: "Full-Stack SaaS Application with authentication, Interactive Analytics Dashboard, and REST API microservices.",
    possibilities: ["Full-Stack Developer", "Frontend Engineer", "Backend Developer", "Web Application Consultant"],
    recommendedCourse: "Full-Stack Web Development (Coming Soon)",
    courseLink: "courses.html?cat=web"
  }
};

function initPathfinder() {
  const pathfinderContainer = document.getElementById('interactivePathfinder');
  if (!pathfinderContainer) return;

  const selectorButtons = pathfinderContainer.querySelectorAll('.interest-choice-btn');
  const fieldDisplay = document.getElementById('pathField');
  const skillsList = document.getElementById('pathSkillsList');
  const learningDesc = document.getElementById('pathLearning');
  const projectsDesc = document.getElementById('pathProjects');
  const possibilitiesList = document.getElementById('pathPossibilitiesList');
  const ctaBtn = document.getElementById('pathCtaBtn');

  function updatePathfinder(key) {
    const data = PATHFINDER_DATA[key];
    if (!data) return;

    if (fieldDisplay) fieldDisplay.textContent = data.field;
    if (learningDesc) learningDesc.textContent = data.learning;
    if (projectsDesc) projectsDesc.textContent = data.projects;

    if (skillsList) {
      skillsList.innerHTML = data.skills.map(s => `<li class="meta-pill">${s}</li>`).join('');
    }

    if (possibilitiesList) {
      possibilitiesList.innerHTML = data.possibilities.map(p => `<span class="tool-badge">${p}</span>`).join('');
    }

    if (ctaBtn) {
      ctaBtn.textContent = `Explore ${data.recommendedCourse} →`;
      ctaBtn.setAttribute('href', data.courseLink);
    }
  }

  selectorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      selectorButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute('data-interest-key');
      updatePathfinder(key);
    });
  });

  // Default selection
  updatePathfinder('aec');
}

document.addEventListener('DOMContentLoaded', () => {
  initPathfinder();
});
