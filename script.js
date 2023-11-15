"strict mode";

const contentContainer = document.querySelector(".content");
const searchBtn = document.querySelector(".search--btn");
const inputField = document.querySelector(".search--input");

const renderSpinner = function () {
  const markup = `
        <div class="spinner">
        </div>
        `;
  contentContainer.innerHTML = "";
  contentContainer.insertAdjacentHTML("beforeend", markup);
};

const renderData = async function () {
  try {
    renderSpinner();
    const cityName = inputField.value;
    if (cityName === "") return;
    inputField.value = "";

    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=828accc2dfd80e9344ba66bbf61468ba`
    );
    const [countryData, ...others] = await response.json();
    if (countryData === undefined) {
      throw new Error("Problem getting the City Details");
    }
    const city = countryData.name;
    const fetchWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${countryData.lat}&lon=${countryData.lon}&appid=828accc2dfd80e9344ba66bbf61468ba&units=metric`
    );

    const weatherData = await fetchWeather.json();
    const temp = weatherData.main.temp.toFixed(0);
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;

    const html = `
                <img src="images/${weatherData.weather[0].main}.png" alt="Rain icon" class="weather--icon" />
                <h1 class="temp">${temp}℃</h1>
                <h2 class="city">${city}</h2>
                
                <div class="other-details">
                <div class="humidity">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#fffff"
                viewBox="0 0 256 256"
                class="humidity--icon"
                >
                <path
                d="M34.33,77.68a8,8,0,0,1,0-11.34C35.1,65.59,53.1,48,88,48c18.42,0,32.24,9.21,44.44,17.34C143.74,72.88,154.42,80,168,80a72.21,72.21,0,0,0,31.75-6.83,44.87,44.87,0,0,0,10.63-6.87,8,8,0,0,1,11.27,11.36C220.9,78.41,202.9,96,168,96c-18.42,0-32.24-9.21-44.44-17.34C112.26,71.12,101.58,64,88,64a72.21,72.21,0,0,0-31.75,6.83A44.87,44.87,0,0,0,45.62,77.7,8,8,0,0,1,34.33,77.68ZM210.38,122.3a44.87,44.87,0,0,1-10.63,6.87A72.21,72.21,0,0,1,168,136c-13.58,0-24.26-7.12-35.56-14.66C120.24,113.21,106.42,104,88,104c-34.9,0-52.9,17.59-53.65,18.34A8,8,0,0,0,45.62,133.7a44.87,44.87,0,0,1,10.63-6.87A72.21,72.21,0,0,1,88,120c13.58,0,24.26,7.12,35.56,14.66,12.2,8.13,26,17.34,44.44,17.34,34.9,0,52.9-17.59,53.65-18.34a8,8,0,0,0-11.27-11.36Zm0,56a44.87,44.87,0,0,1-10.63,6.87A72.21,72.21,0,0,1,168,192c-13.58,0-24.26-7.12-35.56-14.66C120.24,169.21,106.42,160,88,160c-34.9,0-52.9,17.59-53.65,18.34A8,8,0,0,0,45.62,189.7a44.87,44.87,0,0,1,10.63-6.87A72.21,72.21,0,0,1,88,176c13.58,0,24.26,7.12,35.56,14.66,12.2,8.13,26,17.34,44.44,17.34,34.9,0,52.9-17.59,53.65-18.34a8,8,0,0,0-11.27-11.36Z"
                ></path>
                </svg>
                <p class="value">${humidity}%</p>
                <p class="element">Humidity</p>
                </div>
                <div class="wind-speed">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#fffff"
                viewBox="0 0 256 256"
                class="speed--icon"
                >
                <path
                d="M184,184a32,32,0,0,1-32,32c-13.7,0-26.95-8.93-31.5-21.22a8,8,0,0,1,15-5.56C137.74,195.27,145,200,152,200a16,16,0,0,0,0-32H40a8,8,0,0,1,0-16H152A32,32,0,0,1,184,184Zm-64-80a32,32,0,0,0,0-64c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C105.74,60.73,113,56,120,56a16,16,0,0,1,0,32H24a8,8,0,0,0,0,16Zm88-32c-13.7,0-26.95,8.93-31.5,21.22a8,8,0,0,0,15,5.56C193.74,92.73,201,88,208,88a16,16,0,0,1,0,32H32a8,8,0,0,0,0,16H208a32,32,0,0,0,0-64Z"
                ></path>
                </svg>
                <p class="value">${windSpeed} km/h</p>
                <p class="element">Wind-speed</p>
                </div>
                </div>
                </div>
                </div>`;

    contentContainer.innerHTML = "";
    contentContainer.insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    alert("Incorrect City Entered !!! Check the spelling and enter again");
  }
};

searchBtn.addEventListener("click", renderData);
window.addEventListener("keydown", function (e) {
  if (inputField.value !== "" && e.key === "Enter") renderData();
});
