import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../views/HomePage.vue";
import NotFoundPage from "../views/NotFoundPage.vue";
import Cookies from "js-cookie";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Página Inicial",
    component: HomePage,
  },
  {
    path: "/cadastro",
    name: "Cadastro",
    beforeEnter: [checkEmail],
    component: () =>
      import(
        /* webpackChunkName: "register-user" */ "../views/RegisterUserPage.vue"
      ),
  },
  {
    path: "/cadastro-gestor",
    name: "Cadastro Gestor",
    beforeEnter: [checkEmail],
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
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: [checkToken],
    component: () =>
      import(
        /* webpackChunkName: "dashboard-page" */ "../views/DashboardPage.vue"
      ),
  },
  { path: "/:pathMatch(.*)*", component: NotFoundPage },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

function checkEmail(to, from, next) {
  const userEmail = store.state.email;

  if (!userEmail) {
    next({ name: "Página Inicial" });
  } else {
    next();
  }
}

function checkToken(to) {
  const token = Cookies.get("token");

  if (!token && to.name !== "Página Inicial") {
    return "/";
  }
}

export default router;
