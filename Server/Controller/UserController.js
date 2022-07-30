import asyncHandler from 'express-async-handler'
import User from '../Model/UserModel.js'
import generateToken from '../Util/generateToken.js'

//signUp controller
const signUpHandler = asyncHandler(async (req, res) => {
    const { firstname, lastname, email, image, password,referral } = req.body
    
    //checking if any of the form inputs is empty
    if (!firstname || !lastname || !email || !image || !password) {
        res.status(400)
        throw new Error("please fill out the form properly")
    }

    //checking if user already exists
    const userExist =await User.findOne({email})
    if (userExist) {
        res.status(400)
        throw new Error(`user with ${email} already exist`)
    }

    //if user is unique
    const user = await User.create({
        firstname,
        lastname,
        email,
        password,
        image,
        referredBy:referral
    })
    if (user) {
        res.status(201).json({message:"registered successfully, please login with your details"})
    }
})

//signIn controller
const signInHandler = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //checking if form was submitted with empty values
    if (!email || !password) {
        res.status(400)
        throw new Error("please fill out the form properly")
    }

    //checking if user exist in database and password matches
    const userExist = await User.findOne({ email })
    if (userExist && (await userExist.matchPassword(password))) {
        res.status(200).json({
            _id: userExist._id,
            firstname: userExist.firstname,
            lastname: userExist.lastname,
            email: userExist.email,
            image: userExist.image,
            isAdmin: userExist.isAdmin,
            intel: userExist.intel,
            referal:userExist.referal,
            token:generateToken(userExist._id)
        })
    } else {
        res.status(401)
        throw new Error("invalid email address or password")
    }
    
})

const fetchUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(400)
            throw new Error("no user")
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})
const updateUserProfile = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body
    try {
        const user = await User.findById(req.params.id)
        if (user) {
           
            user.email = email || user.email
            user.firstname = firstname || user.firstname
            user.lastname = lastname || user.lastname
            if (password) {
                user.password = password
           }
            const updatedUser = await user.save()
            res.status(201).json({ message: "profile updated successfully" })
        }
    }catch(error){}
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) {
        res.status(404)
        throw new Error("please provide your email")
    }
   try {
        const user = await User.findOne({email})
        if (!user) {
            res.status(404)
            throw new Error("email could not be sent, please register")
        }
        const resetToken = user.generateResetToken()
       await user.save()
       const resetUrl = `http://localhost:3000/resetpassword/${resetToken}`
       const message = `
       <h1> you have requested a password reset</h1>
       <p>please go to this link to reset your password</p>
       <a href =${resetUrl} clicktracking=off>${resetUrl}</a>
       `
       try {
        
       } catch (error) {
        
       }
   } catch (error) {
    
   }
})
export{signUpHandler,signInHandler,fetchUserProfile,updateUserProfile}