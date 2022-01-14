window.addEventListener("load", () => {
	let long;
	let lat;
	let temperatureDescription = document.querySelector('.temperature-description');
	let temperatureDegree = document.querySelector('.temperature-degree');
	let locationTimeZone = document.querySelector('.location-timezone');
	let locationTimeZoneSpan = document.querySelector('.location-timezone-span');
	let temperatureDiv = document.querySelector('.temperature');
	const temperatureSpan = document.querySelector('.temperature span');
	const feelsLike = document.querySelector('.feels-like');
	const windSpeed = document.querySelector('.wind-speed');
	const feelsLikeUnit = document.querySelector('#feels-like-unit');
	const windSpeedUnit = document.querySelector('#wind-speed-unit');
	let degreeSection = document.querySelector('.degree-section');



	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(
			UserPosition =>{
				long = UserPosition.coords.longitude;
				lat = UserPosition.coords.latitude;

				const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=6c1610ce361a71ee3d873840f1ac1d3e`
				fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data =>{
					const {temp, feels_like} = data.main;/*pulls out the data from main*/
					const [{description, icon, main}] = data.weather;
					const {country} = data.sys;
					const {speed} = data.wind;

					//Set DOM Elements from the API
					temperatureDegree.textContent = temp.toFixed(1);
					locationTimeZone.textContent = data.name;
					locationTimeZoneSpan.textContent = country;
					feelsLike.textContent = feels_like.toFixed(1);
					windSpeed.textContent = speed.toFixed(1);					

					function titleCase(str) {//to covert it to sentence case
					  str = str.toLowerCase().split(' ');
					  for (let i = 0; i < str.length; i++) {
					    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
					  }
					  return str.join(' ');
					}
					temperatureDescription.textContent = titleCase(description);

					//conversion formulas
					let fahrenheit = (temp * 9 / 5) + 32;
					let fahrenheit2 = (feels_like * 9 / 5) + 32;
					let kph = speed * 3.6;

					//Change temperature to celcius or fahrenheit
					temperatureDiv.addEventListener('click', () =>{
						if (temperatureSpan.textContent === '°C') {
							temperatureSpan.textContent = '°F';
							feelsLikeUnit.textContent = '°F';
							windSpeedUnit.textContent = 'km/h';
							temperatureDegree.textContent = fahrenheit.toFixed(2);
							feelsLike.textContent = fahrenheit2.toFixed(2);
							windSpeed.textContent = kph.toFixed(1);
						} else{
							temperatureSpan.textContent = '°C';
							feelsLikeUnit.textContent = '°C';
							windSpeedUnit.textContent = 'm/s';
							temperatureDegree.textContent = temp.toFixed(1);
							feelsLike.textContent = feels_like.toFixed(1);
							windSpeed.textContent = speed.toFixed(1);
						};
					})
				});
			}, errorCallback);
	} else {errorCallback};
	function errorCallback () {
		temperatureDescription.textContent = `Couldn't get any information`;
		temperatureDiv.textContent = 'We need your location😥';
	}
})