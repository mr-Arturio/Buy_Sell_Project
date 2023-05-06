document.addEventListener('DOMContentLoaded', () => {
  const iconElements = document.querySelectorAll('.icon');

  iconElements.forEach(iconElement => {
    iconElement.addEventListener('click', changeIcon);
  });

  function changeIcon(event) {
    console.log('Icon clicked');
    const icon = event.currentTarget.querySelector('i');
       event.currentTarget.classList.add('clicked');
    if (icon.style.color === "rgb(249, 69, 18)") {
      icon.style.color = ""; // set the color back to the original color
    } else {
      icon.style.color = "rgb(249, 69, 18)"; // set the color of the icon to red
    }
  }
});