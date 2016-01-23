function add() {
	var input = document.getElementById('input');

	if (input.value) {
		var things = getThings();
		things.push(input.value);
		sessionStorage.setItem('thing', JSON.stringify(things));
		input.value = '';
	}

	show();

	return false;

	console.log("I was Clicked!");
}

function remove() {
	var id = this.getAttribute('id');
	var things = getThings();
	things.splice(id,1);
	sessionStorage.setItem('thing', JSON.stringify(things));

	show();

	return false;
}

function show() {
	var things = getThings();

	var html = '';
	for (var i = 0; i < things.length; i++) {
		html += genHTML(things[i], i);
	}

	document.getElementById('things').innerHTML = html;

	var btns = document.getElementsByClassName('remove');
	for(var i = 0; i < btns.length; i++) {
		btns[i].addEventListener('click', remove);
	}

}

function genHTML(thing, i) {
	var html =
	`
	<div class="row">
		<div class="col-sm-4" ></div>
		<div id="options" class="col-sm-4 well">
			${thing}
			<button id="${i}" class="remove btn btn-danger">X</button>
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
	return things;
}

document.getElementById('add').addEventListener('click', add);