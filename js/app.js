const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".controlls");
const sectBtn = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

function pageTransitions() {
  //btn click active class
  for (let i = 0; i < sectBtn.length; i++) {
    sectBtn[i].addEventListener("click", function () {
      let currentBtn = document.querySelectorAll(".active-btn");
      currentBtn[0].className = currentBtn[0].className.replace(
        "active-btn",
        ""
      );
      this.className += " active-btn";
    });
  }
  //section active class
  allSections.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    if (id) {
      //remove selected from the other btns
      sectBtn.forEach((btn) => {
        btn.classList.remove("active");
      });
      e.target.classList.add("active");

      //hide other sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}
pageTransitions();

//theme
let themeToggle = document.querySelector(".theme_toggle");
let themeToggleIcon = document.querySelector(".theme_toggle ion-icon");
// let themeName = document.querySelector(".theme_toggle .theme-btn");
let getTheme = localStorage.getItem("theme");

if (getTheme !== null) {
  themeToggleIcon.setAttribute("name", "moon-outline");
  document.documentElement.setAttribute("theme", getTheme);
  // themeName.innerText = "dark";
} else {
  themeToggleIcon.setAttribute("name", "sunny-outline");
  // themeName.innerText = "light";
}

themeToggle.addEventListener("click", (e) => {
  e.preventDefault();
  if (!document.documentElement.hasAttribute("theme")) {
    themeToggleIcon.setAttribute("name", "moon-outline");
    document.documentElement.setAttribute("theme", "dark");
    // themeName.innerText = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    themeToggleIcon.setAttribute("name", "sunny-outline");
    document.documentElement.removeAttribute("theme", "dark");
    // themeName.innerText = "light";
    localStorage.removeItem("theme");
  }
});
//end of theme
