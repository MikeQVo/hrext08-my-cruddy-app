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
	
	$('tbody').html(htmlString);
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
