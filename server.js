'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Books = require('./book.js')
const mongoose = require('mongoose');
const { findByIdAndDelete } = require('./book.js');


const app = express();
app.use(cors());
app.use(express.json());
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
app.post('/books', createBooks);
app.delete('/books/:id', deleteBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));

async function getBooks(req, res){

  let results = await Books.find();
  res.send(results)
}
async function createBooks(req, res){
  let createdBooks = await Books.create(req.body)
  res.send(createdBooks);
}
async function deleteBooks(req, res, next){
  try{
    await Books.findByIdAndDelete(req.params.id)
  }
  catch(error){
    next(error)
  }
}