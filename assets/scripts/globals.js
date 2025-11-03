document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");

  // Toggle dropdown when clicking the icon
  menuIcon.addEventListener("click", (e) => {
    e.stopPropagation();
    menuIcon.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuIcon.contains(e.target)) {
      menuIcon.classList.remove("active");
    }
  });
});
