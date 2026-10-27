let jobs = [];

const searchInput = document.querySelector("#job-search");
const jobList = document.querySelector("#job-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

async function renderJobs() {
  const query = searchInput.value.trim();
  try {
    const response = await fetch(`/api/jobs?search=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error("Could not load opportunities.");
    jobs = await response.json();
  } catch (error) {
    resultCount.textContent = "Could not load jobs. Please make sure the server is running.";
    jobList.replaceChildren();
    return;
  }
  const matches = jobs;

  jobList.replaceChildren();
  for (const job of matches) {
    const card = document.createElement("article");
    card.className = "job-card";
    const type = document.createElement("span");
    type.className = "job-type";
    type.textContent = job.type;
    const title = document.createElement("h3");
    title.textContent = job.role;
    const company = document.createElement("p");
    company.textContent = job.company;
    const location = document.createElement("p");
    location.textContent = job.location;
    card.append(type, title, company, location);
    jobList.append(card);
  }
  resultCount.textContent = `${matches.length} ${matches.length === 1 ? "opportunity" : "opportunities"}`;
  emptyState.hidden = matches.length !== 0;
}

searchInput.addEventListener("input", renderJobs);
renderJobs();


const profileForm = document.querySelector("#profile-form");
const profileMessage = document.querySelector("#profile-message");
async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) throw new Error("Could not load profile.");
    const profile = await response.json();
    if (!profile) return;
    profileForm.elements.name.value = profile.name;
    profileForm.elements.course.value = profile.course;
    profileForm.elements.skills.value = profile.skills;
    profileMessage.textContent = `Welcome back, ${profile.name}! Your profile is saved.`;
  } catch (error) {
    profileMessage.textContent = "Could not connect to the server. Please try again.";
  }
}

profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const profile = {
    name: profileForm.elements.name.value.trim(),
    course: profileForm.elements.course.value.trim(),
    skills: profileForm.elements.skills.value.trim(),
  };
  try {
    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile),
    });
    const savedProfile = await response.json();
    if (!response.ok) throw new Error(savedProfile.message || "Could not save profile.");
    profileMessage.textContent = `Profile saved for ${savedProfile.name}.`;
  } catch (error) {
    profileMessage.textContent = "Could not save profile. Check the server and try again.";
  }
});

loadProfile();
