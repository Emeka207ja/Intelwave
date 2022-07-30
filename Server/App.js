import express from 'express' 
import dotenv from 'dotenv' 
import { connectDb } from './config/db.js'
import { notFound, errorHandler } from './middleware/ErrorWare.js'
import UserRoutes from './Routes/UserRoutes.js'
import PaymentRoute from './Routes/PaymentPostRoute.js'
import AdminRoute from './Routes/AdminRoute.js'
import path from 'path'
// import ProfileUploadRoute fro./Routes/upload.js.js'
import upload from './Routes/upload.js'
// import paymentProofRoute from './Routes/PaymentFile.js'
const app = express()

app.use(express.json())
dotenv.config()

connectDb()

app.use('/api/user',UserRoutes)
app.use('/api/profile', upload)
// app.use('/api/user', paymentProofRoute)
app.use('/api/payment', PaymentRoute)
app.use('/api/admin', AdminRoute)
const __dirname = path.resolve()
app.use('/project/public/profile', express.static(path.join(__dirname, '/project/public/profile')))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/project/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'project','build','index.html'))
    })
}
// app.use('/Proofs',express.static(path.join(__dirname,'/Proofs')))

app.use(notFound)
app.use(errorHandler)

const Port = process.env.PORT||5000
const server = app.listen(Port,console.log(`listenimg on port ${Port}`))