window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  const temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const long = position.coords.longitude;
      const lat = position.coords.latitude;

      const proxy = "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/ce3f69eaffae6f52ce3ef51f8a33c5eb/${lat},${long}`;

      fetch(api)
        .then(resp => resp.json())
        .then(data => {
          const { temperature, summary, icon } = data.currently;
          data.currently.temperature;
          // Set DOM elements from API
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // formula for celsius

          let celsius = (temperature - 32) * (5 / 9);

          //set Icons

          setIcons(icon, document.querySelector(".icon"));

          // change temp from C to F
          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "F") {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  }
});

function setIcon(icon, iconId) {
  const skycons = new Skycons({ color: white });
  const currentIcon = icon.replace(/-/g, "_").toUpperCase();
  skycons.play();
  return skycons.set(iconId, Skycons[currentIcon]);
}
