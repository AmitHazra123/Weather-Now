
function getWeather(lat, lng)
{
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=6412782c9d0cac2732b7b4cd156de7e7&units=metric`)
  .then((response) => {
    // console.log(response);
    let weatherData = response.data;
    let currentTempr = weatherData.main.temp;
    $('#currentTempr').html(currentTempr +" <sup>o</sup>C");
    //$('#apparentTemp').html(apparentTemp.toFixed(1)+" <sup>o</sup>C");
    let humidity = weatherData.main.humidity;
    $('#humidity').html(humidity + " %");
    let windSpeed = weatherData.wind.speed;
    $('#windSpeed').html(windSpeed + " m/s");
    // let summary = weatherData.weather[0].description;
    // $('#summary').html(summary);
   $('#wind-speed').html(windSpeed + " m/s");
   $('#wind-pressure').html(weatherData.main.pressure+ " hpa");







   axios.get(`http://api.apixu.com/v1/forecast.json?key=b5c387b0076a461eb9e40808180404&q=${lat},${lng}&days=7`)
   .then((response) => {
     let weather7Days = response.data;
     $('#todaydate').html(weather7Days.location.localtime);
     $('#summary').html(weather7Days.current.condition.text);
     $('#icon').html(`<img src="https:${weather7Days.current.condition.icon}" class="img-fluid">`);
     $('#todaySummary').html(weather7Days.forecast.forecastday[0].day.condition.text);
     let dailyWeather = weather7Days.forecast.forecastday;
     let output ='';
     let weekForcastOutput='';
     if(dailyWeather.length>0){
     $.each(dailyWeather, (index, singleDay) => {
       output += `
         <div class="forecast">
          <div class="forecast-header">
             <div class="day">${getDay(singleDay.date)}</div>
           </div>
           <div class="forecast-content">
             <img src="https:${singleDay.day.condition.icon}" class="img-fluid">
             <div class="fontSet" id="dayHigh">${singleDay.day.avgtemp_c}<sup>o</sup></div>
             <small id="fontSet">${singleDay.day.mintemp_c}<sup>o</small><br>
             Sunrise: <small id="fontSet">${singleDay.astro.sunrise}</small>
           Sunset: <small id="fontSet">${singleDay.astro.sunset}</small>
           </div>
         </div>
         `;
       });
       $('#futuredaysForecast').html(output);
      } else{ $('#futuredaysForecast').html('<h3>No Data Found at This moment !! Please Try After Sometimes</h3>'); }
   })



   axios.get(`http://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&sensor=true`)
   .then((response) => {
     let locationArray = response.data.results[0];
     let full_Address = locationArray.formatted_address;
     $('#locationAddress').html(full_Address);
     let addressStrArray = full_Address.toString().split(',');
     let country = addressStrArray[addressStrArray.length-1];
     let city = addressStrArray[addressStrArray.length-3];
     axios.get(`https://api.wunderground.com/api/b8e7e676776e32f0/hourly/q/${country}/${city}.json`)
     .then((response)=> {
       // console.log(response);
       let weatherDataHourly = response.data.hourly_forecast;
       // console.log(weatherDataHourly);
       let outputHour = '';
       if(weatherDataHourly.length>0){
        $.each(weatherDataHourly, (index, singleHour) => {
          outputHour += `
          <div id="col-hour">
            <div class="row">
                <div class="col-md-12">
              ${singleHour.FCTTIME.civil} <br>${singleHour.FCTTIME.weekday_name_abbrev}
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                <img src ="${singleHour.icon_url}" class="img-fluid"><br>
                ${singleHour.condition}
                </div>
            </div>
            <div class="row">
                <div class="col-md-12">
                <small id="fontSet">${singleHour.temp.metric}<sup>o</small>
                </div>
            </div>
          </div>
          `;
        });
        $('#hourForecast').html(outputHour);
       } else{
        $('#hourForecast').html('<h3>No Data Found at This moment !! Please Try After Sometimes</h3>');
       }

     });

   })






  });
}



function getDay(date){
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var d = new Date(date);
   var dayName = d.toString().split(' ')[0];
  return(dayName);
}
