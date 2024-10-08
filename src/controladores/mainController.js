const axios = require('axios');
const mercadoLibreClient = require('../lib/mercadoLibreClient');

module.exports = {
    getindex: async (req, res) => {
        res.render('index', { transactionDetails: null });
    },

    handleAuthCallback: async (req, res) => {
        const { code } = req.query; // El código de autorización viene en la query string

        try {
            // Obtén el token de acceso usando el código
            const accessToken = await mercadoLibreClient.getAccessToken(code);
            
            // Guarda el token de acceso en la sesión o en un lugar seguro
            req.session.accessToken = accessToken;

            res.send('Autenticación exitosa, puedes cerrar esta ventana.');
        } catch (error) {
            console.error('Error handling auth callback:', error);
            res.status(500).send('Error handling authentication callback');
        }
    },

    // Nueva función para obtener las categorías
    getCategories: async (req, res) => {
        const accessToken = req.session.accessToken;

        if (!accessToken) {
            return res.status(401).send('No autorizado');
        }

        try {
            // Realiza una solicitud a la API de Mercado Libre para obtener las categorías
            const response = await axios.get('https://api.mercadolibre.com/sites/MLA/categories', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const categories = response.data;
            
            // Envía las categorías a la vista o como JSON
            res.render('categories', { categories });  // Puedes crear una vista 'categories.ejs'
        } catch (error) {
            console.error('Error getting categories:', error);
            res.status(500).send('Error obteniendo las categorías');
        }
    },

    // Función para obtener detalles de la transacción (ya existente)
    getTransactionDetails: async (req, res) => {
        const { operationNumber } = req.params;
        try {
            // Obtén el token de acceso desde la sesión
            const accessToken = req.session.accessToken;
            if (!accessToken) {
                return res.status(401).send('No autorizado');
            }

            const response = await axios.get(`https://api.mercadolibre.com/orders/${operationNumber}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const orderData = response.data;
            const customerName = orderData.buyer.name;
            const customerId = orderData.buyer.dni;  // O usa `cuit` si está disponible
            const phoneNumber = orderData.buyer.phone.number;
            const products = orderData.order_items.map(item => ({
                sku: item.item.sku,
                quantity: item.quantity
            }));

            res.json({
                customerName,
                customerId,
                phoneNumber,
                products
            });
        } catch (error) {
            console.error('Error getting transaction details:', error);
            res.status(500).send('Error getting transaction details');
        }
    },

    handleNotification: (req, res) => {
        const notification = req.body; // La notificación se envía en el cuerpo de la solicitud

        // Aquí deberías validar la notificación y procesarla según sea necesario
        console.log('Notificación recibida:', notification);

        // Responde a Mercado Libre para confirmar que recibiste la notificación
        res.status(200).send('Notificación recibida');
    }
};

