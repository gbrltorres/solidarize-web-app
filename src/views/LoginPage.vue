<template>
  <div class="container text-start mt-4 px-4">
    <div class="row">
      <div class="col-md-6">
        <h1>Logo aqui</h1>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <h3>Faça o login de usuário</h3>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <label for="email">E-mail:</label>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-4">
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="Digite seu e-mail"
        />
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-md-6">
        <label for="senha">Senha:</label>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-4">
        <input
          type="password"
          class="form-control"
          id="senha"
          placeholder="Digite sua senha"
        />
      </div>
    </div>
    <div class="row mt-4">
      <div class="col-auto">
        <button class="btn btn-primary">Fazer login</button>
      </div>
      <div class="col-auto">
        <a href="./assets/html/register-user.html" class="btn btn-link"
          >Cadastre-se</a
        >
      </div>
    </div>
  </div>
</template>
