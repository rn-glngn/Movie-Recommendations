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

  const navHasSubmenu = document.querySelector(".nav-has-submenu");

  // Enable click-to-open submenu for devices <= 1024px
  if (navHasSubmenu && window.matchMedia("(max-width: 1024px)").matches) {
    navHasSubmenu.addEventListener("click", (e) => {
      e.stopPropagation();
      navHasSubmenu.classList.toggle("open");
    });

    // Close submenu when clicking outside
    document.addEventListener("click", (e) => {
      if (!navHasSubmenu.contains(e.target)) {
        navHasSubmenu.classList.remove("open");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const submenuParent = document.querySelector(".nav-submenu-parent");

  if (submenuParent && window.matchMedia("(max-width: 1024px)").matches) {
    submenuParent.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent click bubbling
      submenuParent.classList.toggle("open");
    });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (!submenuParent.contains(e.target)) {
        submenuParent.classList.remove("open");
      }
    });
  }
});
