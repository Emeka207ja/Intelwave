import express from 'express'
import { fetchUserProfile, signInHandler, signUpHandler, updateUserProfile } from '../Controller/UserController.js'
import { protect } from '../Util/protected.js'



const router = express.Router()

router.route('/').post(signUpHandler)
router.route('/login').post(signInHandler)

router.route('/updateprofile/:id').get(protect,fetchUserProfile)
router.route('/updateprofile/:id').put(protect,updateUserProfile)

export default router