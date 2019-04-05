let cardElement = document.querySelector(".card");

cardElement.addEventListener("click", flip);

function flip(){
  cardElement.classList.toggle("flipped")
}

function startTime() {
    var weekday = new Array();
    weekday[0] =  "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = today.getDate();
    var y = today.getFullYear();
    var wd = weekday[today.getDay()];
    var mt = month[today.getMonth()];
  
    m = checkTime(m);
    s = checkTime(s);
                    document.getElementById('date').innerHTML =
    d;
 document.getElementById('day').innerHTML =
    wd;
 document.getElementById('month').innerHTML =
    mt + "/" + y;
    
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

//
//
//BUTTONS AND ORIGINAL FUNCTIONS
//
//

var loadLocalStorage = function () {
  var keys = Object.keys(localStorage)
  var htmlString = '';
  var tableString = '';
  for (var i = 0; i < keys.length; i++) {
    var values = localStorage.getItem(keys[i]);
    console.log(keys[i]);
    var arrayValues = JSON.parse(values);
    console.log(values);
    arrayValues = Object.entries(arrayValues);
    console.log(arrayValues);
    htmlString += `<tr><td>${keys[i]}</td><td>${arrayValues[0][0]}</td><td>${arrayValues[0][1]}</td></tr>`
    tableString = '';
    for(var j = 1; j < arrayValues.length; j++){
      tableString += `<tr><td></td><td>${arrayValues[j][0]}</td><td>${arrayValues[j][1]}</td></tr>`
    }
    htmlString += tableString;
  }
  
  $('#workoutBody').html(htmlString);
};

var updateStatusLabel = function(message) {
  $('#statusLabel').text('Status: ' + message);
}

 //jQuery document ready initialization stuff
 ////button and form event handlers
 // logic for determining action probably needs to go in the event handler
$(document).ready(function () {
  loadLocalStorage();

  $('#btn-create').on('click', function(e) {
    var key = $('#exercise').val();
    var set = $('#set').val();
    var rep = $('#rep').val();
    var keyExists = localStorage.getItem(key) !== null;

    if (keyExists) {
      updateStatusLabel('key already exists, please use update button instead! :D');
    } else if (key === '') {
      updateStatusLabel('invalid input!')
    }else {
      createEntry(key, set, rep);
      updateStatusLabel('key created - ' + key);
    }

    loadLocalStorage();
  });

  $('#btn-update').on('click', function(e) {
    var key = $('#exercise').val();
    var set = $('#set').val();
    var rep = $('#rep').val();
    var existingValue = JSON.parse(localStorage.getItem(key));
    var keyExists = existingValue !== null;

    if (key === '' || set === '' || rep === '') {
      updateStatusLabel('invalid input!');
    } else if (keyExists) {
      updateEntry(key, set, rep);
      updateStatusLabel('exercise updated - ' + key + ' (set: ' + set + ' rep: ' + rep + ')');
    } else if (existingValue[set] === rep) {
      updateStatusLabel('key not updated - that value already exists silly! xD')
    } else {
      updateStatusLabel('key doesn\'t exist, please use create button instead! :D');
    }   
    
    loadLocalStorage();   
  });

  $('#btn-delete').on('click', function(e) {
    var key = $('#exercise').val();
    var keyExists = localStorage.getItem(key) !== null;

    if (keyExists) {
      removeEntry(key);
      updateStatusLabel('key removed - ' + key);
    } else if (key === '') {
      updateStatusLabel('invalid input!')
    } else {
      updateStatusLabel('key doesn\'t exist, nothing removed. :|');
    }

    loadLocalStorage();
  }); 

});
/*



When an input element is given a name, that name becomes a property of the owning form element's HTMLFormElement.elements property. That means if you have an input whose name is set to guest and another whose name is hat-size, the following code can be used:

let form = document.querySelector("form");
let guestName = form.elements.guest;
let hatSize = form.elements["hat-size"];
*/

/*
PAGE CONTENT STUFF
*/
//something to update the table every time localStorage changes

//localStorage stuff
//https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
////create new entry
//localStorage.setItem(key, value)
var createEntry = function(key, set, rep) {
  var values = {};
  values[set] = rep;
  return localStorage.setItem(key, JSON.stringify(values));
}

////Update existing entry
//localStorage.setItem(key, value)
var updateEntry = function(key, set, rep) {
  var curValues = JSON.parse(localStorage.getItem(key));
  curValues[set] = rep;
  return localStorage.setItem(key, JSON.stringify(curValues));
}

////delete existing entry
//localStorage.removeItem(key)
var removeEntry = function(key) {
  return localStorage.removeItem(key);
}
