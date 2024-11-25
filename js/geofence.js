// Restaurant location coordinates
const restaurantLat = 6.4319652;
const restaurantLng = 3.4137135;
const maxDistance = 0.12; // Maximum allowed distance in kilometers

// Function to calculate distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Function to load the menu with geofencing (currently disabled)
function loadMenuWithGeofence(pdfUrl) {
  // Temporarily bypass geofencing check
  loadMenu(pdfUrl);

  // Uncomment the following code to re-enable geofencing
  /*
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;

        const distance = calculateDistance(
          userLat,
          userLng,
          restaurantLat,
          restaurantLng
        );
        console.log(`User is ${distance.toFixed(2)} km from the restaurant`);

        if (distance <= maxDistance) {
          loadMenu(pdfUrl); // Load the menu if within range
        } else {
          document.getElementById('access-message').style.display = 'flex'; // Show geofence message
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to verify your location. Please enable location services.');
      }
    );
  } else {
    alert('Geolocation is not supported by your browser.');
  }
  */
}
