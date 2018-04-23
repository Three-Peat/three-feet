const router = require('express').Router();
const { User } = require('../db/models');
const resetPassword = require('../auth/reset-password')
module.exports = router;

router.get('/users/:userId', (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
    .then(user => res.json(user))
    .catch(next);
});

router.post('/users/:userId', (req, res, next) => {
  const id = req.params.userId
  const needsPassword = true;
  req.body.isAdmin && User.findById(id)
    .then(user => {
      resetPassword(user.email)
      user.update({ needsPassword })
      res.json(user)
    })
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
