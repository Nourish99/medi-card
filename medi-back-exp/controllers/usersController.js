const {userModel} = require('../models/User');
const User = userModel;

module.exports = {
    allNurses: async (req, res) =>{
        try {
            const nurses = await User.find({role: 'nurse'});
            res.json({
                error: null,
                data: nurses
            })
        } catch (error) {
            res.status(400).json({error})
        }
    },
    allDoctors: async (req, res) =>{
        try {
            const doctors = await User.find({role: 'doctor'});
            res.json({
                error: null,
                data: doctors
            })
        } catch (error) {
            res.status(400).json({error})
        }
    },


}