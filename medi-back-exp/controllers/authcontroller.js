const router = require('express').Router();
const {userModel} = require('../models/User');
const jwt = require('jsonwebtoken');
const {patientModel} = require('../models/Patient')

// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');

const User = userModel;

const userSchemaRegister = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    name: Joi.string().min(6).max(255).required(),
    lastname: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
    age: Joi.number().required(),
    gender: Joi.string(),
    role: Joi.string().required(),
    cedule: Joi.string(),
    schedule: Joi.string(),
    patientId: Joi.string()
});

const schemaLogin = Joi.object({
    username: Joi.string().min(6).max(255).required(),
    password: Joi.string().min(6).max(1024).required()
})

module.exports.signup =  async (req, res)=>{
    // validate user
    const { error } = userSchemaRegister.validate(req.body)
    
    if (error) {
        return res.status(400).json({error: error.details[0].message})
    }

    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json({error: 'Email ya registrado'})
    }

    const isUserNameExist = await User.findOne({username: req.body.username});
    if (isUserNameExist) {
        return res.status(400).json({error: 'Username ya registrado'})
    }

   

    // hash contraseña
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const rawUser = {
        username: req.body.username,
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        age: req.body.age,
        gender: req.body?.gender,
        role: req.body?.role
    }

    const role = req.body?.role ? req.body?.role : "";
    let patId = '';
    let pat = null;
    if( role == 'nurse'){
        rawUser.nurse = {
            schedule: req.body?.schedule
        }
    }else if(role == 'doctor'){
        rawUser.doctor = {
            cedule: req.body?.cedule
        }
    }else if(role == 'familiar'){
        patId = req.body?.patientId;
        pat = await patientModel.findById(patId)
        if(!pat){
            return res.status(400).json({error: 'No existe ese paciente'})
        }
        if(pat.familiar){
            return res.status(400).json({error: 'Ya tiene asignado un familiar'})
        }
        rawUser.familiar = pat
    }


    const user = new User(rawUser);
    try {
        const savedUser = await user.save();
        if(role == 'familiar'){
            pat.familiar = savedUser;
            delete pat['_id'];
            const updPaiente = await patientModel.findByIdAndUpdate(patId, pat,{
                returnDocument:'after'
            });
            if(!updPaiente){
                return res.status(400).json({error: 'Ya tiene asignado un familiar 2'})
            }
        }
        res.json({
            error: null,
            data: savedUser
        })
    } catch (error) {
        res.status(400).json({error})
    }
}

module.exports.Login = async(req, res)=>{
    // validaciones
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
     
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
     

    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET,{
        expiresIn: '30d'
    })
    
    res.header('auth-token', token).json({
        error: null,
        data: {token: token, userdata: user}
    })
}