var inputOne = document.querySelector("#inputOne");

async function locationGet(country) {
  try {
    var response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=910c3177d197408c9e2185328242611&q=${country}&days=3`
    );

    if (!response.ok) throw new Error("Failed to fetch data");

    var finalResult = await response.json();
    var curr = finalResult.current;
    var loc = finalResult.location;
    var forecast = finalResult.forecast.forecastday;

    display(curr, loc, forecast);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

inputOne.addEventListener("keyup", (e) => {
  var inputValue = e.target.value.trim();

  if (inputValue.length >= 3) {
    locationGet(inputValue);
  }
});

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function display(curr, loc, forecast) {
  var currDate = new Date(curr.last_updated.replace(" ", "T"));
  var cartona = `
    <div class="cardOne">
      <div class="nameDay d-flex justify-content-between flex-wrap colorText">
        <p class="my-1 py-1">${days[currDate.getDay()]}</p>
        <p class="my-1 py-1">${currDate.getDate()} ${
    monthNames[currDate.getMonth()]
  }</p>
      </div>
      <div class="cardContent p-3">
        <h5 class="colorText">${loc.name}</h5>
        <h3>${curr.temp_c}°C</h3>
        <img src="https:${
          curr.condition.icon
        }" class="w-25" alt="Weather Icon" />
        <p>${curr.condition.text}</p>
        <div class="icons colorText">
          <span>
            <img src="./image/icon-umberella.png" alt="" />
            ${forecast[0].day.daily_chance_of_rain}%
          </span>
          <span>
            <img src="./image/icon-wind.png" alt="" />
            ${curr.wind_kph} Km/h
          </span>
          <span>
            <img src="./image/icon-compass.png" alt="" />
            ${curr.wind_dir}
          </span>
        </div>
      </div>
    </div>`;

  for (var i = 1; i < forecast.length; i++) {
    var forecastDate = new Date(forecast[i].date);
    cartona += `
      <div class="cardtwo">
        <div class="nameDay colorText">
          <p class="my-1 py-1">${days[forecastDate.getDay()]}</p>
        </div>
        <div class="cardContent p-3 d-flex flex-column py-5 align-items-center">
          <img src="https:${
            forecast[i].day.condition.icon
          }" class="w-25" alt="Forecast Icon" />
          <div class="degree text-center py-3">
            <h4>${forecast[i].day.maxtemp_c}°C</h4>
            <h5 class="fs-6 colorText">${forecast[i].day.mintemp_c}°C</h5>
          </div>
          <p>${forecast[i].day.condition.text}</p>
        </div>
      </div>`;
  }

  document.querySelector(".cards").innerHTML = cartona;
}
locationGet("cairo");
