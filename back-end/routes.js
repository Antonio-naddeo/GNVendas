const { Router } = require('express');
const ProdutoController = require('./Controllers/Produtos');
const ComprasController = require('./Controllers/Compras');

const routes = Router();

routes.post('/',ProdutoController.cadastro);
routes.get('/produtos',ProdutoController.list);
routes.post('/comprar/:id_produto',ComprasController.cadastro);

module.exports = routes;
