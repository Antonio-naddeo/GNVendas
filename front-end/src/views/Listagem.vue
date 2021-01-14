<template>
  <div class="container">
    <b-row>
      <b-col cols="7" class="pl-3 p-right-stepsList">
        <!--pl-3 alinha o container do StepsList com o titulo-->
        <b-row>
          <b-col v-for="(item, index) in produtos" :key="index" class="col1">
            <ProdutoCard :produto="item" @comprar="comprar" />
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <div class="cliente-card">
          <b-card
            title="Cliente"
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>
              <form @submit.stop.prevent="cadastrar">
                <b-form-group label="Nome" label-for="nomeCliente">
                  <input
                    type="text"
                    name="nomeCliente"
                    class="input"
                    v-model="model.nome"
                  />
                </b-form-group>
                <b-form-group label="CPF" label-for="cpf">
                  <the-mask
                    type="text"
                    name="cpf"
                    v-model="model.cpf"
                    class="input"
                    :mask="['###.###.###-##']"
                    placeholderChar="#"
                  >
                  </the-mask>
                </b-form-group>
                <b-form-group label="Telefone" label-for="telefone">
                  <the-mask
                    name="telefone"
                    type="tel"
                    class="input"
                    v-model="model.telefone"
                    :mask="['(##) ####-#####']"
                    placeholderChar="#"
                  >
                  </the-mask>
                </b-form-group>
              </form>
            </b-card-text>
          </b-card>
        </div>
      </b-col>
    </b-row>
    <!-- <CompraModal ref="modalCompra" :compra="compra" /> -->
    <Modal ref="modal" :title="titleModal">
      <template v-slot:content>
        <div v-if="resultApi.err">
          {{ resultApi.message }}
        </div>
        
          <div class="d-block text-center"  v-else>
      <h3>link para o boleto:</h3> 
      <br>
      <a :href="resultApi.link_boleto">{{resultApi.link_boleto}}</a>
    </div>
      </template>
    </Modal>
  </div>
</template>

<script>
import ProdutoCard from "../components/ProdutoCard";
import Modal from "../components/Modal";
import axios from "axios";

export default {
  components: {
    ProdutoCard,
    Modal,
  },

  props: {
    sm: {
      type: String,
      default: "12",
    },
    md: {
      type: String,
      default: "6",
    },
    lg: {
      type: String,
      default: "6",
    },
    xl: {
      type: String,
      default: "6",
    },
  },

  data() {
    return {
      model: {
        nome: "",
        cpf: "",
        telefone: "",
      },
      produtos: [],
      resultApi: {},
    };
  },

  computed: {
    titleModal() {
      return this.resultApi.err
        ? "Erro na Compra"
        : "Compra Realizada com Sucesso";
    },
  },

  methods: {
    async comprar(produto) {
      const { id_produto } = produto;
      const validateCliente = this.validateCliente();
      if (validateCliente.err) {
        this.resultApi = validateCliente;
        this.$refs.modal.showModal();
        return;
      }
      try {
        const response = await axios.post(`http://localhost:3333/comprar/${id_produto}`, this.model);
        this.resultApi = { ...response.data, err: false }
      } catch (error) {
        this.resultApi = { 
          message:'Erro durante a Compra, Verifique os Dados do Cliente' , 
          err: true }
      }
      finally{
        this.$refs.modal.showModal();
      }
    },

    validateCliente() {
      const nome = this.model.nome;
      const telefone = this.model.telefone;
      const cpf = this.model.cpf;

      const regNome = new RegExp("^[ ]*(.+[ ]+)+.+[ ]*$");
      const regTel = new RegExp("^[1-9]{2}9?[0-9]{8}$");

      if (!regNome.test(nome)) {
        return { err: true, message: "Nome Inválido" };
      }
      if (!regTel.test(telefone)) {
        return { err: true, message: "Telefone Inválido" };
      }
      console.log(cpf.length);
      console.log(cpf.length != 11)
      if (cpf.length != 11) {
        return {
          err: true,
          message: "O CPF não possui os 11 digítos necessarios",
        };
      }
      return { err: false };
    },

    async listProdutos(){
      try {
      const response = await axios.get("http://localhost:3333/produtos");
      this.produtos = response.data;
    } catch (error) {
      this.resultApi = {
        err:true,
        message: 'Erro durante a Listagem dos produtos'
      }
      this.$refs.modal.showModal();
    }

    }
  },

  mounted() {
    this.listProdutos();
  },
};
</script>

<style>
.col1 {
  margin: 20px;
}
.container {
  width: 100%;
  background-color: #ffff;
}
.div-cliente {
  float: right;
  right: 0;
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
}
.cliente-card {
  position: relative;
  background-color: #c4c4c4;
  margin: 10px;
  padding: 0;
  border: 1px solid #888;
  width: 200px;
  height: 200px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animatetop;
  animation-duration: 0.4s;
  clear: both;
}
.input {
  width: 90%;
  align-self: center;
}
</style>
