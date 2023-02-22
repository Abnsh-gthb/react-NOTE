const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require("../middleware/fetchuser");



const JWT_SECRET = 'Abinash$123#';



//ROUTE SIGNIN : Creat a User using : POST "/api/auth/creatUser". Doesn't require any Login.
router.post('/creatUser', [
    body('name', 'custom msg!').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
], async (req, res) => {

    try {

        //If there are error return bad request with error!!
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //Check wheather the user with same email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({
                success: false,
                error: 'Email is already in use!! Plz try with another email.'
            })
        }

        //password Hashing,Salting & pappering
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);


        //Creating User 
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        //Token Signature
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);

        // res.json(user);
        res.json({ authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});


//Authenticating a User using : POST "/api/auth/login".require Authentication.

router.post('/login', [
    body('email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {

    //ROUTE LOGIN :  If there are error return bad request with error!!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password  } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Try with currect credentials" });
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Try with currect credentials" });
        }


        const payload = {
            //Token Signature
                user: {
                    id: user.id
                }
            }
             const authToken = jwt.sign(payload, JWT_SECRET);
             res.json({ authToken });
        

    }
     catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
})


//ROUTE GET USER DETAILS : POST "/api/auth/getuser". Login required
router.post('/getuser',fetchuser,async (req, res) => {
try {
    userId= req.user.id;
    const user= await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
     console.log(error.message);
        res.status(500).send("Server Error");
}
});






module.exports = router























// const isNewUser = await User.isThisEmailInUse(req.body.email);
// if(!isNewUser)
// return res.json({
//  success: false,
//  msg:'Email is already in use!! Plz try with another email.'
// }) 