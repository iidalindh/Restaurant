const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

        //! Log the user in
        const token = await jwt.sign({
            user: savedUser._id,
        }, process.env.PRIVATE_KEY);
      
        console.log(token);
      
        res.cookie("token", token, { httpOnly: true }).send();

    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

const loginSubmit = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({message:'Fyll i alla fälten'});
        }

        const existingUser = await User.findOne({email: email});
    
        if (!existingUser) {
            return res.status(400).json({message: 'Inget konto med mailadressen hittades'});
        }

        console.log(existingUser);

        const passwordCorrect = bcrypt.compare(password, existingUser.passwordHash);

        if (!passwordCorrect) {
            return res.status(401).json({ message: "Wrong email or password" });
          }
      
          if(passwordCorrect) {
              console.log('password match');
          }
          const token = await jwt.sign(
            {
              user: existingUser._id,
            },
            process.env.PRIVATE_KEY
          );

          res.cookie("token", token, { httpOnly: true }).send();

    } catch (error) {
        console.error(error);
    }
}

const getLoggedInUser = async (req, res) => {
     try {
          const token = req.cookies.token;
          if (!token) {
            return res.json({loggedIn: false, role: ""});
          }
          const userId = jwt.verify(token, process.env.PRIVATE_KEY);
      
          const user = await User.findById(userId.user);
          console.log(user);
      
          if(user.role === "admin") {
            console.log("användaren är admin")
            return res.json({loggedIn: true, role: `${user.role}`})
          } else {
            res.send({loggedIn: true, role: `${user.role}`});
        }
          
      } catch (err) {
          console.error(err);
          res.json({loggedIn: false});
        }
}


module.exports = {
    registerSubmit,
    loginSubmit,
    getLoggedInUser
}