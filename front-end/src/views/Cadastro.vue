<template>
   <b-form-group label="Cadastro de Produto" label-for="Cadastro">
  <div name="Cadastro" id='divCadastro'>
    <form @submit.stop.prevent="onSubmit">
      <b-form-group label="Produto" label-for="nomeProduto">
        <b-form-input type="text" name="nomeProduto" v-model="model.nome"></b-form-input>
      </b-form-group>
      <b-form-group label="Preço" label-for="valorProduto">
        <b-form-input type="number" name="valorProduto" v-model="model.valor"></b-form-input>
      </b-form-group>
      {{model.valor}}
    </form>
  </div>
   </b-form-group>
</template>

<script>
export default {
  name:'Cadastro',

  data(){
    return{
      model: {
        nome:'',
        valor: null,
      },
    }
  },

  methods:{
    realFormatter(val){
      const valor = Number(val).toFixed(2)
      return `R$${valor}`;
    }
  },
}
</script>

<style>

</style>