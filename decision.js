function add() {
	var input = document.getElementById('input').value;

	var things = getThings();
	things.push(input);
	sessionStorage.setItem('thing', JSON.stringify(things));

	show();

	return false;

	console.log("I was Clicked!");
}

function show() {
	var things = getThings();

	var html = '';
	for (var i = 0; i < things.length; i++) {
		html += genHTML(things[i]);
	}

	document.getElementById('things').innerHTML = html;

}

function genHTML(thing) {
	var html ="<div class='row'><div class='col-sm-4' ></div><div id='options' class='col-sm-4 well'>"+thing+"</div><div class='col-sm-4' ></div></div>";

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
show();