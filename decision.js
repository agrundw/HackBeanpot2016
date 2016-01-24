function add() {
	var input = document.getElementById('input');

	if (input.value) {
		var things = getThings();
		things.push(input.value);
		sessionStorage.setItem('thing', JSON.stringify(things));
		input.value = '';
	}

	show(0);

	console.log("add was Clicked!");

	return false;
}

function encURI() {
	return encodeURI(sessionStorage.getItem('thing'));
}

function remove() {
	var id = this.getAttribute('id');
	var things = getThings();
	things.splice(id,1);
	sessionStorage.setItem('thing', JSON.stringify(things));

	show(0);

	return false;
}

function show(pick) {
	var things = getThings();

	var html = '';

	if (pick) {
		var choice = getRandomInt(0,things.length - 1);

		for (var i = 0; i < things.length; i++) {
			if (i == choice) {
				html += genHTML(things[i], i, "success");
			}
			else {
				html += genHTML(things[i], i, "danger");
			}
		}	
		console.log("pick was Clicked!");
	}
	else {
		for (var i = 0; i < things.length; i++) {
			html += genHTML(things[i], i, "info");
		}
	}

	document.getElementById('things').innerHTML = html;

	var btns = document.getElementsByClassName('remove');
	for(var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', remove);
	}

	console.log(window.location);
	window.location.hash = encURI();
}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decide() {
	show(1);
	console.log(sessionStorage)
}

function genHTML(thing, i, type) {
	var html =
	`
	<div class="row">
	<div class="col-md-3" ></div>
	<div class="col-xs-12 col-md-6">
	<div id="options" class="alert alert-${type}">
	${thing}
	<p class="pull-right">
	<a id="${i}" class="remove btn btn-danger">X</a>
	</p>
	</div>
	</div>
	<div class=" col-md-3" ></div>
	</div>
	`;

	return html;
}

function getThings() {
	var things = [];
	var thingStr = sessionStorage.getItem('thing');
	if (thingStr != null) {
		things = JSON.parse(thingStr);
	}
	console.log(things);
	return things;
}


function getUrlData() {
	var url = window.location.hash;
	var data = url;
	console.log(data);
	data = data.substring(1, data.length);
	data = decodeURI(data);
	console.log("data is " + data);
	var dataArr = [];
	if (data != null) {
		dataArr = JSON.parse(data);
	}
	sessionStorage.setItem('thing', JSON.stringify(dataArr));
}


function getLink() {
	console.log(window.location.href);
	if (sessionStorage.getItem('thing')){
		var link = window.location.pathname + "#" + encURI();
		console.log(link);
		$('#share').attr("data-content", link);
	}
}


document.getElementById('add').addEventListener('click', add);
document.getElementById('pick').addEventListener('click', decide);
getUrlData();
show(0);
$(document).ready(function(){
	$('#share').popover();
});