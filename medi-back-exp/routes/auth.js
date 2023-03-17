const router = require('express').Router();
const { Login, signup } = require('../controllers/authcontroller');

router.post('/register', signup );

router.post('/login', Login);

module.exports = router;