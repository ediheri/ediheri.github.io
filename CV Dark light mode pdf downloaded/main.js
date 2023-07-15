const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
    });
  }
};
showMenu("nav-toggle", "nav-menu");

/*==remove menu mobile==*/
const navLink = document.querySelectorAll(".nav_link");
function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*==scroll active section==*/
const sections = document.querySelectorAll("section[id]");
function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".nav_menu a[href*=" + sectionId + "]");
      // .classList.add("active-link");
    } else {
      document.querySelector(".nav_menu a[href*=" + sectionId + "]");
      // .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*=== show scroll to ===*/
function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollTop);

/* === dark light theme ===*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon);
});

/* === reduce the size for a4 sheet === */
function scaleCv() {
  document.body.classList.add("scale-cv");
}

/* === remove the size when being downloaded === */
function removeScale() {
  document.body.classList.remove("scale-cv");
}

/* === generate pdf === */
let areaCv = document.getElementById("area-cv");
function generateResume() {
  html2pdf(areaCv);
}

let resumeButton = document.getElementById("resume-button");

/* === html2pdf option === */
let opt = {
  margin: 0,
  filename: "myCv.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

function generateResume() {
  html2pdf(areaCv, opt);
}

resumeButton.addEventListener("click", () => {
  scaleCv();

  generateResume();

  setTimeout(removeScale, 5000);
});
