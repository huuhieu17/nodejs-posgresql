const db = require('./db');
const helper = require('../helper');

async function getMultiple(page = 1, size = 5) {
  const offset = helper.getOffset(page, size);
  const rows = await db.query(
    'SELECT * FROM products OFFSET $1 LIMIT $2', 
    [offset, size]
  );
  const count = await db.query('SELECT count(*) from products LIMIT 1');
  const totalRecord = count[0].count;
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta,
    totalRecord
  }
}

// function validateCreate(quote) {
//   let messages = [];


//   if (!quote) {
//     messages.push('No object is provided');
//   }

//   if (!quote.quote) {
//     messages.push('Quote is empty');
//   }

//   if (!quote.author) {
//     messages.push('Author is empty');
//   }

//   if (quote.quote && quote.quote.length > 255) {
//     messages.push('Quote cannot be longer than 255 characters');
//   }

//   if (quote.author && quote.author.length > 255) {
//     messages.push('Author name cannot be longer than 255 characters');
//   }

//   if (messages.length) {
//     let error = new Error(messages.join());
//     error.statusCode = 400;

//     throw error;
//   }
// }

// async function create(quote){
//   validateCreate(quote);

//   const result = await db.query(
//     'INSERT INTO quote(quote, author) VALUES ($1, $2) RETURNING *',
//     [quote.quote, quote.author]
//   );
//   let message = 'Error in creating quote';

//   if (result.length) {
//     message = 'Quote created successfully';
//   }

//   return {message};
// }

module.exports = {
  getMultiple,
}
