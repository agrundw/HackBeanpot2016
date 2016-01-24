
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
				call = things[i]; //Dorian added this
			}
			else {
				html += genHTML(things[i], i, "danger");
			}
		}	
		console.log("pick was Clicked!");
		getLocation(); //Dorian Added this
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


//
//Dorian Added everything below this
//
var call;
var map;
var loc;
var service;
var infowindow;

function getLocation() {
    if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);

       ;
    } else {
        alert("This app will not work without location");
    }
}

function showPosition(position) {
	
	var str = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=Latitude,Longitude&rankby=distance&types=food&keyword=KEYKK&opennow&key=AIzaSyAWtDIXR58eZcyZHn4-ToZaoGT_cnp3eg4";

	//"https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=Latitude,Longitude&radius=4023&types=food&keyword=KEYKK&opennow&key=AIzaSyAWtDIXR58eZcyZHn4-ToZaoGT_cnp3eg4"

	//str = str.replace("Latitude", position.coords.latitude);
	//str = str.replace("Longitude", position.coords.longitude);
	//str = str.replace("KEYKK", call);
	//alert(str);

	loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	alert(position.coords.latitude);
	alert( position.coords.longitude);
	 map = new google.maps.Map(document.getElementById('map'), {
    center: loc,
    zoom: 15
  	});

	 infowindow = new google.maps.InfoWindow(); 
	var request = {
		location: loc,
		//radius: '4023',
		types: ['food'],
		keyword: call,
		openNow: true,
		rankBy: google.maps.places.RankBy.DISTANCE
	};

	service = new google.maps.places.PlacesService(map);
	service.nearbySearch(request, callback);
	alert("done");
}

function callback(results, status) {
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		for (var i = 0; i < results.length; i++) {
			var place = results[i];
			createMarker(results[i]);
		}
	}
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}






/*

$.getJSON(str, function(json) {
	//alert(jason.results[0].);
		alert("Hola");

    // Set the variables from the results array
    var name = json.results[0].name;
    

        // Set the variables from the results array
    var address = json.results[0].vicinity;
    

    alert(name, address);
});


}


*/