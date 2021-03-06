const models = require('../database/models');
const gerenciaNetApi = require('../utils/gerenciaNetApi');
const { cadastroCompra } = require('../utils/compra');
const db = require('../utils/db');

module.exports = {
  async cadastro(req, res){
    const { id_produto } = req.params;
    const { nome, cpf, telefone } = req.body;
    let transaction;
    try {
      transaction = await db.getTransaction();
      const validation = validateCadastro({id_produto,nome, cpf, telefone})
      if(validation.err){
        res.status(400)
        throw validation.message;
      }
      await models.produtos.update({
        data_compra: Date.now(),
      },{
        where: { id_produto },
        transaction
      });
      
      const comprador = await models.compradores.create({
        nome,
        telefone,
        cpf
      },{transaction});
  
      const produtoResult =  await models.produtos.findByPk(id_produto);
      let valorWithouComma = parseFloat(produtoResult.valor).toFixed(2);
      valorWithouComma = parseInt(String(valorWithouComma).replace('.',''));
  
      const data ={
        id_produto,
        id_comprador: comprador.id_comprador,
        nomeComprador: comprador.nome,
        cpf: comprador.cpf,
        telefone: comprador.telefone,
        nomeProduto:produtoResult.nome,
        valor:valorWithouComma,
      }
      gerenciaNetApi.createBillet(data, cadastroCompra ,res, transaction);
      
    } catch (error) {
      transaction.rollback();
      console.log(error)
      res.status(typeof error === 'string' ? 400 : 500);
      res.send( typeof error === 'string' ? error : 'Erro de Conexão com Banco de Dados')
    }
  },
}

function validateCadastro(data){
  const {
    id_produto,
    nome,
    cpf,
    telefone
  } = data;
  console.log(id_produto)

  const regNome = new RegExp("^[ ]*(.+[ ]+)+.+[ ]*$");
  const regTel = new RegExp("^[1-9]{2}9?[0-9]{8}$");

  const produto = models.produtos.findByPk(id_produto);

  if(!produto){
    return { err: true,
      message: 'id do produto inválido'
    };
  }

  if(typeof nome !== 'string'){
    return { err: true,
      message: 'Nome Inválido'
    };
  }
  if (!regNome.test(nome)) {
    console.log(nome)
    return { err: true, message: 'Nome Inválido' };
  }
  
  if(isNaN(telefone)){
    return { err: true,
      message: 'o telefone deve conter apenas números'
    };
  }
  if (!regTel.test(telefone)) {
    return { err: true, message: 'Telefone Inválido' };
  }
  
  if(isNaN(Number(cpf))){
    return { err: true,
      message: 'o CPF deve conter apenas números'
    };
  }

  if(cpf.length !== 11){
    return { err: true,
      message: 'O CPF deve ter 11 digitos'
    };
  }

  return {err:false};

}