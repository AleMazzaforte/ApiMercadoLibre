const express = require('express');
const router = express.Router();
const controlador = require('../controladores/mainController');

router.get('/', controlador.getindex);

// Ruta para manejar el callback de autenticación de Mercado Libre
router.get('/auth/callback', controlador.handleAuthCallback);

// Ruta para obtener las categorías de Mercado Libre
router.get('/categories', controlador.getCategories);  // Nueva ruta

// Ruta para manejar notificaciones de Mercado Libre
router.post('/notifications', controlador.handleNotification);

// Ruta para obtener detalles de una transacción
router.get('/transaction/:operationNumber', controlador.getTransactionDetails);

module.exports = router;
