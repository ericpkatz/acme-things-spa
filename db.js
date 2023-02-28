const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_things_spa_db');

const Thing = conn.define('thing', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4
  },
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  }
});

Thing.addHook('beforeSave', (thing)=> {
  if(!thing.description){
    thing.description = new Array(50).fill(thing.name).join('\n');
  }
});

module.exports = {
  conn,
  Thing
};

