const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/users/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
    .then(user => res.json(user))
    .catch(next);
});

router.put('/users/:userId', (req, res, next) => {
  const id = req.params.userId
  console.log(req.body)
  req.body.isAdmin && User.update(
    { isAdmin: true }, {
      where: { id }
    })
    .then(user => res.json(user))
    .catch(next);
});

router.delete('/users/:userId', (req, res, next) => {
  const id = req.params.userId
  req.body.isAdmin && User.destroy({
    where: { id }
  })
    .then(user => res.json(user))
    .catch(next);
});
