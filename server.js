const { conn, Thing } = require('./db');

const express = require('express');
const app = express();
const path = require('path');

app.use('/assets', express.static('assets'));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use('/api/things', require('./things.router'));

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
