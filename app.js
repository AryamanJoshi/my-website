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

//Compositions Page#################################################################################################

// Read More Content
function toggleReadMore(opusNo) {
    const readMoreContent = document.getElementById('readMoreContent' + opusNo);
    const readMoreBtn = document.querySelector(`.read-more-btn[data-opus="${opusNo}"]`);

    if (readMoreContent && readMoreBtn) {
        if (readMoreContent.style.display === 'none' || readMoreContent.style.display === '') {
            readMoreContent.style.display = 'block';
            readMoreBtn.textContent = 'Show Less';
            readMoreBtn.classList.add('active'); // Add the "active" class
            readMoreBtn.setAttribute('data-show', 'less'); // Set attribute to track "show less" state
        } else {
            readMoreContent.style.display = 'none';
            readMoreBtn.textContent = 'Read More';
            readMoreBtn.classList.remove('active'); // Remove the "active" class
            readMoreBtn.removeAttribute('data-show'); // Remove attribute
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
// Display Pieces by Tag-----------------------------------------------------------
function displayPiecesByTagFunction(tag) {
    // Check if compData is defined and not empty
    if (compData && compData.length > 0) {
        // Filter rows that have the input tag in the 'tags' list
        const filteredRows = compData.filter(row => row['tags'] && row['tags'].includes(tag)).reverse(); //note the reverse

        // Clear the existing output content
        document.getElementById('outputPieces').innerHTML = '';

        if (filteredRows.length > 0) {
            // Display each piece one after the other
            filteredRows.forEach(targetRow => {
                const title = targetRow['title'];
                const opus_no = targetRow['opus-no'];
                const instrumentation = targetRow['instrumentation'];
                const duration = targetRow['duration'];
                const description = targetRow['description'];
                const link = targetRow['video-link'];
                const yearHead = targetRow['yearHead'];
                const gallery = targetRow['gallery'];                

                // Create a container for each piece
                const pieceContainer = document.createElement('div');
                pieceContainer.classList.add('piece-container');

                // Set the inner HTML of each container
                pieceContainer.innerHTML =
                    `
                    ${yearHead ? `
                        <h2>✦ ${yearHead} ✦</h2>
                    ` : ''}
                    <!-- ------------------------------------------------- -->
                    ${title ? `
                        <h3 class="h3-with-line">${opus_no}. ${title}</h3>
                    ` : ''}
                    <!-- ------------------------------------------------- -->
                    ${instrumentation ? `
                        <h4>
                            <span style="font-weight: bold;">Instrumentation:</span>
                            <span style="font-weight: normal;">${instrumentation}</span>
                        </h4>
                    ` : ''}
                    <!-- ------------------------------------------------- -->
                    ${duration ? `
                        <h4>Duration: <span style="font-weight: normal;">${duration}</span></h4>
                    ` : ''}
                    <!-- ------------------------------------------------- -->
                    ${description ? `
                        <button class="read-more-btn" data-opus="${opus_no}">Read More</button>
                        <div class="read-more-content" id="readMoreContent${opus_no}" style="display: none;">
                            <p>${description}</p>
                        </div>
                    ` : ''}
                    <!-- ------------------------------------------------- -->
                    ${link ? `
                        <div class="iframe-size-limiter">
                            <div class="iframe-container">
                                <iframe 
                                    width="560" 
                                    height="315" 
                                    src="${link}" 
                                    title="${title}" 
                                    frameborder="0" 
                                    allow="accelerometer; 
                                    autoplay; 
                                    clipboard-write; 
                                    encrypted-media; 
                                    gyroscope; 
                                    picture-in-picture; 
                                    web-share" 
                                    allowfullscreen>
                                </iframe>
                            </div>
                        </div>
                    ` : ''}
                    <!-- ------------------------------------------------- -->
                    <!-- ${gallery ? `
                        <iframe 
                            width="674" 
                            height="1199" 
                            src="${gallery}" 
                            title="Lol!!" 
                            frameborder="0" 
                            allow="accelerometer; 
                            autoplay; 
                            clipboard-write; 
                            encrypted-media; 
                            gyroscope; 
                            picture-in-picture; 
                            web-share" 
                            allowfullscreen>
                        </iframe>
                    ` : ''} -->
                `;

                // Append the container to the output area
                document.getElementById('outputPieces').appendChild(pieceContainer);
            });
        } else {
            alert(`No pieces found with the tag '${tag}'.`);
        }
    } else {
        alert('Dataset is not available. Please fetch the data first.');
    }
}
// Fetching Data ---------------------------------------------------------------------
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
                displayPiecesByTagFunction('all'); //Showing All Pieces by Default
            }
        });
    });

//Highlighting the Buttons-----------------------------------------------------------------------------------------
// JavaScript function to handle button clicks
function handleButtonClick(tag) {
    // Remove 'active' class from all buttons
    const buttons = document.querySelectorAll('.tag-button');
    buttons.forEach(button => button.classList.remove('active'));

    // Add 'active' class to the clicked button
    const clickedButton = document.querySelector(`.tag-button[data-tag="${tag}"]`);
    if (clickedButton) {
        clickedButton.classList.add('active');
    }

    // Call the displayPiecesByTagFunction with the specified tag
    displayPiecesByTagFunction(tag);
}

//Calendar Page#################################################################################################
fetch('calen-data.csv', {
    headers: {
        'Content-Type': 'text/csv; charset=utf-8'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(csv => {
    Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        encoding: 'UTF-8', // Ensure UTF-8 encoding
        complete: function(results) {
            displayCalendarEntries(results.data); // Display English entries
        }
    });
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});

function displayCalendarEntries(data) {
    const calendarContainerPast = document.getElementById('calendarContainerPast');
    const calendarContainerUpcoming = document.getElementById('calendarContainerUpcoming');

    for (let i = data.length - 1; i >= 0; i--) {
        const { sr_no, year, month, day, cardinal_superscript, text, img_full, img_half, status, next } = data[i];

        if (!sr_no) {
            continue;
        }

        const calendarEntry = document.createElement('div');
        calendarEntry.classList.add('calendar-entry');

        const dayText = day ? `${day}<sup>${cardinal_superscript}</sup>` : '[Date TBD]';

        let htmlContent = `
            <h3>
                ${next ? '<span class="next-flash">NEXT!</span> ' : ''}${year}, ${month} ${dayText} <br>
                <span style="font-weight: normal;">${text}</span>
            </h3>
        `;

        if (img_full) {
            htmlContent += `<img src="images/calendar/${img_full}" alt="${img_full}" width="100%" height="auto">`;
        }

        if (img_half) {
            htmlContent += `<img class="responsive-image" src="images/calendar/${img_half}" alt="${img_half}" width="100%" height="auto">`;
        }

        calendarEntry.innerHTML = htmlContent;

        if (status === 'past') {
            calendarContainerPast.appendChild(calendarEntry);
        } else if (status === 'upcoming') {
            calendarContainerUpcoming.appendChild(calendarEntry);
        }
    }
}
//Japanese Translation--------------------------------------------------------------------------------------
fetch('calen-data.csv', {
    headers: {
        'Content-Type': 'text/csv; charset=utf-8'
    }
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(csv => {
    Papa.parse(csv, {
        header: true,
        dynamicTyping: true,
        encoding: 'UTF-8', // Ensure UTF-8 encoding
        complete: function(results) {
            displayCalendarEntriesJP(results.data); // Display English entries
        }
    });
})
.catch(error => {
    console.error('There was a problem with the fetch operation:', error);
});
function displayCalendarEntriesJP(data) {
    const calendarContainerPastJP = document.getElementById('calendarContainerPastJP');
    const calendarContainerUpcomingJP = document.getElementById('calendarContainerUpcomingJP');

    for (let i = data.length - 1; i >= 0; i--) {
        const { sr_no, year_jp, month_jp, day, day_jp, text_jp, img_full, img_half, status, next } = data[i];

        if (!sr_no) {
            continue;
        }

        const calendarEntryJP = document.createElement('div');
        calendarEntryJP.classList.add('calendar-entry');

        const dayTextJP = day ? `${year_jp}年${month_jp}月${day_jp}日` : `${year_jp}年${month_jp}・日付未定`;

        let htmlContentJP = `
            <h3><span class="japanese_body">
                ${next ? '<span class="next-flash">次へ!</span>' : ''}${dayTextJP} <br>
                <span style="font-weight: normal;">${text_jp}</span>
            </span></h3>
        `;

        if (img_full) {
            htmlContentJP += `<img src="images/calendar/${img_full}" alt="${img_full}" width="100%" height="auto">`;
        }

        if (img_half) {
            htmlContentJP += `<img class="responsive-image" src="images/calendar/${img_half}" alt="${img_half}" width="100%" height="auto">`;
        }

        calendarEntryJP.innerHTML = htmlContentJP;

        if (status === 'past') {
            calendarContainerPastJP.appendChild(calendarEntryJP);
        } else if (status === 'upcoming') {
            calendarContainerUpcomingJP.appendChild(calendarEntryJP);
        }
    }
}

    