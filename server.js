'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Books = require('./book.js')
const mongoose = require('mongoose')


const app = express();
app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose is connected')
})

mongoose.connect(process.env.DB_URL);

const PORT = process.env.PORT || 3002;

app.get('/test', (request, response) => {

  response.send('test request received')

})
app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

async function getBooks(req, res){

  let results = await Books.find();
  res.send(results)
}
