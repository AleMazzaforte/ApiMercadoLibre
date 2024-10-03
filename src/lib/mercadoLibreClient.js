const axios = require('axios');

// Configuración de la API de Mercado Libre
const clientId = '5687137389065913';  // Reemplaza con tu Client ID
const clientSecret = 'MYva47J9LmxQZYvfM5QCugvq6tpwlZWf';  // Reemplaza con tu Client Secret
const redirectUri = 'https://apimercadolibre-eight.vercel.app/categories';  // Reemplaza con tu Redirect URI

const apiUrl = 'https://api.mercadolibre.com';

// Función para obtener el token de acceso usando el código de autorización
const getAccessToken = async (code) => {
    try {
        const response = await axios.post(`${apiUrl}/oauth/token`, {
            grant_type: 'authorization_code',
            code,
            redirect_uri: redirectUri,
            client_id: clientId,
            client_secret: clientSecret,
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
};

// Exporta el cliente de Mercado Libre con los métodos necesarios
const mercadoLibreClient = {
    getAccessToken,
    // Puedes agregar más métodos para interactuar con la API de Mercado Libre aquí
};

module.exports = mercadoLibreClient;
