// Create map
const myMap = {
  coordinates: [],
  businesses: [],
  map: {},
  markers: {},

  buildMap() {
    this.map = L.map("map", {
      center: this.coordinates,
      zoom: 12,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: "12",
    }).addTo(this.map);
    // Add marker
    const marker = L.marker(this.coordinates);
    marker
      .addTo(this.map)
      .bindPopup("<p1><b>You are here!</b></p1>")
      .openPopup();
  },
  // add business markers
	addMarkers() {
		for (let i = 0; i < this.businesses.length; i++) {
		this.markers = L.marker([
			this.businesses[i].lat,
			this.businesses[i].long,
		])
			.bindPopup(`<p1>${this.businesses[i].name}</p1>`)
			.addTo(this.map)
		}
	},
};

// Get coordinates
async function getCoords(){
	const pos = await new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	});
	return [pos.coords.latitude, pos.coords.longitude]
}
async function fetchData(business) {
  // Fetch data
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3y/vFLPZmL0OjyIbDhN65KhKkhjkx1HwCZynbhLi2YRI=",
    },
  };

  let response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee&ll=32.84%2C-116.87&radius=1000&limit=5",
    options
  )
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
}

// process foursquare array
function processBusinesses(data) {
	let businesses = data.map((element) => {
		let location = {
			name: element.name,
			lat: element.geocodes.main.latitude,
			long: element.geocodes.main.longitude
		};
		return location
	})
	return businesses
}
// window load
window.onload = async () => {
	const coords = await getCoords()
	myMap.coordinates = coords
	myMap.buildMap()
}

// business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
	event.preventDefault()
	let business = document.getElementById('business').value
	let data = await getFoursquare(business)
	myMap.businesses = processBusinesses(data)
	myMap.addMarkers()
})