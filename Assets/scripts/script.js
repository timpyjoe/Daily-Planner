// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // This whole section builds the time blocks on the planner
  for (var i =9; i < 18; i++) {
    var imperial = i;
    //Changes the displayed hour to standard time vs military time
    if (imperial > 12 ) {
      imperial -= 12;
    }
    var nextID = `hour-${imperial}`;
    //Changes AM to PM after 11
    let pastNoon = "AM";
    if (i > 11) {
      pastNoon = "PM"
    }

    // Adds the actual time block to the screen
    $("#time-blocks").append(`
    <div id=${nextID} class="row time-block">
      <div class="col-2 col-md-1 hour text-center py-3">${imperial+pastNoon}</div>
      <textarea class="col-8 col-md-10 description" rows="3"> </textarea>
      <button class="btn saveBtn col-2 col-md-1" aria-label="save">
        <i class="fas fa-save" aria-hidden="true"></i>
      </button>
    </div>`)

    // Populates the time block text area with data saved into local storage
    $(`#${nextID}`).children("textarea").val(localStorage.getItem(nextID));

    // Changes the color of the time block depending on the time of day
    if (i < dayjs().hour()) {
      $(`#${nextID}`).addClass("past");
    } else if (i = dayjs().hour()) {
      $(`#${nextID}`).addClass("present");
    } else {
      $(`#${nextID}`).addClass("future");
    }

  }

  // Adds event listener delegated to the save button. Saves text area value to respective key in  local storage
  $("#time-blocks").on("click", ".saveBtn", function(event){
    var block = $(this).parent().attr("id");
    var text = $(this).siblings("textarea").val();
    localStorage.setItem(block, text);
      
  })
  

  // Displays the current date at the top of the screen 
  var today = dayjs();
  $("#currentDay").text(today.format("dddd, MMM D"));
  // This is missing the ordinal suffix because I couldn't figure out how to use dayjs
  // advancedFormat
  console.log(today.hour());

});
