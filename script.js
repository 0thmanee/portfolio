const body = document.querySelector("body");
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navList = document.querySelector(".nav_list");
const links = document.querySelectorAll(".links");
const logo = document.querySelector(".logo");
const navIcon = document.querySelector(".nav_icon");
const overlay = document.querySelector(".overlay");
const switchmode = document.querySelector(".switchmode");
const switchIcon = document.querySelector(".switchmode i");
const topIcon = document.querySelector(".top_icon");
const section1 = document.querySelector(".hero_section");
const imgsChanged = document.querySelectorAll(".changed");
const projects = document.querySelectorAll(".project");
const moreProjects = document.querySelector(".more");
const projectsHidden = document.querySelectorAll(".project_hidden");
const standBtns = document.querySelectorAll(".standart");
const showElements = document.querySelectorAll(".show_el");
const mediaQuery = window.matchMedia("(max-width: 62rem)");

// Wait promise
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

// nav icon's click event

const showNavList = function () {
  overlay.classList.toggle("hidden");
  wait(0.05).then(() => overlay.classList.toggle("overlay--active"));
  navIcon.classList.toggle("nav_icon--active");
  navList.classList.toggle("nav_list--active");
};

navIcon.addEventListener("click", showNavList);
overlay.addEventListener("click", showNavList);

navList.addEventListener("click", function (e) {
  const clicked = e.target.closest(".link");
  if (clicked && navList.classList.contains("nav_list--active")) {
    wait(0.5).then(() => {
      overlay.classList.add("hidden");
      overlay.classList.remove("overlay--active");
      navIcon.classList.remove("nav_icon--active");
      navList.classList.remove("nav_list--active");
    });
  }
});
// change opacity of the anchors
const handleHover = function (e) {
  const link = e.target.closest(".link");
  if (link) {
    const siblings = link.closest(".links").querySelectorAll(".link");
    siblings.forEach((l) => {
      if (l !== link) {
        l.style.opacity = this;
      }
    });
  }
};
links.forEach((link) => {
  link.addEventListener("mouseover", handleHover.bind(0.5));
  link.addEventListener("mouseout", handleHover.bind(1));
});

// Dark mode

switchmode.addEventListener("click", function () {
  switchIcon.classList.toggle("fa-sun");
  switchIcon.classList.toggle("fa-moon");
  body.classList.toggle("dark_mode");
  imgsChanged.forEach((img) => {
    img.src = `./media/${img.alt}${
      switchIcon.classList.contains("fa-moon") ? 1 : 2
    }.png`;
  });
});
/* document.documentElement.style.setProperty("--main-color", "red"); */

// Back to top of the page
const goTop = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    topIcon.classList.remove("hidden");
  } else topIcon.classList.add("hidden");
};
const topObserver = new IntersectionObserver(goTop, {
  root: null,
  threshold: 0,
});
topObserver.observe(section1);

// Scroll to top
topIcon.addEventListener("click", function (e) {
  header.scrollIntoView({ behavior: "smooth" });
});

// Show hidden projects
moreProjects.addEventListener("click", function (e) {
  e.preventDefault();
  moreProjects.style.display = "none";
  projectsHidden.forEach((pr) => pr.classList.remove("project_hidden"));
});
///home/othmane/Desktop/menu

// Place rojects button
file: if (mediaQuery.matches) {
  standBtns.forEach((btn) => btn.classList.add("project_hidden"));
  projects.forEach((p, i) => {
    let projecdomain;
    let projectHref;
    if (projects[i].querySelector("img").alt == "bugbeat")
      projecdomain = ".tech";
    else if (
      projects[i].querySelector("img").alt == "2baconcours" ||
      projects[i].querySelector("img").alt == "bsecure-club"
    )
      projecdomain = ".com";
    else if (projects[i].querySelector("img").alt == "kickspace")
      projecdomain = ".com";
    else projecdomain = ".netlify.app";
    projectHref = `${
      projects[i].querySelector("img").alt == "kickspace"
        ? "https://www.figma.com/file/EHAWbyRC6AoptDPGDrYojx/design2?type=design&node-id=1%3A2&mode=design&t=cSmVHixfWn7zMgoB-1"
        : "https://" + projects[i].querySelector("img").alt + projecdomain
    }`;
    p.insertAdjacentHTML(
      "beforeend",
      `<a class="btn sec_btn standart" target="_blank" href="${projectHref}">See project</a
>`
    );
  });
}
// Sections animation
window.addEventListener("scroll", function () {
  showElements.forEach((element, index) => {
    const elementPosition = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementPosition < windowHeight) {
      if (element.classList.contains("show_el--left")) {
        element.classList.add("animate__fadeInLeft");
      } else element.classList.add("animate__fadeInTop");
    }
  });
});
