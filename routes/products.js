const express = require('express');
const router = express.Router();
const products = require('../services/products');

/* GET products listing. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await products.getMultiple(req.query.page, req.query.size));
  } catch (err) {
    console.error(`Error while getting products `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

/* POST products */
// router.post('/', async function(req, res, next) {
//   try {
//     res.json(await products.create(req.body));
//   } catch (err) {
//     console.error(`Error while posting products `, err.message);
//     res.status(err.statusCode || 500).json({'message': err.message});
//   }
// });

module.exports = router;
