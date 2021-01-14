<template>
  <b-modal id="modal-compra" hide-footer>
    <template #modal-title>
      {{title}}
    </template>
    <div class="d-block text-center">
      <slot name='content'></slot>
    </div>
  </b-modal>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
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