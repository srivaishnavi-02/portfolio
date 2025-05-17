/******************************************************
 * CAROUSEL AUTO-SCROLL + MANUAL CONTROLS
 ******************************************************/
const sliderInner = document.querySelector('.cards-slider-inner');
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.querySelector('.cards-prev-btn');
const nextBtn = document.querySelector('.cards-next-btn');

let currentIndex = 0;
const totalCards = cards.length;
const visibleCards = 3;
const cardWidth = document.querySelector('.project-card').offsetWidth + 10; // Account for margins

// Function to show cards
function showCards(index) {
  if (index < 0) {
    currentIndex = totalCards - visibleCards;
  } else if (index >= totalCards) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  const offset = currentIndex * cardWidth;
  sliderInner.style.transform = `translateX(-${offset}px)`;
}

// Initial State
showCards(0);

// Manual Navigation
nextBtn.addEventListener('click', () => {
  showCards(currentIndex + 1);
  resetAutoScroll();
});

prevBtn.addEventListener('click', () => {
  showCards(currentIndex - 1);
  resetAutoScroll();
});

// Auto-scroll every 4 seconds
let autoScroll = setInterval(() => {
  showCards(currentIndex + 1);
}, 4000);

function resetAutoScroll() {
  clearInterval(autoScroll);
  autoScroll = setInterval(() => {
    showCards(currentIndex + 1);
  }, 4000);
}

// Mouse Swipe (Drag to Scroll)
let isDragging = false;
let startPosition = 0;
let movePosition = 0;

sliderInner.addEventListener("mousedown", (e) => {
  isDragging = true;
  startPosition = e.clientX;
  sliderInner.style.transition = "none";
});

sliderInner.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  movePosition = e.clientX - startPosition;
  sliderInner.style.transform = `translateX(${movePosition - currentIndex * cardWidth}px)`;
});

sliderInner.addEventListener("mouseup", () => {
  isDragging = false;
  sliderInner.style.transition = "transform 0.5s ease-in-out";

  if (movePosition < -50) {
    showCards(currentIndex + 1);
  } else if (movePosition > 50) {
    showCards(currentIndex - 1);
  } else {
    showCards(currentIndex);
  }
});


/******************************************************
 * EXPERIENCE / EDUCATION TABS
 ******************************************************/
// Tab Switching Logic
const tabButtons = document.querySelectorAll('.tab-btn');
const timelines = document.querySelectorAll('.timeline-container');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Remove 'active' from all buttons
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    // Add 'active' to clicked button
    button.classList.add('active');

    // Hide all timelines
    timelines.forEach((timeline) => timeline.classList.remove('active'));
    // Show the selected timeline
    const target = document.getElementById(button.dataset.target);
    target.classList.add('active');
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // List of roles to cycle through
  const roles = [ "a Data Analyst", "a Data Engineer", "a Software Engineer", "a Developer", "an Engineer"];
  let roleIndex = 0;  // Which role in the array is currently being animated
  let charIndex = 0;  // Current character index in the role string
  
  // Timing variables (in milliseconds)
  const typingDelay = 150;   // Delay between typing each letter
  const erasingDelay = 100;  // Delay between erasing each letter
  const newWordDelay = 2000; // Pause after a word is fully typed
  
  // Elements
  const typedTextSpan = document.getElementById("typed-text");
  
  // Function to type each letter
  function type() {
    if (charIndex < roles[roleIndex].length) {
      typedTextSpan.textContent += roles[roleIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      // Word complete; pause then start erasing
      setTimeout(erase, newWordDelay);
    }
  }
  
  // Function to erase each letter
  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      // Move to next role, wrapping around if necessary
      roleIndex = (roleIndex + 1) % roles.length;
      // Start typing next role after a short pause
      setTimeout(type, typingDelay + 110);
    }
  }
  
  // Start the typewriter effect after a slight delay on page load
  setTimeout(type, newWordDelay);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const responseMessage = document.getElementById("responseMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the default form submission (and redirect)

    const formData = new FormData(form);

    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        responseMessage.style.display = "block";
        responseMessage.innerHTML = "Thanks for your submission!";
        form.reset(); // Clear the form fields
      } else {
        response.json().then(data => {
          if (data.errors) {
            responseMessage.style.display = "block";
            responseMessage.innerHTML = data.errors.map(error => error.message).join(", ");
          } else {
            responseMessage.style.display = "block";
            responseMessage.innerHTML = "Oops! There was a problem submitting your form.";
          }
        });
      }
    })
    .catch(error => {
      responseMessage.style.display = "block";
      responseMessage.innerHTML = "Oops! There was a problem submitting your form.";
    });
  });
});
