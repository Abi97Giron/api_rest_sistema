const express = require('express');
const { createProducto, getProductos, updateProducto, deleteProducto, getProductoById } = require('../controllers/productoController');
const { createCategoria, updateCategoria } = require('../controllers/categoriaController');
const { createEstado, updateEstado } = require('../controllers/estadoController');
const { createUsuario, updateUsuario } = require('../controllers/usuarioController');
const { createCliente, updateCliente } = require('../controllers/clienteController');
const { createOrden, updateOrden, getOrdenes, getOrdenDetalles } = require('../controllers/ordenController');
const { login } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/login', login); 

router.post('/productos', verifyToken, createProducto); 
router.get('/productos', verifyToken, getProductos);   
router.get('/productos/:id', verifyToken, getProductoById);  
router.put('/productos/:id', verifyToken, updateProducto); 
router.delete('/productos/:id', verifyToken, deleteProducto); 

router.post('/categorias', verifyToken, createCategoria); 
router.put('/categorias/:id', verifyToken, updateCategoria); 

router.post('/estados', verifyToken, createEstado); 
router.put('/estados/:id', verifyToken, updateEstado); 

router.post('/usuarios', verifyToken, createUsuario); 
router.put('/usuarios/:id', verifyToken, updateUsuario); 

router.post('/clientes', verifyToken, createCliente); 
router.put('/clientes/:id', verifyToken, updateCliente); 

router.post('/ordenes', verifyToken, createOrden); 
router.put('/ordenes/:id', verifyToken, updateOrden); 
router.get('/ordenes', verifyToken, getOrdenes); 
router.get('/ordenes/:id/detalles', verifyToken, getOrdenDetalles); 

module.exports = router;
