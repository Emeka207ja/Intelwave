import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import crypto from 'crypto-js'

const userModel = mongoose.Schema({
    firstname: {
        type: String,
        required: [true,"firstname required"],
        trim:true
    },
    lastname: {
        type: String,
        required: [true,"lastname required"],
         trim:true
    },
    password: {
        type: String,
        required:[true,"password required"]
    },
    resetPasswordToken: String,
    resetPasswordExpire:Date,
    email: {
        type: String,
        required: [true,"email required"],
        unique: [true,"email must be unique"],
        match:[/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"please input a valid email"]
    },
    image: {
        type: String,
        required:[true,"image required"]
    },
    isAdmin: {
        type: Boolean,
        required:true,
        default: false
    },
    intel: {
        type: Number,
        required: true,
        default:0
    },
    referal: {
        type: Number,
        required: true,
        default:0
    },
    referredBy: {
        type: String,
        required: true,
        default:"intelwaveTeam"
    }
   
}, {
    timestamps:true
})

//decoding hashed password for a match
userModel.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}
userModel.methods.generateResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 10*(60*1000)
    return resetToken
}
// hashing users password
userModel.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt =await bcrypt.genSalt(10)
    this.password =await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("user", userModel)
export default User