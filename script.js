// Confirm JS file is loaded correctly
console.log("Weatherstack JS connected");

// Grabbing required DOM elements once
const cityInput = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const messageDiv = document.getElementById("message");
const loadingDiv = document.getElementById("loading");

// Output fields
const cityNameDiv = document.getElementById("city-name");
const temperatureDiv = document.getElementById("temperature");
const windDiv = document.getElementById("wind");
const humidityDiv = document.getElementById("humidity");
const conditionDiv = document.getElementById("condition");
const precipitationDiv = document.getElementById("precipitation");

// Weatherstack API key
const API_KEY = "fbe46433b25247cf21b6d5674259c58f";

// Allow Enter key to trigger search
cityInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") searchButton.click();
});

// Button click handler
searchButton.addEventListener("click", function () {
  const city = cityInput.value.trim();

  // Basic input validation
  if (city === "") {
    messageDiv.textContent = "Please enter a city name.";
    return;
  }

  // Reset UI before fetching
  messageDiv.textContent = "";
  loadingDiv.style.display = "block";
  document.getElementById("weather-grid").style.display = "none";

  // Build Weatherstack API URL
  const url =
    `https://api.weatherstack.com/current` +
    `?access_key=${API_KEY}` +
    `&query=${encodeURIComponent(city)}` +
    `&units=m`;

  // Fetch current weather data
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Handle API-side errors
      if (data.error) {
        messageDiv.textContent = data.error.info;
        loadingDiv.style.display = "none";
        return;
      }

      // Extract current weather object
      const current = data.current;
      const location = data.location;

      // Fill UI with values returned by API
      cityNameDiv.textContent = location.name;
      temperatureDiv.textContent = current.temperature + " °C";
      windDiv.textContent = current.wind_speed + " km/h";
      humidityDiv.textContent = current.humidity + " %";
      conditionDiv.textContent = current.weather_descriptions[0];
      precipitationDiv.textContent = current.precip + " %";

      // Hide loader and show grid
      loadingDiv.style.display = "none";
      document.getElementById("weather-grid").style.display = "grid";
    })
    .catch(error => {
      // Network or fetch-level error handling
      console.error(error);
      messageDiv.textContent = "Something went wrong. Try again.";
      loadingDiv.style.display = "none";
    });
});
