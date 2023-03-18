const Joi = require('@hapi/joi');
const Patient = require('../models/Patient');

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

module.exports = {
    allPatiens: async (req, res)=>{
        try {
            const patients = await Patient.find();
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
        const userId = req.params.id;
        const patient = await Patient.findById(userId);
        if (!patient) return res.status(400).json({ error: 'Paciente no encontrado' });

        const { error } = patientEditSchema.validate(req.body)
    
        if (error) {
            return res.status(400).json({error: error.details[0].message})
        }

        const newPatient = new Patient({
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
            const updated = await Patient.findByIdAndUpdate(userId,newPatient);

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

            const patient = await Patient.findById(userId);

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
            res.status(400).json({error})
        }
    }
}

