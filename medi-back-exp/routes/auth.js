const router = require('express').Router();
import { Login, signup } from '../controllers/authcontroller';

router.post('/register', signup );

router.post('/login', Login);

module.exports = router;