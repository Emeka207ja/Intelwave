import asyncHandler from 'express-async-handler'
import Payment from '../Model/paymentModel.js'
import User from '../Model/UserModel.js'

// @DESC fetch all payments
// @ROUTE GET /api/admin/payment
// @ACCESS private

const adminPaymentHandler = asyncHandler(async (req, res) => {
  
    try {
        const payments = await Payment.find({}).populate({path:"user",model:User})
      
    if (payments) {
       res.status(201).json(payments)
    } else {
        res.status(200).json('no payments yet')
    }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    } 
})



// @DESC Update payment Info
// @ROUTE PUT /api/admin/payment/:id
// @ACCESS private

const updatePayment = asyncHandler(async(req, res) => {
    const { status} = req.body
    
    try {
        const proof = await Payment.findById(req.params.id).populate({ path: "user", model: User })
        if (proof) {
            proof.status = status || proof.status
        }
        const updatedProof = await proof.save()
        res.status(201).json(updatedProof)
        if (!proof) {
            res.status(404)
            throw new Error("invalid proof of payment")
        }
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
   }
})

// @DESC fetch all users except admin
// @ROUTE GET /api/admin/users
// @ACCESS private
const fetchUsersHandler = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: req.user._id } })
        if (users) {
            res.status(201).json(users)
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
   }
})

// @DESC fetch single user
// @ROUTE GET /api/admin/user/:id
// @ACCESS private

const fetchSingleUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(400)
        throw new error("invalid user")
    }
    else{res.status(200).json(user)}
})
 
// @DESC update  user
// @ROUTE PUT /api/user/:id
// @ACCESS private
//https://git.heroku.com/intelwave.git

const updateUser = asyncHandler(async (req, res) => {
    const {firstname,lastname,referal,intel} = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        user.firstname = firstname || user.firstname,
        user.lastname = lastname || user.lastname,
        user.referal = referal ||user.referal,
        user.intel = intel || user.intel
    }
    const updatedUser = await user.save()
    res.status(201).json({message:`user ${user._id} updated successfully!`})
    if (!user) {
       res.status(404)
       throw new Error("invalid user")
   }
})

// @DESC Delete User
// @ROUTE DELETE /api/admin/user/:id
// @ACCESS private

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user) {
            await user.remove()
            res.status(201).json({message:"user deleted successfuly"})
        } else {
            res.status(400)
            throw new Error("user does not exist")
        }
    } catch (error) {
        res.status(404)
        throw new Error(error.message)
    }
})

// @DESC Fetch single payment Info
// @ROUTE get /api/admin/payment/:id
// @ACCESS private

const fetchSinglePayment = asyncHandler(async (req, res) => {
    try {
        const proof = await Payment.findById(req.params.id).populate({path:"user",model:User})
        if (proof) {
            res.status(200).json(proof)
        } else {
            res.status(400)
            throw new Error("payment does not exist")
        }
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
    }
})

// @DESC Delete payment information
// @ROUTE DELETE /api/admin/payment/:id
// @ACCESS private
const deletePayment = asyncHandler(async (req, res) => {
   try {
       const proof = await Payment.findById(req.params.id)
       if (proof) {
           await proof.remove()
           res.status(201).json({message:"payment proof deleted successfully!"})
       } else {
           res.status(400)
           throw new Error("cannot perform this operation")
       }
   } catch (error) {
       res.status(404)
       throw new Error(error.message)
   }
})

export{adminPaymentHandler,fetchUsersHandler,fetchSingleUser,updateUser,updatePayment,fetchSinglePayment,deleteUser,deletePayment}