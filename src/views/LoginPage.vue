<template>
  <div class="container">
    <form class="login-form">
      <h1 class="mt-3">Login</h1>
      <div class="row mt-3 mb-3">
        <div class="col-md-6">
          <label for="email">E-mail:</label>
          <input
            type="email"
            class="form-email"
            id="email"
            placeholder="Digite seu e-mail"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <label for="senha">Senha:</label>
          <input
            type="password"
            class="form-password"
            id="senha"
            placeholder="Digite sua senha"
          />
        </div>
      </div>
      <div class="row mb-3">
        <div class="col-md-6">
          <button type="submit" class="btn btn-primary mr-3">
            Fazer login
          </button>
          <a class="btn btn-link text-decoration-none"> Cadastre-se </a>
        </div>
      </div>
    </form>
  </div>
</template>
