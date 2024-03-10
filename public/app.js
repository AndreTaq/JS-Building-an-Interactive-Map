// Create map
const myMap = L.map("map", {
  center: [48.87007, 2.346453],
  zoom: 12,
});

// Add openstreetmap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(myMap);

// Function to add markers and polygons to the map
function addCoordinates(coordinates) {
  // Clear existing markers and polygons
  myMap.eachLayer(function (layer) {
    if (layer instanceof L.Marker || layer instanceof L.Polygon) {
      myMap.removeLayer(layer);
    }
  });

  // Add marker
  const marker = L.marker(coordinates[0]);
  marker
    .addTo(myMap)
    .bindPopup("<p1><b>The Hoxton, Paris</b></p1>")
    .openPopup();

  // Draw the polygon
  L.polygon(coordinates).addTo(myMap);

  // Adjust zoom level based on the content
  myMap.fitBounds(coordinates);
}


// Example usage
const exampleCoordinates = [
  [48.863368120198004, 2.3509079846928516],
  [48.86933262048345, 2.3542531602919805],
  [48.87199261164275, 2.3400569901592183],
  [48.86993336274516, 2.3280142476578813],
  [48.86834104280146, 2.330308418109664],
];

addCoordinates(exampleCoordinates);
