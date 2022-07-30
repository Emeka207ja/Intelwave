import mongoose from "mongoose";
const paymentSchema = mongoose.Schema({
    wallet: {
        type: String,
        required: [true, "please provide your wallet address for coin transfer"],
    },
    user:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
         ref: "User",
    }],
    image: {
        type: String,
        required:[true,"please submit your proof of payment"]
    },
    status: {
        type: String,
        required: true,
        default:"processing..."
    }
},

     {
         timestamps: true
    }
)
const Payment = mongoose.model("payments", paymentSchema)
export default Payment