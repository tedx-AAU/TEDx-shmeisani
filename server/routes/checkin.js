const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const CheckinStaff = require("../models/CheckinStaff");


router.post("/login", async(req,res)=>{

    try{

        const {username,password}=req.body;


        const staff = await CheckinStaff.findOne({
            username
        });


        if(!staff){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });
        }


        const validPassword =
        await bcrypt.compare(
            password,
            staff.password
        );


        if(!validPassword){

            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            });

        }


        const token = jwt.sign(
            {
                id:staff._id,
                role:staff.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"8h"
            }
        );


        res.json({

            success:true,
            token,

            staff:{
                username:staff.username,
                role:staff.role
            }

        });


    }
    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

});


module.exports=router;