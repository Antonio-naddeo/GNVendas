const models = require('../database/models');
const gerenciaNetApi = require('../utils/gerenciaNetApi');
const { cadastroCompra } = require('../utils/compra');

module.exports = {
  async cadastro(req, res){
    const { id_produto } = req.params;
    const { nome, cpf, telefone } = req.body;
    await models.produtos.update({
      data_compra: Date.now(),
    },{
      where: { id_produto }
    });
    
    const comprador = await models.compradores.create({
      nome,
      telefone,
      cpf
    });

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
    gerenciaNetApi.createBillet(data, cadastroCompra ,res);
  },
}

function validateCadastro(data){
  const {
    id_produto,
    nome,
    cpf,
    telefone
  } = data;

  const produto = models.produtos.findByPk({id_produto});

  if(!produto){
    return { err: true,
      message: 'id do produto inválido'
    };
  }

  if(typeof nome !== 'string'){
    return { err: true,
      message: 'nome invalido'
    };
  }
  
  if(isNaN(Number(cpf))){
    return { err: true,
      message: 'o CPF deve conter apenas números'
    };
  }

  if(isNaN(telefone)){
    return { err: true,
      message: 'o telefone deve conter apenas números'
    };
  }

  if(cpf.length !== 11){
    return { err: true,
      message: 'O CPF deve ter 11 digitos'
    };
  }

  return {err:false};

}