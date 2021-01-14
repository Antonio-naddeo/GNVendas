<template>
  <div class="produto" :title="produto.nome">
    <b-card
    :title="produto.nome"
    tag="article"
    style="max-width: 20rem;"
    class="mb-2 produto-card"
  >
    <b-card-text>
      R${{produto.valor}}
    </b-card-text>
    <b-button @click="compra" variant="primary">Comprar</b-button>
  </b-card>
  </div>
</template>

<script>
export default {
  props:{
    produto:{
      type:Object,
      required:true,
    }
  },
  methods: {
    compra(){
      console.log("emit")
      this.$emit('comprar', this.produto);
    }
  }

}
</script>

<style>
.produto {
  position: relative;
  background-color: #fefefe;
  margin: 10px;
  padding: 0;
  border: 1px solid #888;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  clear: both;
}
.produto-card{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.card_title{
  text-overflow: ellipsis !important;
  white-space: nowrap !important;
  overflow: hidden !important;
}
</style>