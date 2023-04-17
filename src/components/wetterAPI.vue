<template>
  <div v-if="weather" class="weather-container">
    <h3>{{ weather.location.name }}</h3>
    <p>Temperature: {{ weather.current.temp_c }}°C</p>
    <p>Feels Like: {{ weather.current.feelslike_c }}°C</p>
    <p>Condition: {{ weather.current.condition.text }}</p>
    <img :src="weather.current.condition.icon" alt="Weather Icon" />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const weather = ref(null); // Create a reactive variable to store the weather data

const fetchWeatherData = async () => {
  try {
    const response = await axios.get(
      "https://weatherapi-com.p.rapidapi.com/current.json",
      {
        params: { q: "48.210033, 16.363449" },
        headers: {
          "X-RapidAPI-Key":
            "3a977d32a6msh59c4ff3f34149d6p171e0djsn04a1421d9324",
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
        },
      }
    );

    weather.value = response.data; // Assign the fetched data to the reactive variable
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchWeatherData();
});
</script>

<style scoped>
.weather-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 12rem;
  width: 15rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  background-color: #f5f3f3;
}

.weather-container h3 {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
</style>
