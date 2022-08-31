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
app.put('/books/:id', updateBooks)

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
async function updateBooks(req, res, next){
  try{
    let id = req.params.id;
    let updatedBook = await Books.findByIdAndUpdate(id, req.body, {new: true, overwrite: true});
    res.status(200).send(updatedBook)
  } catch(error){
    next(error)
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

app.use((error, req, res, next) => {
  res.status(500).send(error.message)
});