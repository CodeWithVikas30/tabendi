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


// Function to include HTML content dynamically
// This function is used to include HTML content dynamically    
  function includeHTML() {
  var z, i, elmnt, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    file = elmnt.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          elmnt.removeAttribute("include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
}
includeHTML();


window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
  }
});


