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

}

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function decide() {
	show(1);
}

function genHTML(thing, i, type) {
	var html =
	`
	<div class="row">
	<div class="col-sm-4" ></div>
	<div class="col-sm-4 row">
	<div id="options" class="alert alert-${type}">
	${thing}
	<p class="pull-right">
	<a id="${i}" class="remove btn btn-danger">X</a>
	</p>
	</div>
	</div>
	<div class="col-sm-4" ></div>
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

document.getElementById('add').addEventListener('click', add);
document.getElementById('pick').addEventListener('click', decide);