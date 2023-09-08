const apiKey = "5c3092c59795918a99b5bf874aeca46a";
      const weatherInfo = document.getElementById("weather-info");
      const locationInput = document.getElementById("location-input");
      const getWeatherBtn = document.getElementById("get-weather-btn");
      const suggestions = document.getElementById("suggestions");

      // Define city coordinates for different cities in Pakistan
      const cities = {
        Karachi: { lat: 24.8607, lon: 67.0011 },
        Lahore: { lat: 31.5497, lon: 74.3436 },
        Islamabad: { lat: 33.6844, lon: 73.0479 },
        Faisalabad: { lat: 31.5497, lon: 73.3436 },
        Rawalpindi: { lat: 33.6844, lon: 72.0479 },
        Multan: { lat: 30.1798, lon: 71.2409 },
        Peshawar: { lat: 34.0151, lon: 71.5249 },
        Quetta: { lat: 30.1798, lon: 66.975 },
        Sialkot: { lat: 32.4945, lon: 74.5222 },
        Gujranwala: { lat: 32.1617, lon: 74.1883 },
        Abbottabad: { lat: 35.3191, lon: 73.225 },
        Sargodha: { lat: 32.0836, lon: 72.6711 },
        Bahawalpur: { lat: 29.3956, lon: 71.6836 },
        Sukkur: { lat: 27.7052, lon: 68.8574 },
        Larkana: { lat: 27.5594, lon: 68.2097 },
        Hyderabad: { lat: 25.3969, lon: 68.3772 },
        Mirpur_Khas: { lat: 25.5264, lon: 69.0117 },
        Quetta: { lat: 30.1798, lon: 66.975 },
        Gwadar: { lat: 25.1264, lon: 62.3221 },
        Gilgit: { lat: 35.3191, lon: 75.5811 },
        Skardu: { lat: 35.3177, lon: 75.5507 },
        Murree: { lat: 33.9022, lon: 73.4239 },
      };

      locationInput.addEventListener("input", () => {
        const query = locationInput.value.toLowerCase();
        const citySuggestions = Object.keys(cities).filter((city) =>
          city.toLowerCase().includes(query)
        );
        displaySuggestions(citySuggestions);
      });

      function displaySuggestions(suggestionsArray) {
        const suggestionsHTML = suggestionsArray
          .map((city) => `<div>${city}</div>`)
          .join("");
        suggestions.innerHTML = suggestionsHTML;
        suggestions.style.display =
          suggestionsArray.length > 0 ? "block" : "none";
      }

      suggestions.addEventListener("click", (event) => {
        locationInput.value = event.target.textContent;
        suggestions.style.display = "none";
      });

      getWeatherBtn.addEventListener("click", () => {
        const location = locationInput.value;
        // Check if the entered location matches a predefined city
        if (cities.hasOwnProperty(location)) {
          const { lat, lon } = cities[location];
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
          )
            .then((response) => response.json())
            .then((data) => {
              displayWeather(data);
            })
            .catch((error) => {
              console.error("Error fetching weather data:", error);
              weatherInfo.innerHTML =
                "<p>Unable to fetch weather data. Please try again later.</p>";
            });
        } else {
          weatherInfo.innerHTML = "<p>City not found.</p>";
        }
      });

      function displayWeather(data) {
        const cityName = data.name;
        const temperature = (data.main.temp - 273.15).toFixed(2); // Convert from Kelvin to Celsius
        const weatherDescription = data.weather[0].description;

        const weatherHTML = `
                <h2>Weather in ${cityName}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Condition: ${weatherDescription}</p>
            `;

        weatherInfo.innerHTML = weatherHTML;
      }