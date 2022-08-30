'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL);
const Book = require('./book.js');


async function seed() { 
    await Book.create({
        title: 'Dune',
        description: 'Sci-Fi',
        status: 'Good book'
    });
    await Book.create({
        title: 'To kill a Mockingbird',
        description: 'Classic',
        status: 'Good book'
    });
    await Book.create({
        title: 'Spongebob book',
        description: 'entertainment',
        status: 'Good book'
    });
   console.log('Books created')
   mongoose.disconnect();
}

seed();