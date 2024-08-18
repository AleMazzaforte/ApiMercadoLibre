const express = require('express');
const router = express.Router();
const controlador = require('../controladores/mainController');

router.get('/', controlador.getindex);

// Ruta para manejar el callback de autenticación de Mercado Libre
router.get('/auth/callback', controlador.handleAuthCallback);

// Ruta para manejar notificaciones de Mercado Libre
router.post('/notifications', controlador.handleNotification);

// Ruta para obtener detalles de una transacción
router.get('/transaction/:operationNumber', controlador.getTransactionDetails);

// Ruta para obtener autorizacion
router.get('/auth', (req, res) => {
    const authUrl = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}`;
    res.redirect(authUrl);
});
module.exports = router;
