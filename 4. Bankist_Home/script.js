"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// Change the for loop into a forEach
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////////////////
//LECTURE: Event Delegation:Implementing Page Navigation

//The following code on scrolling has been taken from lecture on Implementing Smooth Scrolling
////////////////////////////////////
//Button Scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //getBoundClientRect() gives the location and size of an element, its x-distance, y-distance, height, width, etc.
  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  //Tell us where the scroll position is
  console.log(
    "height/width of viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //Tell us viewport height and width

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });

  section1.scrollIntoView({ behavior: "smooth" });
});
//////////////////////////////////////

//Page navigation

// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });
//This code works perfectly but is inefficient forEach creates an instance of it for each navLink
//A better solution would be to attach it to a parent element and have it run when only when the link is clicked

//1. Add event listener to parent element
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  //2. Determine what element originated the event
  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

/*
////////////////////////////////////////
//LECTURE: Selecting, Creating and Deleting Elements

console.log(document.documentElement);
//Logs Entire HTML element, needs to be selected for implementing CSS changes
console.log(document.head);
console.log(document.body);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
console.log(allSections);
//querySelectors return node lists

document.getElementById("section--1");
const allButtons = document.getElementsByTagName("button");
console.log(allButtons);
//getElementsByTagName returns a HTML collection which updates itself, as opposed to a node list which doesn't

document.getElementsByClassName("btn");
//getElementsByClassName also returns a HTML collection

// Creating and inserting elements

//Create element
const message = document.createElement("div"); //creates a div element
message.classList.add("cookie-message"); //adds a class to the div element
message.innerHTML =
  "We use cookies for improved functionality and analytics. <button class='btn btn--close-cookies'>Got it!</button"; //adds in HTML

//Add element to the HTML file
// header.prepend(message); //prepend adds to top
header.append(message); //append adds to bottom
// header.prepend(message.cloneNode(true)); //cloneNode to copy element

// header.before(message);
header.after(message);

// Delete element
document
  .querySelector(".btn--close-cookies")
  .addEventListener("click", function () {
    message.remove(); //remove to delete elements
  });

  ////////////////////////////////////////
//LECTURE: Styles, Attributes and Classes

// Styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";
//JS added style like this are effectively inline styles

console.log(message.style.height);
console.log(message.style.backgroundColor);
//Using .style we can only access inline styles. This results in the backgroundColor being logged but not the height

console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).backgroundColor);
//getComputedStyle allows us to check attributes that are only available on the stylesheet

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";
//This adds 30px to the elements height. The 10 passed in as the second argument tells JS we are using base-10 numbers and not binary
console.log(getComputedStyle(message).height);

// Working with CSS variables

//setProperty()
document.documentElement.style.setProperty("--color-primary", "orangered"); //First parameter selects element, second is the value

// Attributes
const logo = document.querySelector(".nav__logo");

//We can check standard attributes using the log
console.log(logo.alt);
console.log(logo.className);
console.log(logo.designer); //Non-standard, doesn't work
console.log(logo.getAttribute("designer")); //For non-standard, use getAttribute()

//To change attribute
logo.alt = "Beautiful minimalist logo";
console.log(logo.alt);

//To set attribute
logo.setAttribute("company", "Bankist");

//For image sources
console.log(logo.src); //Logs the absolute link of the entire page rather than the image src
console.log(logo.getAttribute("src")); //Logs the relative link of the image which is what we want

//For links
const link = document.querySelector(".nav__link--btn");
console.log(link.href); //Logs http://127.0.0.1:8080/?#
console.log(link.getAttribute("href")); //Logs #
//Without getAttribute returns the absolute link, without it returns the link as it is written in the HTML

// Data Attributes - attributes that must begin with "data-"...
console.log(logo.dataset.versionNumber); //Logs 3.0
//In HTML, the attribute name is written "data-version-number", so must remember to use camelCase when writing it in JS

// Classes- different methods
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c"); //not called includes() like arrays
//logo.className= "Jonas"; //DON'T USE

////////////////////////////////////////
//LECTURE: Implementing Smooth Scrolling

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  //getBoundClientRect() gives the location and size of an element, its x-distance, y-distance, height, width, etc.
  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  //Tell us where the scroll position is
  console.log(
    "height/width of viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  //Tell us viewport height and width

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );
  //Using the co-ordinates provided by getBoundingClientRect, we tell JS where to scroll to when the user clicks
  //We added in the page-Offsets so that the browser scrolled in relation to the document rather than in relation to the viewport window which it would do otherwise

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth",
  // });
  //If we make the scrollTo input an object we can add in a behaviour property and set its value to "smooth" for a smooth scroll transition

  section1.scrollIntoView({ behavior: "smooth" });
  //A much easier, more modern way of doing this task is by using scrollIntoView()
});

////////////////////////////////////////
//LECTURE: Types of Events and Event Handlers

const h1 = document.querySelector("h1");

const alertH1 = function (e) {
  alert("addEventListener: Great! You are reading the heading!");

  // h1.removeEventListener("mouseenter", alertH1);
  // removeEventListener prevents event from happening over and over again
};

h1.addEventListener("mouseenter", alertH1);
//mouseenter is like CSS hover, it occurs when the mouse is over the element

setTimeout(() => h1.removeEventListener("mouseenter", alertH1), 3000);

// h1.onmouseenter = function (e) {
//   alert("onmouseenter: Great! You are reading the heading!");
// };
//Using on-event listeners like onmouseenter or onclick is a litte outdated and so it is better to use addEventListener()

////////////////////////////////////////
// LECTURE: Event Propagation in Practice

//rgb(255, 255, 255) - rgb values range between 0 and 255

//Generating a random color
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

//Change element background to random color when clicked
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("LINK", e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  //Stop propagation
  // e.stopPropagation();
});

//Also change parent element background to random color when clicked
document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

//Also change parent's parent element background to random color when clicked
document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
});

//e.target is which element the click originated from
//e.currentTarget is the element that is currently being affected
//This is confirmed by e.currentTarget === this returning true
//stopPropagation() stops the event from "bubbling up" to the parent elements so that they are not affected

////////////////////////////////////////
//LECTURE: DOM Traversing

const h1 = document.querySelector("h1");

//Going downwards: child elements

console.log(h1.querySelectorAll(".highlight"));
//highlight is a child of the h1 element and this method selects it
console.log(h1.childNodes);
//childNodes returns a nodeList of every direct child element, including comments, texts, spans, etc.
console.log(h1.children);
//children returns a HTMlCollection(different to a Node List because it is updated) of elements that are directly inside the h1 parent element
console.log(h1.firstElementChild);
//As name suggests, it returns the first direct child of the h1 parent element

h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "white";

//Going upwards: parent elements

console.log(h1.parentNode);
console.log(h1.parentElement);
//These methods give us direct parents

h1.closest(".header").style.background = "blue";
//closest() selects the closest parent element that contains the specified class(in this case ".header") and applies the specified style("blue")
h1.closest("h1").style.background = "green";
//In the case that the element itself (h1) meets the specified criteria (h1) then it is the element affected
//querySelector finds children no matter how far down the DOM tree
//closest finds parents no matter how far up the DOM tree

//Going sideways: sibling elements
console.log(h1.previousElementSibling); //Logs null, as no previous
console.log(h1.nextElementSibling); //Logs the next h4 element in the html document

console.log(h1.previousSibling);
console.log(h1.nextSibling);
//These log nodeLists items and include comments, texts, spans, etc
//Not often used

console.log(h1.parentElement.children);
//This clever method goes up to the parent element and then returns all the children including the element itself(h1)
//We can use spread operator to place these elements in an array and forEach to affect these elements like below

[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) el.style.transform = "scale(.5)";
});
*/

////////////////////////////////////////
//LECTURE: Building a Tabbed Component

//Tabbed Component
//Recommended for these to be at top of file with rest of selections
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  console.log(clicked);

  //Guard Statement that accounts for click returning a falsy value
  if (!clicked) return;

  //Remove active classes
  tabs.forEach(t => t.classList.remove("operations__tab--active"));
  tabsContent.forEach(c => c.classList.remove("operations__content--active"));

  //Activate tab
  clicked.classList.add("operations__tab--active");

  //Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

////////////////////////////////////////
//LECTURE: Passing Arguments to Event Handlers

//Menu fade animation

// nav.addEventListener("mouseover", function (e) {
//   if (e.target.classList.contains("nav__link")) {
//     const link = e.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     siblings.forEach(el => {
//       if (el !== link) el.style.opacity = 0.5;
//     });
//     logo.style.opacity = 0.5;
//   }
// });

// nav.addEventListener("mouseout", function (e) {
//   const link = e.target;
//   const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//   const logo = link.closest(".nav").querySelector("img");

//   siblings.forEach(el => {
//     if (el !== link) el.style.opacity = 1;
//   });
//   logo.style.opacity = 1;
// });

//We use mouseover instead of mouseenter as it allows for bubbling events
//mouseout is the opposite to mouseover, mouseleave is the opposite of mouseenter
//Refactor above code to be DRY

const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//bind allows us to attach a value to the this keyword that can then be used throughout the function

////////////////////////////////////////
//LECTURE: Implementing a Sticky Navigation: The Scroll Event

// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords);

// window.addEventListener("scroll", function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > initialCords.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });
//Although this appears to work well, the scroll event is being continually returned in the background and so this is inefficient and could be bad for performance

////////////////////////////////////////
//LECTURE: A Better Way: The Intersection Observer API
// const obsCallback = function (entries) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

//Whenever our target(section1) is in the viewport in a specified way, the callback is triggered
//obsOptions is the specified way we want the target to be in the viewport for the callback to take affect
// "root: null" means we want the target to be in the viewport for it to trigger the callback
// "threshold:0.1" means we want at least 10% of the target to be in the viewport to trigger the callback
//"entries" is our thresholds
//There an be multiple thresholds in array form
//With two threshold values, the callback will trigger whenever viewport enters and exits at these points

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight); //Logs 90

const stickyNav = entries => {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  // rootMargin: "-90px",
  rootMargin: `-${navHeight}px`,
});

//With threhold set to 0, the callback will trigger as soon as header moves out of view
//rootMargin means that the calback is triggered 90 pixels before the threshold is reached
//It is better to use getBoundingClientRect rather than hardcoding 90 so that it is responsive

headerObserver.observe(header);

////////////////////////////////////////
//LECTURE: Revealing Elements on Scroll
//We add a section--hidden class to each section which turns its opacity to 0 and transforms it slightly down, we now just remove that class whenever the section appears in the viewport

const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

///////////////////////////////
//LECTURE: Lazy Loading Images
//Lazy loading images can majorly improve performance on lower functioning devices, web browsers, etc.

const imgTargets = document.querySelectorAll("img[data-src]");

// console.log(imgTargets); //Logs 3 images with the data-src attribute

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;
  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "+200px",
});

imgTargets.forEach(img => imgObserver.observe(img));

//////////////////////////////
//LECTURE: Building a Slider: Part 1

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slides.length;

//Below were just added to make it easier to see what was happening in the browser
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.2) translateX(-1500px)";
// slider.style.overflow = "visible";

// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
// We need to give each image a translate value of the following: 0%, 100%, 200%, 300%
//We do this cleverly by multiplying the images index by 100 giving us the position that we want

//createDots and activateDots is part of "LECTURE: Building a Slider: Part 2" but is here because it is better to organise file into functions, selectors, event-handlers etc.

//FUNCTIONS

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      `beforeend`,
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
// createDots(); //Refactored to init()

const activateDot = function (slide) {
  //First remove it previous selections
  document
    .querySelectorAll(".dots__dot")
    .forEach(dot => dot.classList.remove("dots__dot--active"));
  //Add it to current selection
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};
// activateDot(0); //Refactored to init()

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};
// goToSlide(0); //Refactored to init()

// Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

//Refactoring init() function
const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};

init();

//EVENT HANDLERS

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);
//We want now for the images to have the following values: -100%, 0%, 100%, 200%
//To do this we take the current index(i) and minus current slide and times 100

////////////////////////////
//LECTURE: Building a Slider: Part 2

//Making slider work with arrow keys

document.addEventListener("keydown", function (e) {
  console.log(e);
  // if (e.key === "ArrowLeft") prevSlide();
  // if (e.key === "ArrowLeft") nextSlide();

  //Same as below but written short circuit way
  e.key === "ArrowLeft" && prevSlide();
  e.key === "ArrowRight" && nextSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    // const slide = e.target.dataset.slide;
    //Destructured way of writing
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

////////////////////////////////////////////
//Lifecycle DOM Events

document.addEventListener("DOMContentLoaded", function (e) {
  console.log("HTML parsed and DOM tree built", e);
});
//This event takes place only when the HTML has loaded and before images and other externals features have loaded
//If the js file is linked at the end of the HTML document(which it usually is) then this event is unnecessary

window.addEventListener("load", function (e) {
  console.log("Page fully loaded", e);
});
//This event takes place after the HTML and all other features have loaded, once the page is fully loaded.

// window.addEventListener("beforeunload", function (e) {
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = "";
// });
//This event runs just before the user tries to exit the page. Offers a "Are you sure?" message. Annoying. Don't abuse

////////////////////////////
// LECTURE: Efficient Script Loading: defer and asyn
