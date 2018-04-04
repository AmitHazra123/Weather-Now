
$(document).ready(()=> {
  $('#locationForm').submit((e) => {
    let inputLocation = $('#location').val();
    let encodedLocation = encodeURIComponent(inputLocation);
    getLocation(encodedLocation);
    e.preventDefault();
  });
});

function getCoordinate(){
  if(navigator.geolocation){
  			navigator.geolocation.getCurrentPosition(showPosition);
  		} else{
  			x.innerHTML = "Not supported"
  		}
  	function showPosition(position){
  		let lat = position.coords.latitude
  		let lng = position.coords.longitude
  		getWeather(lat, lng);
  	}
  }
function getLocation(searchLocation){
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDC8t4IirVUSy8VzXgNYHUBQZboaOKGFCo&address=${searchLocation}`)
  .then((response) => {
    // console.log(response);
    let resultsArray = response.data.results;
    let full_Address = resultsArray[0].formatted_address;
    let latitude = resultsArray[0].geometry.location.lat;
    let longitude = resultsArray[0].geometry.location.lng;
    document.getElementById("locationAddress").innerHTML = full_Address;
    getWeather(latitude, longitude);


  })
};
