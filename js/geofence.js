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

// Function to load the menu with geofencing
function loadMenuWithGeofence(pdfUrl) {
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

        console.log(`Allowed maximum distance: ${maxDistance} km`);
        console.log(`Actual distance: ${distance.toFixed(2)} km`);

        if (distance <= maxDistance) {
          console.log("User is within the allowed distance. Loading menu...");
          loadMenu(pdfUrl);
        } else {
          console.log(
            "User is outside the allowed distance. Displaying geofence message..."
          );
          document.getElementById("access-message").style.display = "flex";
        }
      },
      (error) => {
        console.error("Error getting location:", error);
        alert(
          "Unable to verify your location. Please enable location services."
        );
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
  }
}
