<template>
  <b-modal id="modal-compra" hide-footer>
    <template #modal-title>
      Compra Realizada
    </template>
    <div class="d-block text-center">
      <h3>link para o boleto:</h3> 
      <br>
      <a :href="compra.link_boleto">{{compra.link_boleto}}</a>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    compra: {
      type: Object,
      required: true,
    },
  },

  methods: {
    showModal(){
      this.$bvModal.show('modal-compra')
    }
  }
}
</script>

<style>

</style>