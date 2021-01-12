"use strict";

var models = require('../database/models');

module.exports = {
  async cadastroCompra(data, billet, res) {
    const {
      id_produto,
      id_comprador,
    } = data;

    const compra = await models.compras.create({
      id_produto,
      id_comprador,
      id_boleto : billet.data.charge_id,
      link_boleto: billet.data.pdf.charge
    });
    res.status(200).send(compra);
  }
}