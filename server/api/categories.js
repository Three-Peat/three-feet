const router = require('express').Router()
const { Category, Product } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll()
    .then(categories => res.json(categories))
    .catch(next)
})

router.get('/:categoryId', (req, res, next) => {
  const id = req.params.categoryId
  Category.findById(id, {
    include: [Product]
  })
    .then(products => res.json(products))
    .catch(next)
})
