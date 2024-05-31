const url = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const apiId = "&appid=95165a8b79a10f679f4fe22111132c77";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-box");
const weatherImg = document.getElementById("weather-img");

async function fetchWeatherByCoordinates(latitude, longitude) {
    try {
        const response = await fetch(`${url}&lat=${latitude}&lon=${longitude}${apiId}`);
        const result = await response.json();
        updateWeatherData(result);
    } catch (error) {
        // console.error('Error fetching weather data:', error);
    }
}

async function fetchWeatherByLocation(location) {
    try {
        const response = await fetch(`${url}&q=${location}${apiId}`);
        const result = await response.json();
        updateWeatherData(result);
    } catch (error) {
        document.getElementById("eror").innerText = "Invlaid location."
        document.getElementById("eror").classList.add("shake")
        setTimeout(()=>{
            document.getElementById("eror").innerText = ""
            document.getElementById("eror").classList.remove("shake")
        }, 3000)
    }
}

function updateWeatherData(data) {
    document.getElementById("description").innerText = data.weather[0].main;
    document.getElementById("temp").innerText = `${data.main.feels_like}°`;
    document.getElementById("location").innerText = `${data.name} (${data.sys.country})`;
    document.getElementById("min-temp").innerText = `${data.main.temp_min}°`;
    document.getElementById("max-temp").innerText = `${data.main.temp_max}°`;
    document.getElementById("wind-speed").innerText = data.wind.speed;
    document.getElementById("wind-angle").innerText = data.wind.deg;
    document.getElementById("pressure").innerText = data.main.pressure;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("longitude").innerText = data.coord.lon;
    document.getElementById("latitude").innerText = data.coord.lat;

    console.log(data.weather[0].description, weatherImg.src);

    switch (data.weather[0].main.toLowerCase()) {
        case 'haze':
            weatherImg.src = "./assets/weathers/haze.png";
            break;
        case 'clear':
            weatherImg.src = "./assets/weathers/sun.png";
            break;
        case 'clouds':
            weatherImg.src = "./assets/weathers/clouds.png";
            break;
        case 'rain':
            weatherImg.src = "./assets/weathers/raining.png";
            break;
        default:
            weatherImg.src = "./assets/weathers/unknown.png";
            break;
    }

}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            fetchWeatherByCoordinates(latitude, longitude);
        },
        function(error) {
            // console.error('Error getting user location:', error);
        }
    );
} else {
    // console.error('Geolocation is not supported by this browser.');
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (searchInput.value.trim() !== '') {
        fetchWeatherByLocation(searchInput.value);
        searchInput.value = "";
    }
});

