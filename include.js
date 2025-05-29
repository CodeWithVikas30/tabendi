document.addEventListener("DOMContentLoaded", function () {
  const includeElements = document.querySelectorAll('[include-html]');
  
  includeElements.forEach(async (el) => {
    const file = el.getAttribute("include-html");
    try {
      const response = await fetch(file);
      const content = await response.text();
      el.innerHTML = content;
      el.removeAttribute("include-html");
    } catch (error) {
      el.innerHTML = "Content not found.";
    }
  });
});

// main.js

// Step 1: Load header.html into #header-container
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header-container').innerHTML = data;

    // Step 2: Attach click event to login button AFTER header is loaded
    const loginBtn = document.getElementById('loginBtn');
    loginBtn.addEventListener('click', function (e) {
      e.preventDefault();

      // Load login_content.html into modal content
      fetch('login_content.html')
        .then(response => response.text())
        .then(html => {
          document.getElementById('modalContent').innerHTML = html;

          // Show modal
          const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
          loginModal.show();
        });
    });
  });

