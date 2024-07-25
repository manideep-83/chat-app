const express=require('express');
const User=require('../schema/userModel');
const bcrypt=require('bcryptjs');
const router=express.Router();
const JWT_SIGN="Mani";
const jwt=require('jsonwebtoken')
const { body , validationResult } = require('express-validator');
const fetchuser = require('../middlewear/fetchuser');
const userModel = require('../schema/userModel');

//Route to signup
router.post('/signup',[body('username','minimum length of username should be 4').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
],async (req,res)=>{
    let sucess=false;
    const errors= validationResult(req);
    if (!errors.isEmpty()) {

        return res.status(400).json({ sucess,errors: errors.array() });
    }
    const existed_user=await User.findOne({email:req.body.email});
    const user_name=await User.findOne({name:req.body.username});
    if(existed_user!=null)
    {
        return res.status(409).json({sucess,error: "Email already exists" });
    }
    if(user_name!=null)
        {
            return res.status(409).json({sucess, error: "Username already Taken .. try with new one " });
        }
    const salt= await bcrypt.genSalt(10);
    const pass=bcrypt.hashSync(req.body.password, salt);
    const userdetails=await User.create({
        name:req.body.username,
        email:req.body.email,
        password:pass
    });
    const payload={id:userdetails.id};
    const jwtsi=jwt.sign(payload,JWT_SIGN);
    sucess=true,
    res.json({sucess, authToken: jwtsi });
});
//Route for login
router.post('/login',[body('username','minimum length of username should be 4').isLength({min:3}),
    body('password','Enter a valid password').isLength({min:5})
],async (req,res)=>{
    let sucess=false;
    const errors= validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ sucess,errors: errors.array() });
    }
    const check=await User.findOne({name:req.body.username});
    if(check==null)
    {
        return res.status(400).json({sucess, errors: "Enter valid credentials "}); 
    }
    try{
    let pass= await bcrypt.compare(req.body.password,check.password);
    if(!pass){
        return res.status(400).json({sucess,error:"please enter valid Credentials"});
    }
    const payload={
        id: check.id
    };
    const token=jwt.sign(payload,JWT_SIGN);
    sucess=true;
    res.json({sucess,authToken:token});
    }
    catch(error){
        res.status(400).json({sucess,error:"please enter valid Credentials"});
    }
});

//Route to get user details using middlewear
router.post('/getuser',fetchuser,async (req,res)=>{
    const authorizedid=req.id;
    console.log(authorizedid);
    const check=await User.findById(authorizedid);
    if(!check)
    {
        return res.status(400).json({error:"User not verified"})
    }
    res.json({sucess:check});
});

//Route to fetch all users other than logged in person
 router.get('/getallusers',fetchuser,async (req,res)=>{
    const authorizedid=req.id;
    const allusers=await User.find();
    const users=allusers.filter(temp => temp._id.toString() !== authorizedid)
    res.json({user:users});
 });


module.exports=router;