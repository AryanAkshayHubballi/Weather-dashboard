const apiKey = '1d7be1ed23d43049c8094facc3a7d1d3'; 

document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeatherData(city);
    }
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === 200) {
            displayCurrentWeather(data);
            getForecastData(city);
        } else {
            document.getElementById('current-weather').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const weatherHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
    document.getElementById('current-weather').innerHTML = weatherHTML;
}

async function getForecastData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (data.cod === "200") {
            displayForecast(data);
        } else {
            document.getElementById('forecast').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error(error);
    }
}

function displayForecast(data) {
    let forecastHTML = `<h2>5-Day Forecast for ${data.city.name}</h2>`;
    for (let i = 0; i < data.list.length; i += 8) {
        const forecast = data.list[i];
        forecastHTML += `
            <div>
                <p>${new Date(forecast.dt_txt).toLocaleDateString()}</p>
                <p>Temperature: ${forecast.main.temp}°C</p>
                <p>Weather: ${forecast.weather[0].description}</p>
            </div>
        `;
    }
    document.getElementById('forecast').innerHTML = forecastHTML;
}
