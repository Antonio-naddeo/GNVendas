"use strict";
const moment = require("moment");
const Gerencianet = require("gn-api-sdk-node"); 

module.exports = {
  createBillet(data,cadastroCompra,res){
  const daysToExpire = 2;
  var clientId = "Client_Id_4e4327e045ceb277ed5f62db8c46c399c309e0bf";
  var clientSecret = "Client_Secret_bb1ad596c70e1c17089cd27ec860816670412681";

  var options = {
    client_id: clientId,
    client_secret: clientSecret,
    sandbox: true,
  };
  const { nomeComprador, cpf, telefone, nomeProduto, valor } = data;

  const expireDate = moment().add(daysToExpire, "days").format("YYYY-MM-DD");

  var body = {
    payment: {
      banking_billet: {
        expire_at: expireDate,
        customer: {
          name: nomeComprador,
          cpf,
          phone_number: telefone,
        },
      },
    },

    items: [
      {
        name: nomeProduto,
        value: valor,
      },
    ],
  };

  var gerencianet = new Gerencianet(options);

  gerencianet.oneStep([], body).then(function (result){ cadastroCompra(data,result,res) }).catch(console.log).done();
}
}
