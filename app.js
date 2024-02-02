//INDEX PAGE##################################################################
// Image slider---------------------------------------------------------------
const slides = document.querySelectorAll(".slides img");
const textElements = document.querySelectorAll(".text-container .slide-text");
let slideIndex = 0;
let intervalId = null;

//initializeSlider()
document.addEventListener("DOMContentLoaded", initializeSlider);

function initializeSlider(){
    if(slides.length > 0){
        slides[slideIndex].classList.add("displaySlide");
        intervalId = setInterval(nextSlide, 3000);
    }
}
function showSlide(index){

    if(index >= slides.length){
        slideIndex = 0;
    }
    else if(index < 0){
        slideIndex = slides.length - 1;
    }

    slides.forEach((slide, i) => {
        if (i === slideIndex) {
            slide.classList.add("displaySlide");
            textElements[i].style.display = "block";
        } else {
            slide.classList.remove("displaySlide");
            textElements[i].style.display = "none";
        }
    });
}
function prevSlide(){
    clearInterval(intervalId);
    slideIndex--;
    showSlide(slideIndex);
}
function nextSlide(){
    slideIndex++;
    showSlide(slideIndex);
}
// Initial display
showSlide(slideIndex);

// Greeting Scroller
const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute("data-animated", true);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}

// Video Selector=---------------------------------------------------------------
const videoThumbnails = document.querySelectorAll(
    ".video-gallery .all-videos .thumbnail"
);
const videoPlayer = document.querySelector(
    ".video-gallery .featured-video iframe"
);

const videoTitle = document.querySelector(".video-gallery .video-title");

const showVideo = (videoId, title) => {
    let videoUrl = `https://www.youtube.com/embed/${videoId}`;
    videoPlayer.setAttribute("src", videoUrl);
    videoTitle.innerHTML = title;
};

videoThumbnails.forEach(v => {
    v.addEventListener("click", () => {
        showVideo(v.dataset.id, v.dataset.title)
    })
})

//Compositions Page################################################################

document.addEventListener('DOMContentLoaded', function () {
    var currentPath = window.location.pathname;
    var compositionsLink = document.querySelector('.compositions-link a');

    if (currentPath.includes('compositions.html')) {
        compositionsLink.classList.add('active');
    }
});