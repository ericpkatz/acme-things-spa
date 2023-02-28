const { conn, Thing } = require('./db');

const express = require('express');
const app = express.Router();

module.exports = app;

app.get('/', async(req, res, next)=> {
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

app.get('/:id', async(req, res, next)=> {
  try {
    const thing = await Thing.findByPk(req.params.id);
    if(!thing){
      res.sendStatus(404);
    }
    else {
      res.send(thing);
    }
  }
  catch(ex){
    next(ex);
  }
});
