document.getElementById('locationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const city = document.getElementById('cityInput').value;
    const apiKey = '1d7be1ed23d43049c8094facc3a7d1d3';  

    console.log("City:", city);  // enter the city name with right spell

    // Current weather API URL link
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log("Current Weather URL:", currentWeatherUrl);  // current weather URL

    // 5-day forecast API URL link
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
    console.log("Forecast URL:", forecastUrl);  // forecast URL

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Current Weather Data:", data);  // current weather data from OPEN WEATHER MAP
            if (data.cod === 200) {
                document.getElementById('cityName').textContent = data.name;
                document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
                document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
                document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
                document.getElementById('windSpeed').textContent = `Wind Speed: ${data.wind.speed} km/h`;
                document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                document.getElementById('weatherContainer').style.display = 'block';
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('An error occurred while fetching the weather data. Please try again later.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            console.log("Forecast Data:", data);  //  forecast data
            const forecastContainer = document.getElementById('forecastContainer');
            forecastContainer.innerHTML = '';

            for (let i = 0; i < data.list.length; i += 8) {
                const forecastDay = data.list[i];
                const date = new Date(forecastDay.dt * 1000).toLocaleDateString();
                const temp = `Temp: ${forecastDay.main.temp}°C`;
                const desc = forecastDay.weather[0].description;
                const icon = `http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}.png`;

                const dayElement = document.createElement('div');
                dayElement.classList.add('forecast-day');
                dayElement.innerHTML = `
                    <p>${date}</p>
                    <img src="${icon}" alt="Weather Icon">
                    <p>${temp}</p>
                    <p>${desc}</p>
                `;

                forecastContainer.appendChild(dayElement);
            }
        })
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('An error occurred while fetching the forecast data. Please try again later.');
        });
});
