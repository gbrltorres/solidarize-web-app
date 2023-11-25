import router from "@/router/index.js";

jest.mock("js-cookie");

describe("Given the Vue router", () => {
  it("Then has a route for /", () => {
    const route = "/";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("Página Inicial");
  });

  it("Then has a route for /cadastro", () => {
    const route = "/cadastro";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("Cadastro");
  });

  it("Then has a route for /cadastro-gestor", () => {
    const route = "/cadastro-gestor";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("Cadastro Gestor");
  });

  it("Then has a route for /login", () => {
    const route = "/login";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("Login");
  });

  it("Then has a route for /sucesso", () => {
    const route = "/sucesso";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("Usuário Cadastrado");
  });

  it("Then has a route for /sucesso-ong", () => {
    const route = "/sucesso-ong";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("ONG Cadastrada");
  });

  it("Then has a route for /dashboard", () => {
    const route = "/dashboard";
    const matchedRoute = router.resolve(route);
    expect(matchedRoute.name).toBe("Dashboard");
  });
});
