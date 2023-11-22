export function redirectToHomePage(store, router) {
  store.dispatch("resetState");
  router.push("/home");
}
