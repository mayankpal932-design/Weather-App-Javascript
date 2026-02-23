async function searchCity() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("City name likh bhai 😄");
    return;
  }

  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );
    const geoData = await geoRes.json();

    if (!geoData.results) {
      alert("City not found 😕");
      return;
    }

    const { latitude, longitude, name } = geoData.results[0];
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    const weatherData = await weatherRes.json();
    const w = weatherData.current_weather;

    document.querySelector("h3").innerText = name;
    document.getElementById("temperature").innerText = w.temperature + " °C";
    document.getElementById("windspeed").innerText = w.windspeed + " km/h";
    document.getElementById("winddirection").innerText = w.winddirection;
    document.getElementById("is_day").innerText =
      w.is_day === 1 ? "Day ☀️" : "Night 🌙";
    document.getElementById("time").innerText = w.time;

  } catch (error) {
    console.error(error);
    alert("Something went wrong 😵");
  }
}
searchCityWithDefault();

async function searchCityWithDefault() {
  document.getElementById("cityInput").value = "Delhi";
  searchCity();
}
