<template>
  <div class="parent">
    <b-form-group
      label="Cadastro de Produto"
      label-for="Cadastro"
      class="title"
    >
      <div class="box">
        <form @submit.stop.prevent="cadastrar">
          <b-form-group
            label="Produto"
            label-for="nomeProduto"
            class="subtitle"
          >
            <b-form-input
              type="text"
              name="nomeProduto"
              v-model="model.nome"
              class="input"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Preço" label-for="valorProduto" class="subtitle">
            <b-form-input
              name="valorProduto"
              v-model="model.valor"
              class="input"
              v-money="money"
            />
          </b-form-group>
          <b-button type="submit"  variant="light" class="button">Cadastrar</b-button>
        </form>
      </div>
    </b-form-group>
  </div>
</template>

<script>
import { VMoney } from "v-money";
import axios from "axios";

export default {
  name: "Cadastro",

  directives: { money: VMoney },

  data() {
    return {
      model: {
        nome: "",
        valor: "",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
      },
    };
  },
  computed: {
    preco(){
      const valor = this.model.valor.substring(2);
      const valorWithoutDot = valor.replace('.','');
      return valorWithoutDot.replace(',','.');
    }
  },

  methods: {
    cadastrar() {
      const valor = this.removeCurrency(this.model.valor);
      const dataToSend = {
        nome: this.model.nome,
        valor,
      }
      axios
        .post("http://localhost:3333/", dataToSend)
        .then((response) => console.log(response.data));

      this.model.nome = '';
      this.model.valor = '';

    },

    removeCurrency(val){
      const valor = val.substring(2);
      const valorWithoutDot = valor.replace('.','');
      return valorWithoutDot.replace(',','.');
    }
  },

};
</script>

<style>
.parent {
  margin-left: 30%;
  margin-right: 30%;
}

.title {
  color: #f37021;
  font-size: 35px;
  font-weight: bold;
  text-align: start;
}
.input {
  margin: auto;
  border: 2px solid #008b9f;
}
.box {
  border-radius: 10px;
  margin: auto;
  padding: 50px;
  border: 2px solid #62efff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
}
.button {
  margin: auto;
  width: 50%;
  background-color: #f37021;
  color: white;
  font-weight: bold;
  text-emphasis-color: #b94000;
  border-color: #f37021;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  font-size: 20px;
}
.subtitle {
  color: #008b9f;
  font-size: 20px;
  font-weight: normal;
  margin-left: 0px;
}
</style>
