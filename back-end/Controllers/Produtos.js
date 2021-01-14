const { listen } = require('../app');
const models = require('../database/models');
const db = require('../utils/db');

module.exports = {
  async cadastro(req, res){
    const {
      nome,
      valor
    } = req.body;
    
    const valorNum = parseFloat(valor).toFixed(2);
    
    const validation = validateCadastro({nome, valorNum});
    
    let transaction;
    try {
      // Validações
      if(validation.err) throw validation.message;

      transaction = await db.getTransaction();
      const produtoResult = await models.produtos.create({nome, valor:valorNum},{transaction});

      await transaction.commit();
      
      res.status(201);
      res.send(produtoResult);
    } catch (error) {
      console.log(error)
      if(validation.err){
        res.status(400);
        return res.send(validation.message);
      }
      if(transaction){
        await transaction.rollback();
      }
        res.status(500);
        return res.send('Erro no cadastro do Produto');
    }
  },

  async list(req, res){
    try {
      const produtos = await models.produtos.findAll();
      res.status(200);
      res.send(produtos);  
    } catch (error) {
      res.status(500);
      res.send({message: 'Ocorreu um erro na conexao com banco de dados'}); 
      
    }
  }
}

function validateCadastro(data){
  const {
    nome,
    valorNum
  } = data;

  if(typeof nome !== 'string'){
    return { err: true,
      message: 'nome invalido'
    };
  }
  
  if(nome.length > 255){
    return { err: true,
      message: 'O nome do produto deve conter até 255 caracteres'
    };
  }

  if(isNaN(valorNum)){
    console.log(valorNum)
    return { err: true,
      message: 'O valor do produto deve ser um número'
    };
  }

  if(valorNum<=0){
    return { err: true,
      message: 'O valor do produto deve ser maior que R$0,00'
    };
  }

  return {err:false};

}