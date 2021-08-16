const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerSubmit = async (req, res) => {
    
    try {
        const {email, password, passwordVerify} = req.body; 

        if(!email || !password || !passwordVerify) {
            return res.status(400).json({message: 'Snälla fyll i alla fälten'});
        }

        if(password.length < 6) {
            return res.status(400).json({message: 'Lösenordet måste vara minst 6 tecken långt'});
        }

        if (password !== passwordVerify) {
            return res.status(400).json({message: 'Lösenorden matchar inte'});
        }

        const existingUser = await User.findOne({email: email});

        if(existingUser) {
            return res.status(400).json({message: 'Ett konto med den här mailadressen finns redan'});
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            passwordHash,
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

    } catch (error) {
        console.error(error);
    }
}


module.exports = {
    registerSubmit

}