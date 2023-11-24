import deauthenticateUser from "@/usecases/deauthenticateUser";

export async function redirectToHomePage(store, router) {
  await deauthenticateUser.logout();
  store.dispatch("resetState");
  router.push("/");
}
