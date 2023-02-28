const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_things_spa_db');

const Thing = conn.define('thing', {
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

const express = require('express');
const app = express();
const path = require('path');

app.use('/assets', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/things', async(req, res, next)=> {
  try {
    res.send(await Thing.findAll({
      attributes: {
        exclude: ['description']
      }
    }));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/things/:id', async(req, res, next)=> {
  try {
    res.send(await Thing.findByPk(req.params.id));
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, async()=> {
  try {
    console.log(`listening on port ${port}`);
    await conn.sync({ force: true });
    const [foo, bar, bazz, quq] = await Promise.all(['foo', 'bar', 'bazz', 'quq'].map( name => {
      return Thing.create({ name }); 
    }));
    await quq.update({
      description: 'QUQ!!!!'
    });
    console.log('ready to run');
  }
  catch(ex){
    console.log(ex);
  }
});
