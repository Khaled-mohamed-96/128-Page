let navBar = document.querySelector("nav");
let navList = document.querySelectorAll("nav ul li");
let ourBoxs = document.querySelectorAll(".our-menu .box");
let lisBoxs = document.querySelectorAll(".events ul li");
let eventsBoxs = document.querySelectorAll(".events .boxs");
let optionBox = document.querySelector(".option-box");
let toggleSettings = document.querySelector(".option-box .toggle-settings");
let iconSett = document.querySelector(".option-box .toggle-settings i");
let fontColorLis = document.querySelectorAll(".option-box .font-color ul li");
let defultColorLis = document.querySelectorAll(
  ".option-box .defult-color ul li"
);
let textColorsLis = document.querySelectorAll(".option-box .text-color ul li");
let fontColor = localStorage.getItem("font-color");
let defultColor = localStorage.getItem("defult-color");
let textColor = localStorage.getItem("text-color");
let sections = document.querySelectorAll(".section");
let mobileQuery = window.matchMedia("(max-width: 767px)");
let menuButton = document.querySelector("i.menu-button");
let closeNav = document.querySelector("nav .close");
navBar.onclick = () => stopPropagation();
menuButton.onclick = (e) => {
  e.stopPropagation();
  navBar.classList.toggle("open-nav");
};
navBar.onclick = (e) => e.stopPropagation();
closeNav.onclick = () => navBar.classList.toggle("open-nav");
if (fontColor !== null) {
  handelLcoalStorage(fontColor, fontColorLis, "--font-color");
}
if (defultColor !== null) {
  handelLcoalStorage(defultColor, defultColorLis, "--main-color");
}
if (textColor !== null) {
  handelLcoalStorage(textColor, textColorsLis, "--text-color");
}
optionBox.onclick = (e) => e.stopPropagation();

document.onclick = (e) => {
  if (e.target !== optionBox && optionBox.classList.contains("open")) {
    iconSett.click();
  }
  if (e.target !== navBar && navBar.classList.contains("open-nav")) {
    navBar.classList.toggle("open-nav");
  }
};
function handelLcoalStorage(nameLoc, eleLoop, nameVar) {
  document.documentElement.style.setProperty(nameVar, nameLoc);
  eleLoop.forEach((e) => {
    e.classList.remove("active");
    if (e.dataset.color === nameLoc) {
      e.classList.add("active");
    }
  });
}
toggleSettings.addEventListener("click", () => {
  iconSett.classList.toggle("fa-spin");
  optionBox.classList.toggle("open");
});
removeAndAddCalss(fontColorLis);
fontColorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--font-color",
      e.target.dataset.color
    );
    localStorage.setItem("font-color", e.target.dataset.color);
  });
});
removeAndAddCalss(defultColorLis);
defultColorLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("defult-color", e.target.dataset.color);
  });
});
removeAndAddCalss(textColorsLis);
textColorsLis.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--text-color",
      e.target.dataset.color
    );
    localStorage.setItem("text-color", e.target.dataset.color);
  });
});
removeAndAddCalss(navList);
navList.forEach((li) => {
  li.addEventListener("click", (e) => {
    document
      .querySelector(e.currentTarget.dataset.sectionclass)
      .scrollIntoView({
        behavior: "smooth",
      });
  });
});
function removeAndAddCalss(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      elements.forEach((ele) => {
        ele.classList.remove("active");
      });
      e.currentTarget.classList.add("active");
      e.preventDefault();
    });
  });
}

window.onscroll = function (e) {
  if (!mobileQuery.matches) {
    if (window.scrollY > 0) {
      document.querySelector("nav").classList.add("sticky");
    } else {
      document.querySelector("nav").classList.remove("sticky");
    }
  } else {
    document.querySelector("nav").classList.remove("sticky");
    navList[0].classList.add("active");
  }
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navList.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("data-sectionClass") === `.${currentSection}`) {
      link.classList.add("active");
    }
  });
  checkVisibility(ourBoxs);
  checkVisibility(eventsBoxs);
};
function checkVisibility(elements) {
  elements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      element.classList.add("visible");
    } else {
      element.classList.remove("visible");
    }
  });
}
lisBoxs.forEach((li) => {
  li.addEventListener("click", (e) => {
    lisBoxs.forEach((li) => {
      li.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
    eventsBoxs.forEach((box) => {
      box.style.display = "none";
    });
    document.querySelector(e.target.dataset.selection).style.display = "grid";
  });
});
initMap();
function initMap() {
  var uluru = { lat: 31.4118676477788, lng: 31.812026281811164 };
  var map = new google.maps.Map(document.querySelector("#map"), {
    zoom: 10,
    center: uluru,
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}
