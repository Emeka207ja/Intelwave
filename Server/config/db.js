import mongoose from "mongoose";
const connectDb = async () => {
    try {
        const db =await mongoose.connect(process.env.URI, {
                useUnifiedTopology: true,
                useNewUrlParser: true
        })
        if (db) {
            console.log(`connected to database at ${db.connection.host}`)
        }
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}
export{connectDb}