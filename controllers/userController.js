import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import  JWT  from "jsonwebtoken";

export const registerController = async (req, res) => {
    try {
        const {firstname, lastname, email, password, phone, address} = req.body;
        //validation
        if(!firstname){
            return res.send({message: 'Firstname is required for authentication !'});
        }
        if(!lastname){
            return res.send({message: 'Lastname is required for authentication !'});
        }
        if(!email){
            return res.send({message: 'Email is required for authentication !'});
        }
        if(!password){
            return res.send({message: 'Password is required for authentication !'});
        }
        if(!phone){
            return res.send({message: 'Phone number is required for authentication !'});
        }
        if(!address){
            return res.send({message: 'Address is required for authentication !'});
        }

        //check if user exist
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(200).send({
                success:false,
                message:" An account is already registered with this email. Login or try another email",
            });
        }
        //register user
        const hashedPassword = await hashPassword(password);
        //save user
        const user = await new userModel({
            firstname,
            lastname,
            email,
            phone,
            address, 
            password: hashedPassword,
        }).save();
        res.status(200).send({
            success:true,
            message:" Account added successfuly ",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:" An unexpected error happened.. Try again",
            error,
        });
    }
};

//POST LOGIN

export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email){
            return res.status(404).send({
                success:false,
                message:'Please enter you email',
            });
        }
        if(!password){
            return res.status(404).send({
                success:false,
                message:"Please enter you password",
            });
        }
        //check user existance
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:"User doesn't exist, Try another one or register",
            });
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(400).send({
                success:false,
                message:"Wrong password!",
            });
        }
        //add token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:"login successfully",
            user:{
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message:" An unexpected error happened in login.. Try again",
            error,
        });
    }
};


//update profile

export const updateProfileController = async (req, res) => {
    try {
        const {firstname, lastname, email, password, address, phone} = req.body;
        const user = await userModel.findById(req.user._id)
        //password
        if(password && password.length < 6){
            return res.json({error:'Password is required and with 6 character long'});
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            firstname: firstname || user.firstname,
            lastname: lastname || user.lastname,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address ||user.address,
        }, {new:true})
        res.status(200).send({
            success:true,
            message:'Profile updated successfully',
            updatedUser,
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success:false,
            message:"There was an error in updating the profile",
            error,
        });
    }
};

