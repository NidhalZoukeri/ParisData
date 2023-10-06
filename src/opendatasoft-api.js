// opendatasoft-api.js

const axios = require('axios');

// Définissez la fonction fetchOpendatasoftData
async function fetchOpendatasoftData() {
  try {
    const response = await axios.get('https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/sites-disposant-du-service-paris-wi-fi/records?limit=20');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    throw error;
  }
}

// Exportez la fonction pour qu'elle puisse être utilisée dans d'autres fichiers
module.exports = {
  fetchOpendatasoftData,
};
