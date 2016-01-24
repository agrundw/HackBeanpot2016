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
				html += genHTMLchoice(things[i], i);
				call = things[i]; //Dorian added this
			}
			else {
				html += genHTML(things[i], i, "danger");
			}
		}	
		console.log("pick was Clicked!");
		//getLocation(); //Dorian Added this
	}
	else {
		for (var i = 0; i < things.length; i++) {
			html += genHTML(things[i], i, "info");
		}
	}

	document.getElementById('things').innerHTML = html;

	var btns = document.getElementsByClassName('remove');
	for(var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', remove	);
	}
	document.getElementById('mapBtn').addEventListener('click', getLocation);
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

function genHTMLchoice(thing, i) {
	var html =
	`
	<div class="row">
	<div class="col-md-3" ></div>
	<div class="col-xs-12 col-md-6">
	<div id="options" class="alert alert-success">
	${thing}
	<p class="pull-right">
	<a class="btn-group">
	<a id="mapBtn" class="btn btn-info">
	<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>
	</a>
	<a id="${i}" class="remove btn btn-danger">X</a>
	</a>
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

var call;

function getLocation() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);

       ;
    } else {
        alert("This app will not work without location");
    }
}

function showPosition(position) {
	var surl = "https://www.google.com/maps/search/KEYKK/@Lat,Long,13z"
	surl = surl.replace("KEYKK", call);
	surl = surl.replace("Long", position.coords.longitude);
	surl = surl.replace("Lat", position.coords.latitude);
	window.open(surl);
}

document.getElementById('add').addEventListener('click', add);
$('#input').keyup(function (e) {
	if (e.keyCode == 13) {
		add();
	}
});
document.getElementById('pick').addEventListener('click', decide);
getUrlData();
show(0);
$(document).ready(function(){
	$('#share').popover();
});
$(".btn").mouseup(function(){
    $(this).blur();
});