import 'dotenv/config'
import connectDB from './db/index.js'
import { app } from './app.js'


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`⭕ Server running at port : ${process.env.PORT}`)
    })
})
.catch(() => {
    console.log("MongoDB connnection failed !!!");
})

