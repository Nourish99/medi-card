const router = require('express').Router();
const authRoutes = require('./auth');
const patientRoutes = require('./patient');
const middl = require('../middlewares/validate-token')

router.use('/user', authRoutes);
router.use('/patient', middl, patientRoutes)


router.get('/', function (req, res) {
    res.status(200).json({ message: 'Estás conectado a nuestra API' })
  })

module.exports = router