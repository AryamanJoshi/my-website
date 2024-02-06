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

// Read More Content
function toggleReadMore(opusNo) {
    const readMoreContent = document.getElementById('readMoreContent' + opusNo);
    const readMoreBtn = document.querySelector(`.read-more-btn[data-opus="${opusNo}"]`);

    if (readMoreContent && readMoreBtn) {
        if (readMoreContent.style.display === 'none' || readMoreContent.style.display === '') {
            readMoreContent.style.display = 'block';
            readMoreBtn.textContent = 'Show Less';
        } else {
            readMoreContent.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const currentPath = window.location.pathname;
    const compositionsLink = document.querySelector('.compositions-link a');

    if (currentPath.includes('compositions.html')) {
        compositionsLink.classList.add('active');
    }
});

// Event delegation for "Read More" buttons
document.addEventListener('click', function (event) {
    const targetBtn = event.target;

    if (targetBtn.classList.contains('read-more-btn')) {
        const opus_no = targetBtn.getAttribute('data-opus');
        toggleReadMore(opus_no);
    }
});

// Scraping my csv file
let compData; // Declare the variable outside the fetch block

// Function to display the "title" as an h2
function displayTitle(opusNo) {
    // Check if compData is defined and not empty
    if (compData && compData.length > 0) {
        // Find the row where "opus-no" is equal to the provided opusNo
        const targetRow = compData.find(row => row['opus-no'] === opusNo);

        if (targetRow) {
            const title = targetRow['title'];
            const opus_no = targetRow['opus-no'];
            const instrumentation = targetRow['instrumentation'];
            const description = targetRow['description'];
            const link = targetRow['video-link'];

            document.getElementById('outputTitle').innerHTML =
                `
                <h3>${opus_no}. ${title}</h3>
                <!-- ------------------------------------------------- -->
                <h4>
                <span style="font-weight: bold;">Instrumentation:</span>
                <span style="font-weight: normal;">${instrumentation}</span>
                </h4>
                <!-- ------------------------------------------------- -->
                <button class="read-more-btn" data-opus="${opus_no}">Read More</button>
                <div class="read-more-content" id="readMoreContent${opus_no}" style="display: none;">
                    <p>${description}</p>
                </div>
                <!-- ------------------------------------------------- -->
                <div class = "iframe-size-limiter">
                    <div class = "iframe-container">
                        <iframe width="560" height="315" src="${link}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                  </div>
                </div>
                `;
        } else {
            alert(`Row with opus-no ${opusNo} not found.`);
        }
    } else {
        alert('Dataset is not available. Please fetch the data first.');
    }
}

fetch('comp-data.csv')
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                // Modify the 'tags' column to create an array
                compData = results.data.map(row => {
                    if (row['tags']) {
                        row['tags'] = row['tags'].split(',').map(tag => tag.trim());
                    }
                    // Modify the 'instrument-tags' column to create an array
                    if (row['instrument-tags']) {
                        row['instrument-tags'] = row['instrument-tags'].split(',').map(tag => tag.trim());
                    }
                    return row;
                });
            }
        });
    });


//-----------------------------------------------------------------------------------------------------




