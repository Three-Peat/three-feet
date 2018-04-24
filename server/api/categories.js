const router = require('express').Router()
const { Category, Product, productCategory } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  Category.findAll({
    include: Product
  })
    .then(categories => res.json(categories))
    .catch(next)
})

router.post('/', (req, res, next) => {
  Category.create(req.body)
    .then(category => res.json(category))
    .catch(next)
})

router.get('/:categoryId', (req, res, next) => {
  const id = req.params.categoryId
  Category.findById(id, {
    include: [Product]
  })
    .then(category => res.json(category))
    .catch(next)
})

router.post('/:categoryId/products/:productId', (req, res, next) => {
  productCategory.create(req.body)
    .then(products => res.json(products))
    .catch(next)
})

router.delete('/:categoryId/products/:productId', (req, res, next) => {
  const { productId, categoryId } = req.params
  productCategory.destroy({
    where: { productId, categoryId }
  })
    .then(products => res.json(products))
    .catch(next)
})
