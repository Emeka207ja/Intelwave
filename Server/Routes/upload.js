import express from 'express'
import multer from 'multer'
import path from 'path'
import asyncHandler from 'express-async-handler'

const router = express.Router()

// const storage = multer.diskStorage({
//     destination:  (req, file, cb)=> {
//         cb(null, "../../IntelWave/project/public/profile/")
//     },

//     filename:  (req, file, cb)=> {
//         cb(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
//     }
// })

// function checkFileType(file, cb) {
//     const fileTypes = /jpg|jpeg|png/
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//     const mimeType = fileTypes.test(file.mimetype)
//     if (extname && mimeType) {
//         return cb(null,true)
//     } else {
//         cb("images only")
//     }
//  }

// const upload = multer({
//     storage: storage,
//     fileFilter: function (req, file, cb) {
//         checkFileType(file,cb)
//     }
// })

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "project/public/profile/")
    },

    filename: (req, file, cb) => {

        // cb(null, file.originalname)
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)

    }
})
function checkFileType(file, cb) {
    const fileTypes = /jpg|jpeg|png/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if (extname && mimeType) {
        return cb(null,true)
    } else {
       cb(new Error('only images allowed'))
        // throw new Error("image only")
    }
 }

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file,cb)
    }
})



router.post("/", upload.single("image"), (req, res) => {
    res.send(`/${req.file.filename}`)
})

// router.post("/", upload.single("image"), (req, res) => {
//    console.log(req.file)
// })
export default router