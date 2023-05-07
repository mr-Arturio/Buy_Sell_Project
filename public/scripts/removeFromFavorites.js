document.addEventListener('DOMContentLoaded', () => {
  const removeButtons = document.querySelectorAll('.remove-button');

  removeButtons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      const form = event.currentTarget.parentElement;
      const url = '/favorites';
      const favoriteId = form.closest('.item-box').dataset.id;
      $.ajax({
        url: url,
        method: 'DELETE',
        data: {
          favoriteId: favoriteId
        },
        success: function() {
          // Remove the corresponding item from the DOM
          const itemBox = form.closest('.item-box');
          itemBox.parentNode.removeChild(itemBox);
        }
      })
    });
  });
});