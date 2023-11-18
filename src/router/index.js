import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
  {
    path: "/",
    name: "Página Inicial",
    component: HomePage,
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    component: () =>
      import(
        /* webpackChunkName: "register-user" */ "../views/RegisterUserPage.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
