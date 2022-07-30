import asyncHandler from "express-async-handler"
 import Payment from "../Model/paymentModel.js"

 // @DESC Submit proof of payment
// @ROUTE POST /api/payment
// @ACCESS private
const paymentHandler = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { wallet, image } = req.body
    if (!wallet || !image) {
        res.status(400)
        throw new Error("please fill out all fields")
    }
    console.log(req.user)
    const paid = await Payment.create({
        user:req.user._id,
        wallet: wallet,
        image:image
    })
    if (paid) {
        res.status(201).json({message:"payment details submitted successfully"})
    }
})

// @DESC Fetch payment Info for a user
// @ROUTE GET /api/payment/proof
// @ACCESS private

const fetchUserPayment = asyncHandler(async (req, res) => {
    const proof = await Payment.find({ user: req.user._id})
    if (proof) {
        res.status(200).json(proof)
    } else {
        res.status(400)
        throw new Error("no user")
    }
})
 export{paymentHandler, fetchUserPayment}