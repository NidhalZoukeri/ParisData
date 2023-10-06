const mysql = require('mysql2');

// Créez une connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost', // L'hôte de votre base de données
  user: 'nidhal', // Votre nom d'utilisateur MySQL
  password: '0000', // Votre mot de passe MySQL
  database: 'TestD' // Le nom de votre base de données
});

// Connectez-vous à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données :', err);
    throw err;
  }
  console.log('Connecté à la base de données MariaDB.');
});

module.exports = db; // Exportez la connexion à la base de données pour l'utiliser dans d'autres fichiers.
