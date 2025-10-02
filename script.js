document.addEventListener("DOMContentLoaded", () => {
  // Hero image toggle
  const toggleImageBtn = document.getElementById("toggleImage");
  const profileImg = document.getElementById("profileImg");

  if (toggleImageBtn && profileImg) {
    toggleImageBtn.addEventListener("click", () => {
      if (profileImg.style.display === "none") {
        profileImg.style.display = "block";
        toggleImageBtn.textContent = "Hide me";
      } else {
        profileImg.style.display = "none";
        toggleImageBtn.textContent = "Show me";
      }
    });
  }

  // Dark Mode Toggle with localStorage
  const darkToggle = document.getElementById("darkModeToggle");
  if (darkToggle) {
    // Load saved theme
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
      darkToggle.textContent = "☀️";
    } else {
      darkToggle.textContent = "🌙";
    }

    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const isDark = document.body.classList.contains("dark-mode");
      darkToggle.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  // Scroll Animation with Intersection Observer
  const sections = document.querySelectorAll("[data-animate]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible"); // Reset animation when out of view
        }
      });
    },
    {
      threshold: 0.2, // Trigger when 20% of the section is visible
      rootMargin: "0px 0px -50px 0px" // Trigger slightly before fully in view
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Nav Link Click Animation
  const navLinks = document.querySelectorAll(".nav-links a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default jump
      const targetId = link.getAttribute("href").substring(1); // Get section ID
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Reset animation state
        targetSection.classList.remove("is-visible");

        // Scroll to section smoothly
        targetSection.scrollIntoView({ behavior: "smooth" });

        // Trigger animation after a short delay to ensure visibility
        setTimeout(() => {
          targetSection.classList.add("is-visible");
        }, 100); // Adjust delay if needed
      }

      // Update active link
      navLinks.forEach((nav) => nav.classList.remove("active"));
      link.classList.add("active");
    });
  });
});