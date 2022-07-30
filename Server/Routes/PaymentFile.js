import express from 'express'
import { protect } from '../Util/protected.js'
import multer from 'multer'
import path from 'path'
const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Proofs/')
    },
    filename: (req, file, cb) => {
        cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

//check type of file submitted
const checkFileType = (file, cb) => {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)
    if (extname && mimetype) {
        cb(null,true)
    } else {
        cb(new Error('only images are allowed'))
    }
}
const Proof = multer({
    storage: storage,
    filterFile : (req,file, cb) => {
        checkFileType(file,cb)
    }
})

router.route("/proof").post(protect, Proof.single('image'), (req, res) => {

    res.json(req.file.path)
    console.log(req.file)
})
export default router
