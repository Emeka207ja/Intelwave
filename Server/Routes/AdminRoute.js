import express from 'express'
import { adminPaymentHandler, fetchUsersHandler,fetchSingleUser, updateUser, updatePayment, fetchSinglePayment, deleteUser, deletePayment } from '../Controller/AdminController.js'
import {protect} from '../Util/protected.js'
const router = express.Router()


router.route("/payment").get(protect,adminPaymentHandler)
router.route("/payment/:id").put(protect,updatePayment)
router.route("/payment/:id").get(protect,fetchSinglePayment)
router.route("/payment/:id").delete(protect,deletePayment)

router.route("/users").get(protect, fetchUsersHandler)
router.route("/user/:id").get(protect,fetchSingleUser)
router.route("/user/:id").put(protect,updateUser)
router.route("/user/:id").delete(protect,deleteUser)



export default router