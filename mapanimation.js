mapboxgl.accessToken = 'pk.eyJ1IjoiYnJhbmRvbnRhbm5lciIsImEiOiJja3o0aXR3Y2EwZ3lhMnVwaDE0NGVhczB2In0.qOBE4Xht8oemu6cPOYle7Q';

var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-71.091542,42.358862],
  zoom: 13
});

function getColor() {

  const colors = [
    '#006DB0', //Blue
    '#228B22', //Green
    '#FFCC33', //Yellow
    '#FF8F00', //Orange 
    '#DC3737', //Red
    '#69359C', //Purple
    '#E25098', //Pink 
    '#318CE7', //Light Blue
    '#3CB371', //Light Green 
    '#CBA135', //Dark Yellow
    '#EC5800', //Dark Orange 
    '#FF6961', //Light Red
    '#D39BCB', //Light Purple
    '#FF91A4' //Light Pink
  ]

  let colorIndex = markers.length % colors.length ;

  return colors[colorIndex];
};

var markers = [];

async function run(){
    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);

	locations.forEach((bus, i) => {
		let longitude = bus.attributes.longitude
		let latitude = bus.attributes.latitude

		if (markers.length < locations.length) {
			let marker = new mapboxgl.Marker({
        color: getColor()
      }).setLngLat([longitude, latitude])
        .setPopup(new mapboxgl.Popup({
          closeOnMove: true
        }).setHTML(`<h1>Bus: ${i + 1}</h1>`))
				.addTo(map)
			markers.push(marker)
		} else {
			markers[i].setLngLat([longitude, latitude]);
		}
	})

	// timer
  setTimeout(run, 15000);
}


// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}
