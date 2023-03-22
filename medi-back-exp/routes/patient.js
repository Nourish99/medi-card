const router = require('express').Router();
const patientC = require('../controllers/patientsController');
const { route } = require('./auth');

router.post('/newPatient', patientC.newPatient);
router.patch('/editPatient', patientC.editPatient);

router.get('/getAllPatients', patientC.allPatiens);

router.get('/getPatien/:id', patientC.getPatientById);

router.delete('/deletePatient/:id',patientC.deletePatient)

router.post('/addRadios', patientC.addPatientRadiographies)

router.post('/addDoctor', patientC.addDoctorToPatient)

router.post('/addNurse', patientC.addNurseToPatient)

module.exports = router;