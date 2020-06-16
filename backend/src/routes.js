const express = require('express');
const cors = require('cors')

const ClientController = require('./controllers/ClientController');
const ProducerController = require('./controllers/ProducerController');
const ProductController = require('./controllers/ProductController');
const KitController = require('./controllers/KitController');
const OrderController = require('./controllers/OrderController');
const ChartController = require('./controllers/ChartController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.get('/clients', ClientController.index);
routes.post('/clients', ClientController.create);

routes.get('/producers', ProducerController.index);
routes.post('/producers', ProducerController.create);

routes.get('/products', ProductController.index);
routes.get('/products/producer', ProductController.indexByProducer);
routes.get('/products/:idProduto', ProductController.index);
routes.post('/products', ProductController.create);


routes.get('/kits/producer', KitController.indexByProducer);
routes.get('/kits/list/:idKit', KitController.indexFull);
routes.get('/kits/list', KitController.indexFull);
routes.get('/kits', KitController.index);
routes.post('/kits', KitController.create);

routes.get('/orders', OrderController.index);    
routes.get('/orders/producer', OrderController.indexByProducer);
routes.get('/orders/client', OrderController.indexByClient);
routes.get('/orders/:idOrder', OrderController.index);
routes.post('/orders/status', OrderController.status);
routes.post('/orders', OrderController.create);

routes.get('/charts', ChartController.index);    
routes.get('/charts/products', ChartController.indexProducts);  
routes.post('/charts', ChartController.create);
routes.delete('/charts/:idChart', ChartController.delete);

routes.get('/sessions', SessionController.index);
routes.post('/sessions', SessionController.create);


module.exports = routes;



