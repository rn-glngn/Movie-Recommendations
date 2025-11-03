function toggleDropdown() {
  const dropdown = document.getElementById("listsDropdown");
  const arrow = document.querySelector(".dropdown-arrow");

  if (dropdown.style.display === "block") {
    dropdown.style.display = "none";
    arrow.textContent = "▼";
  } else {
    dropdown.style.display = "block";
    arrow.textContent = "▲";
  }
}

// Close dropdown when clicking outside
document.addEventListener("click", function (event) {
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownMenu = document.getElementById("listsDropdown");
  const arrow = document.querySelector(".dropdown-arrow");

  if (!dropdown.contains(event.target)) {
    dropdownMenu.style.display = "none";
    arrow.textContent = "▼";
  }
});
