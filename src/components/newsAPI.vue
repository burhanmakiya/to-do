<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import wetter from "./wetterAPI.vue";

const news = ref([]);
const selectedCategory = ref("technology");

const fetchNews = async () => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        apiKey: "a9a15c0bbdb5467e9cc803e474974f76",
        country: "us",
        category: selectedCategory.value,
        pageSize: 10,
      },
    });
    news.value = response.data.articles;
    console.log("API response:", response.data);
    console.log("Articles:", news.value);
  } catch (error) {
    alert("Error fetching news:", error);
  }
};

watch(selectedCategory, fetchNews);
onMounted(fetchNews);
</script>

<!-- the categories array are outside the <script setup> tag to avoid re-initializing it on each render. -->
<script>
export const categories = [
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <header class="app-header">
          <h1 class="app-title">
            <v-icon class="app-title__icon"
              >mdi mdi-newspaper-variant-outline</v-icon
            >
            Austrian News
          </h1>
          <wetter></wetter>
        </header>
        <v-select
          :items="categories"
          v-model="selectedCategory"
          label="Select a category"
          variant="solo"
        ></v-select>
        <v-row class="news-container">
          <v-col
            v-for="article in news"
            :key="article.url"
            class="news-card-col"
          >
            <v-card class="news-card">
              <div class="news-card__content">
                <img
                  :src="
                    article.urlToImage || 'https://via.placeholder.com/300x200'
                  "
                  alt="Article Image"
                  class="news-card__image"
                />
                <div class="news-card__details">
                  <v-card-title class="news-card__title">
                    {{ article.title }}
                  </v-card-title>
                  <v-card-subtitle class="news-card__date">
                    {{ article.publishedAt }}
                  </v-card-subtitle>
                  <p class="news-card__description">
                    {{ article.description }}
                  </p>
                </div>
              </div>
              <v-card-actions>
                <v-btn
                  class="news-card__button"
                  :href="article.url"
                  target="_blank"
                >
                  Read More
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.app-title {
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-weight: bold; /* Make the title bold */
  color: #333; /* Set a dark color for the title */
}

.app-title__icon {
  margin-right: 0.5rem;
}

.news-container {
  margin-top: 2rem;
  display: flex; /* Display the news cards in a row */
  flex-wrap: wrap; /* Allow the news cards to wrap to the next line */
  justify-content: space-around; /* Space the news cards evenly */
}

.news-card-col {
  margin-bottom: 2rem;
  max-width: 300px;
}

.news-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Add a subtle shadow to the card */
  border-radius: 10px; /* Round the card corners */
  overflow: hidden; /* Hide the content that overflows the border-radius */
}

.news-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-card__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}

.news-card__details {
  padding: 1rem;
}

.news-card__title {
  font-size: 1.25rem;
  font-weight: 600; /* Make the news title slightly bold */
  margin-bottom: 0.5rem; /* Add some space between the title and the date */
}

.news-card__date {
  font-size: 0.8rem;
  color: #999;
}

.news-card__description {
  margin-top: 1rem;
  font-size: 1rem; /* Set a readable font size for the description */
  line-height: 1.4; /* Improve the line spacing for better readability */
}

.news-card__button {
  text-transform: none;
  font-weight: 600; /* Make the button text slightly bold */
  background-color: #333; /* Set a dark background color for the button */
  color: #fff; /* Set the button text color to white */
  padding: 0.5rem 1rem;
  border-radius: 5px;
  margin-top: 1rem;
}

.v-btn {
  margin-right: 0.5rem;
}
</style>
