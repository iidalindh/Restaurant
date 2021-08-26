const User = require('../models/User');
const bcrypt = require('bcrypt');
const Joi = require("joi")
const schema = require("../validators/user.schema")
const jwt = require('jsonwebtoken');


module.exports.loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const {error} = Joi.object(schema).validate(req.body);

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const existingUser = await User.findOne({email: email});

        if (!existingUser || existingUser.role !== "admin") {
            return res.status(400).json({message: 'user not exist'});
        }


        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);

        console.log("passwordCorrect", passwordCorrect)
        if (!passwordCorrect) {
            return res.status(401).json({message: "Wrong email or password"});
        }

        const token = await jwt.sign(
            {
                user: existingUser._id,
                role: "admin"
            },
            process.env.PRIVATE_KEY
        );

        res.send({token, ...existingUser._doc, passwordHash: undefined});
    } catch (error) {
        console.error(error);
    }
}


module.exports.addAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        const {error} = Joi.object(schema).validate(req.body);

        if (error)
            return res.status(400).send({message: error.details[0].message})

        const existUser = await User.findOne({email})
        if (existUser)
            return res.status(400).send({message: "email is repetitive"})
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            passwordHash,
            role: "admin"
        });

        const savedUser = await newUser.save();

        res.status(200).send(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}


module.exports.getAdmins = async (req, res) => {
    try {
        const users = await User.find({role: "admin"});
        res.send(users)
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

module.exports.editAdmin = async (req, res) => {

    try {
        const id = req.params.id;
        const {email, password} = req.body;

        let user = await User.findById(id);
        if (!user)
            return res.status(404).send({
                message: "admin not found"
            })
        if (email)
            user.email = email;
        if (password) {
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(password, salt);
        }
        user = await user.save()
        res.send(user)
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}


module.exports.deleteAdmin = async (req, res) => {
    try {
        const id = req.params.id;
        let result = await User.findByIdAndDelete(id);
        if (!result)
            return res.status(404).send({message: "admin not found"})
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}



