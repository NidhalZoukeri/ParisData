const express = require('express');
const app = express();
const port = 3000;
const opendatasoftApi = require('./opendatasoft-api');
app.use(express.static('public'));

const mysql = require('mysql');
const dbConfig = {
  host: 'localhost',
  user: 'nidhal',
  password: '0000',
  database: 'pariswifi' // Nom de la base de données MySQL
};
const db = mysql.createConnection(dbConfig);

// Connexion à la base de données MySQL
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données MySQL :', err);
    throw err;
  }
  console.log('Connecté à la base de données MySQL');
});

// Définition de la structure de la table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS pariswifi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom_site VARCHAR(255),
    arc_adresse VARCHAR(255),
    cp VARCHAR(10),
    idpw VARCHAR(10),
    nombre_de_borne_wifi INT,
    etat2 VARCHAR(50),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
  )
`;

// Fonction pour créer la table
function createTable() {
  db.query(createTableQuery, (err) => {
    if (err) {
      console.error('Erreur lors de la création de la table :', err);
      throw err;
    }
    console.log('Table "pariswifi" créée avec succès.');
  });
}

app.get('/opendatasoft-data', async (req, res) => {
  try {
    const data = await opendatasoftApi.fetchOpendatasoftData();

    // Utilisez une boucle pour insérer chaque enregistrement dans la base de données
    for (const record of data.results) {
      const { nom_site, arc_adresse, cp, idpw, nombre_de_borne_wifi, etat2, geo_point_2d } = record;

      // Créez votre requête d'insertion SQL
      const insertQuery = `
        INSERT INTO pariswifi (nom_site, arc_adresse, cp, idpw, nombre_de_borne_wifi, etat2, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      // Exécutez la requête SQL
      db.query(insertQuery, [
        nom_site,
        arc_adresse,
        cp,
        idpw,
        nombre_de_borne_wifi,
        etat2,
        geo_point_2d.lat,
        geo_point_2d.lon
      ]);
    }

    res.json(data); // Envoyez les données au format JSON comme réponse
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données :', error);
    res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données' });
  }
});

app.get('/d', (req, res) => {
  res.sendFile('index.html', { root: __dirname + '/public' });
});

//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
// Créez la table avant de démarrer le serveur
createTable();

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
