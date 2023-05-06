// Select all buttons with the attribute data-carousel-button
const buttons = document.querySelectorAll("[data-carousel-button]");
let timerId = null;

// Define a function to start the carousel by setting a timer and 
// simulating a click on the "next" button every 2 seconds
function startCarousel() {
  timerId = setInterval(() => {
    const nextButton = document.querySelector("[data-carousel-button='next']");
    nextButton.click();
  }, 2500);
}

// Define a function to stop the carousel by clearing the timer
function stopCarousel() {
  clearInterval(timerId);
}

// Add a click event listener to each button in the buttons NodeList
buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Stop the carousel timer when the button is clicked
    stopCarousel();
    // Determine whether the "next" or "prev" button was clicked
    const offset = button.dataset.carouselButton === "next" ? 1 : -1;
    // Find the carousel element that contains the button that was clicked
    const slides = button.closest("[data-carousel]").querySelector("[data-slides]");

    // Find the currently active slide in the carousel
    const activeSlide = slides.querySelector("[data-active]");
    // Calculate the index of the next slide
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    // Wrap around to the first or last slide if necessary
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;

    // Activate the next slide and deactivate the current slide
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;

    // Start the carousel timer again
    startCarousel();
  });
});

// Start the carousel timer when the page loads
startCarousel();