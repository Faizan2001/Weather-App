document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submitButton");
  const input = document.getElementById("userInput");
  const output = document.getElementById("output");
  const unitToggle = document.getElementById("unitToggle");
  const unitLabel = document.getElementById("unitLabel");

  button.addEventListener("click", () => {
    getWeather();
  });

  unitToggle.addEventListener("change", () => {
    unitLabel.textContent = unitToggle.checked ? "Celsius" : "Fahrenheit";
    if (input.value.trim()) {
      getWeather();
    }
  });

  // Ze Enter key for quality of life improvements
  input.addEventListener("keypress", (event) => {
    if (event.key === "Enter" && input.value.trim()) {
      getWeather();
    }
  });

  async function getWeather() {
    const unitGroup = unitToggle.checked ? "metric" : "us";
    try {
      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${input.value}?unitGroup=${unitGroup}&key=92L3HSFTHS2F7EVYAHZKRPL4G&contentType=json`,
        { mode: "cors" }
      );

      const weatherData = await response.json();
      const data = weatherData.currentConditions.temp;

      const unit = unitGroup === "us" ? "Fahrenheit" : "Celsius";
      output.textContent = `Current Temperature in ${input.value}: ${data}° ${unit}`;
    } catch (error) {
      output.textContent = "Error fetching weather data. Please try again.";
    }
  }
});
