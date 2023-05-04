




 

 $('submit-form').on('submit', (event) => {
    event.preventDefault(); // prevent defualt form submission
  const data = $('#myInput').val(); //get the search query from input feild on website
    $.ajax({
      type: 'GET',
      url: '/search',
      data: data,
      success: function() {

      }
    })
    })


