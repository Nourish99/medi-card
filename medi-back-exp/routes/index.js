const router = require('express').Router();
const authRoutes = require('./auth');
const patientRoutes = require('./patient');
const middl = require('../middlewares/validate-token');
const users = require('./user')

router.use('/user', authRoutes);
router.use('/patient', middl, patientRoutes),
router.use('/user', middl, users)


router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API' })
  })

module.exports = router