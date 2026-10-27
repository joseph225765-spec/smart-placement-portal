const jobs = [
  { role: "Frontend Developer Intern", company: "Bright Labs", location: "Bengaluru", type: "Internship" },
  { role: "Data Analyst Trainee", company: "Insight Works", location: "Hyderabad", type: "Entry level" },
  { role: "UI/UX Design Intern", company: "Pixel Studio", location: "Remote", type: "Internship" },
  { role: "Software Engineer Graduate", company: "Northstar Tech", location: "Pune", type: "Entry level" },
  { role: "Marketing Intern", company: "Grow Together", location: "Mumbai", type: "Internship" },
  { role: "Backend Developer Intern", company: "Cloudline", location: "Remote", type: "Internship" },
];

const searchInput = document.querySelector("#job-search");
const jobList = document.querySelector("#job-list");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");

function renderJobs() {
  const query = searchInput.value.trim().toLowerCase();
  const matches = jobs.filter((job) =>
    [job.role, job.company, job.location, job.type].some((value) =>
      value.toLowerCase().includes(query)
    )
  );

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
const savedProfile = JSON.parse(localStorage.getItem("studentProfile") || "null");

if (savedProfile) {
  profileForm.elements.name.value = savedProfile.name;
  profileForm.elements.course.value = savedProfile.course;
  profileForm.elements.skills.value = savedProfile.skills;
  profileMessage.textContent = `Welcome back, ${savedProfile.name}! Your profile is saved on this computer.`;
}

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const profile = {
    name: profileForm.elements.name.value.trim(),
    course: profileForm.elements.course.value.trim(),
    skills: profileForm.elements.skills.value.trim(),
  };
  localStorage.setItem("studentProfile", JSON.stringify(profile));
  profileMessage.textContent = `Profile saved for ${profile.name}.`;
});
