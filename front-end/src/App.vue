<template>
  <div id="app">
    <div id="nav" class="top_bar">
      <h1 class="gn_vendas">GN-Vendas</h1>
      <div class="pages">
      <router-link to="/">Cadastro de Produto</router-link> |
      <router-link to="/produtos">Lista de Produtos</router-link>
    </div>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #f37021;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #c2bfbf;
  margin: 15px;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}

.top_bar{
  background-color:  #f37021;
  margin-bottom: 50px;
  display: flex;

}
.gn_vendas{
  color: white;
  font-size: 30px;
  margin-left: 20%;
  font-weight: bold;
  position: absolute;
}
.pages{
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  font-size: 20px;
}
</style>
