// Log to confirm JavaScript file is loaded
console.log("JavaScript connected");

// Get references to DOM elements once
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityNameDiv = document.getElementById("city-name");
const temperatureDiv = document.getElementById("temperature");
const windDiv = document.getElementById("wind");
const humidityDiv = document.getElementById("humidity");
const conditionDiv = document.getElementById("condition");
const conditionIcon = document.getElementById("condition-icon");
const precipitationDiv = document.getElementById("precipitation");
const messageDiv = document.getElementById("message");
const loadingDiv = document.getElementById("loading");
const weatherGrid = document.getElementById("weather-grid");

// Allow pressing Enter instead of clicking button
cityInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    searchButton.click();
  }
});

// Main click handler
searchButton.addEventListener("click", function () {

  // Read user input
  const cityName = cityInput.value.trim();

  // Prevent empty search
  if (cityName === "") {
    messageDiv.textContent = "Please enter a city name.";
    return;
  }

  // Reset UI before fetching
  messageDiv.textContent = "";
  loadingDiv.style.display = "block";
  weatherGrid.style.display = "none";

  // First API call to convert city name into coordinates
  fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`)
    .then(response => response.json())
    .then(data => {

      // Handle invalid city
      if (!data.results || data.results.length === 0) {
        loadingDiv.style.display = "none";
        messageDiv.textContent = "City not found.";
        return;
      }

      // Extract latitude and longitude
      const { latitude, longitude } = data.results[0];

      // Second API call to get weather data
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability&timezone=auto`
      )
        .then(response => response.json())
        .then(weatherData => {

          // Find current hour index
          const now = new Date();
          const hourKey = now.toISOString().slice(0, 13);
          const index = weatherData.hourly.time.findIndex(t => t.startsWith(hourKey));

          if (index === -1) {
            loadingDiv.style.display = "none";
            messageDiv.textContent = "Weather data unavailable.";
            return;
          }

          // Fill UI with fetched values
          cityNameDiv.textContent = cityName;
          temperatureDiv.textContent = weatherData.hourly.temperature_2m[index] + " °C";
          windDiv.textContent = weatherData.current_weather.windspeed + " km/h";
          humidityDiv.textContent = weatherData.hourly.relativehumidity_2m[index] + " %";
          precipitationDiv.textContent = weatherData.hourly.precipitation_probability[index] + " %";

          // Determine condition text
          const code = weatherData.current_weather.weathercode;
          let conditionText = "Unknown";

          if (code === 0) conditionText = "Clear";
          else if (code <= 3) conditionText = "Cloudy";
          else if (code >= 61 && code <= 67) conditionText = "Rain";
          else if (code >= 71 && code <= 77) conditionText = "Snow";

          conditionDiv.textContent = conditionText;

          // Match icon to condition
          conditionIcon.textContent =
            conditionText === "Clear" ? "☀️" :
            conditionText === "Cloudy" ? "☁️" :
            conditionText === "Rain" ? "🌧️" :
            conditionText === "Snow" ? "❄️" : "🌥️";

          // Reveal grid after everything is ready
          loadingDiv.style.display = "none";
          weatherGrid.style.display = "grid";
        });
    });
});
