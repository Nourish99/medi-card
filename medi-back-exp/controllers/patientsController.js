const Joi = require('@hapi/joi');
const { patientModel} = require('../models/Patient');
const { userModel } = require('../models/User');
const base64Img = require('base64-img');
const fs = require('fs')

const Patient = patientModel

const patientSchema = Joi.object({
    name: Joi.string().min(6).max(255).required(),
    lastname: Joi.string().min(6).max(255).required(),
    age: Joi.number().min(0).required(),
    address: Joi.string().min(6).max(255).required(),
    birthdate: Joi.date(),
    gender: Joi.string().valid('hombre','mujer','otro'),
    room: Joi.number(),
    illness: Joi.string(),
    medicines: Joi.array(),
    recomendations: Joi.array()
});

const patientEditSchema =  Joi.object({
    id: Joi.string().required(),
    name: Joi.string().min(6).max(255),
    lastname: Joi.string().min(6).max(255),
    age: Joi.number().min(0),
    address: Joi.string().min(6).max(255),
    birthdate: Joi.date(),
    gender: Joi.string().valid('hombre','mujer','otro'),
    room: Joi.number(),
    illness: Joi.string(),
    medicines: Joi.array(),
    recomendations: Joi.array(),
    nurseNotes: Joi.string()
});

const patientRadios = Joi.object({
    id: Joi.string().required(),
    radios: Joi.array().required()
})

const doctorToPatient = Joi.object({
    patientId: Joi.string().required(),
    doctorId: Joi.string().required()
})

const nurseToPatient = Joi.object({
    patientId: Joi.string().required(),
    nurseId: Joi.string().required()
})

module.exports = {
    allPatiens: async (req, res)=>{
        try {
            const patients = await Patient.find().populate(['doctorAttendence','nursesAtendence','familiar']);
            res.json({
                error: null,
                data: patients
            })
        } catch (error) {
            res.status(400).json({error})
        }
       
    },
    newPatient: async (req, res)=>{
        const { error } = patientSchema.validate(req.body)
    
        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }

        const patient = new Patient({
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age,
            address: req.body?.address,
            birthdate: req.body?.birthdate,
            gender: req.body?.gender,
            room: req.body?.room,
            illness: req.body?.illness,
            medicines: req.body?.medicines,
            recomendations: req.body?.recomendations
        });
        

        try {
            const savedUser = await patient.save();
            res.json({
                error: null,
                data: savedUser
            })
        } catch (error) {
            res.status(400).json({error})
        }
    
    },
    editPatient: async (req, res)=>{
        const userId = req.body.id;
        const patient = await Patient.findById(userId);
        console.log(userId, patient, req.body)
        if (!patient) return res.status(400).json({ error: 'Paciente no encontrado' });

        const { error } = patientEditSchema.validate(req.body)
    
        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }
        try {
            const query = {
                name: req.body.name ? req.body?.name : patient.name,
                lastname: req.body.lastname ? req.body?.lastname : patient.lastname,
                age: req.body.age ? req.body?.age : patient.age,
                address: req.body.address ? req.body?.address : patient.address,
                birthdate: req.body.birthdate ? req.body?.birthdate : patient.birthdate,
                gender: req.body.gender ? req.body?.gender : patient.gender,
                room: req.body.room ? req.body?.room : patient.room,
                illness: req.body.illness ? req.body?.illness : patient.illness,
                medicines: req.body.medicines ? req.body?.medicines : patient?.medicines,
                recomendations: req.body.recomendations ? req.body?.recomendations : patient?.recomendations,
                nurseNotes: req.body?.nurseNotes ? req.body?.nurseNotes : patient?.nurseNotes
            }
            const updated = await Patient.findByIdAndUpdate(userId, query, {
                returnDocument:'after'
            }).populate(['nursesAtendence','doctorAttendence','familiar']);

            if(!updated) return res.status(400).json({ error: 'Error al actualizar' });

            res.json({
                error: null,
                data: updated
            })
        } catch (error) {
            res.status(400).json({error})
        }

    },
    getPatientById: async (req, res)=>{
       
        try {
            const userId = req.params.id;

            const patient = await Patient.findById(userId).populate(['nursesAtendence','doctorAttendence','familiar']);

            if (!patient) return res.status(400).json({ error: 'Paciente no encontrado' });

            res.json({
                error: null,
                data: patient
            })
        } catch (error) {
            res.status(400).json({error})
        }
    },
    deletePatient: async (req, res) =>{
        try{
            const userId = req.params.id;
            if(!userId){return res.status(400).json({ error: 'Paciente no encontrado' })}

            const deleted = await Patient.findByIdAndDelete(userId);

            if (!deleted) return res.status(400).json({ error: 'Paciente no eliminado' });

            return res.json({
                error: null,
                data: deleted
            })
        }catch(err){
            res.status(400).json({err})
        }
    },
    addPatientRadiographies: async (req, res) =>{
        const { error } = patientRadios.validate(req.body)
    
        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }

        const patientId = req.body?.id;

        const patient = await patientModel.findById(patientId);
        if (!patient) return res.status(400).json({ error: 'Paciente no encontrado' });
        
        //left images
        const {radios} = req.body;
        const filePaths = [];
        const old = patient.radiographies;

       if(old?.length > 0){
        try {
            
            old.forEach(el => {
                const r = el.split('/')[1];
                if(fs.existsSync(r)){
                    fs.unlinkSync(`./server/public/${r}`);
                }
            })
        } catch(err) {
            console.error(err)
        }
       }
        
        try{
            radios.forEach(element => {
                const fp = base64Img.imgSync(element,'./server/public', Date.now() );
                const patArr = fp.split('/');
                const fl = patArr[patArr.length - 1]
                filePaths.push(`${req.protocol}://${req.headers.host}/${fl}`)
            });
            patient.radiographies = filePaths;
            delete patient['_id'];
            const updated = await patientModel.findByIdAndUpdate(patientId, patient,{
                returnDocument:'after'
            });
            return res.json({
                error: null,
                data: {
                    routes: filePaths,
                    patient: updated
                }
            })
        }catch(err){
            res.status(400).json({err})
        }

    },
    addDoctorToPatient:async (req, res) =>{
        const { error } = doctorToPatient.validate(req.body)
    
        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }

        const patientId = req.body?.patientId;
        const doctorId = req.body?.doctorId;

        const patient = await patientModel.findById(patientId);
        if (!patient) return res.status(400).json({ error: 'Paciente no encontrado' });

        const doctor = await userModel.findById(doctorId);
        if (!doctor) return res.status(400).json({ error: 'Doctor no encontrado' });

        try {
            const upd = await patientModel.findByIdAndUpdate(patientId, {doctorAttendence: doctorId},{
                returnDocument:'after'
            }).populate('doctorAttendence');

            if(!upd) return res.status(400).json({ error: 'Error al actualizar' });

            res.json({
                error: null,
                data: upd
            })
        } catch (error) {
            res.status(400).json({error})
            
        }

    },
    addNurseToPatient: async (req, res) =>{
        const { error } = nurseToPatient.validate(req.body)
    
        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }
        const patientId = req.body?.patientId;
        const nurseId = req.body?.nurseId;

        const patient = await patientModel.findById(patientId);
        if (!patient) return res.status(400).json({ error: 'Paciente no encontrado' });

        const nurse = await userModel.findById(nurseId);
        if (!nurse) return res.status(400).json({ error: 'Doctor no encontrado' });

        let newNurses = [];
        const hasScheduleBusy = patient?.nursesAtendence?.some((item)=>{
            return item.nurse.schedule == nurse.nurse.schedule;
        })

        if(hasScheduleBusy){
            newNurses = patient?.nursesAtendence?.map((item)=>{
                if(item?.nurse?.schedule == nurse?.nurse?.schedule){
                    return nurse._id
                }else{
                    return item._id
                }
            })
            patient.nursesAtendence = newNurses;
        }else{
            patient?.nursesAtendence?.push(nurse._id);
        }
            
        delete patient['_id'];

        try {
            const upd = await patientModel.findByIdAndUpdate(patientId, patient,{
                returnDocument:'after'
            }).populate('nursesAtendence');

            if(!upd) return res.status(400).json({ error: 'Error al actualizar' });

            res.json({
                error: null,
                data: upd
            })
        } catch (error) {
            res.status(400).json({error})
            
        }

    }
}

