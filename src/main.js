import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Crie a instância do app Vue
const app = createApp(App);

// Use os plugins necessários
app.use(store);
app.use(router);
app.use(VueSweetalert2);

// Monte o app
app.mount("#app");
