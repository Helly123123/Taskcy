import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // Импорт настроек
import "./assets/main.css";

const app = createApp(App);

app.use(router); // Подключаем роутер
app.mount("#app");
