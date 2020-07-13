
const faders = document.querySelectorAll(".fade-in");

const menuBtn = document.querySelector(".menu-btn");
const menuItems = document.querySelector(".menu-items");
const menuLinks = document.querySelector(".hide-menu");

// For Hamburger Menu Animation
menuBtn.addEventListener("click", () => {
  if(menuBtn.classList.contains("open")) {
    menuBtn.classList.remove("open");
    menuItems.classList.remove("show");

    menuItems.classList.add("hide");
    setTimeout(() => {
    menuItems.classList.remove("hide");
  }, 750);
  } else {
    menuBtn.classList.add("open");
    menuItems.classList.add("show");

    menuItems.classList.remove("hide");
  }
});

// For Smooth Appear on Scroll through the page
const appearOptions = {
  threshold: 0
  // rootMargin: "0px 0px -300px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

// For Smooth Scroll
$(document).ready(function() {
  let scrollLink = $(".scroll");

  // Smooth scroll
  scrollLink.click(function(event) {
    event.preventDefault();
    $("body, html").animate({
      scrollTop: $(this.hash).offset().top
    },500)
  });
});
