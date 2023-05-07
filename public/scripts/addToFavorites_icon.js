document.addEventListener('DOMContentLoaded', () => {
  const iconElements = document.querySelectorAll('.icon');

  iconElements.forEach(iconElement => {
    iconElement.addEventListener('click', function(event) {
      const icon = event.currentTarget.querySelector('i');
      const productId = icon.dataset.productId;
      const userId = 3;
      $.ajax({
        url: '/favorites',
        method: 'POST',
        data: {
          productId: productId,
          userId: userId
        }
      })
      .done(function(response) {
        console.log(response);
        icon.classList.add('clicked');
        if (icon.style.color === "rgb(249, 69, 18)") {
          icon.style.color = ""; // set the color back to the original color
        } else {
          icon.style.color = "rgb(249, 69, 18)"; // set the color of the icon to red
        }
      })
      .fail(function(error) {
        console.error(error);
      });
    });
  });
});
