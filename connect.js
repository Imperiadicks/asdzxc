const {Weather} = require('./weather.js')
const {initDB} = require('./test.js');
const express = require('express');
const app = express();

const port = 3333;

app.use(express.json()) 

app.use(express.urlencoded({extended: true}));

(async () => {
  await initDB();

  app.listen(
      port,
      () => console.info(`Server running on port ${port}`)
    );
})();
module.exports = {app} 