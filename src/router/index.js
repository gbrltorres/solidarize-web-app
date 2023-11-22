import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";

const routes = [
  {
    path: "/home",
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
    path: "/cadastro-gestor",
    name: "Cadastro Gestor",
    component: () =>
      import(
        /* webpackChunkName: "register-manager" */ "../views/RegisterManagerPage.vue"
      ),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginPage.vue"),
  },
  {
    path: "/sucesso",
    name: "Usuário Cadastrado",
    component: () =>
      import(
        /* webpackChunkName: "user-success-page" */ "../views/UserSuccessPage.vue"
      ),
  },
  {
    path: "/sucesso-ong",
    name: "ONG Cadastrada",
    component: () =>
      import(
        /* webpackChunkName: "ngo-success-page" */ "../views/NgoSuccessPage.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
