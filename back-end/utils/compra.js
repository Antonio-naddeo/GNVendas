"use strict";

var models = require('../database/models');

module.exports = {
  async cadastroCompra(data, billet, res, transaction,errorMessage) {
    try {
      
      if(errorMessage) throw errorMessage;
      
      const {
        id_produto,
        id_comprador,
      } = data;
      const compra = await models.compras.create({
        id_produto,
        id_comprador,
        id_boleto : billet.data.charge_id,
        link_boleto: billet.data.pdf.charge
      },{transaction});
      transaction.commit();
      res.status(200).send(compra);
    } catch (error) {
      transaction.rollback();
      console.log(error)
      res.status(typeof error === 'string' ? 400 : 500);
      res.send({message: typeof error === 'string' ? error : 'Ocorreu um erro durante a compra'})
      
    }
  }
}