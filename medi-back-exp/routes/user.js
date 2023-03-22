const router = require('express').Router();

const {allDoctors, allNurses} = require('../controllers/usersController')

router.get('/allNurses', allNurses);
router.get('/allDoctors', allDoctors)

module.exports = router;