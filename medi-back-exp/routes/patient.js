const router = require('express').Router();
const {allPatiens, newPatient, editPatient, getPatientById} = require('../controllers/patientsController');
const { route } = require('./auth');

router.post('/newPatient', newPatient);
router.patch('/editPatient', editPatient);

router.get('/getAllPatients', allPatiens);

router.get('/getPatien/:id', getPatientById);

router.delete('/deletePatient/:id',)

module.exports = router;