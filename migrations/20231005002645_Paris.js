/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('Paris', (table) => {
        table.increments(); // Colonne d'auto-incrémentation pour la clé primaire
        table.string('Nom');
        table.string('Adresse');
        table.integer('code postal');
        table.string('codesite');
        table.integer('bornes');
        table.string('operationnel');

      });
    
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('Paris');

  
};
