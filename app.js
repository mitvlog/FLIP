import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import path from 'path'
import cors from 'cors';
import connectDB from './config/connectdb.js'
import userRoutes from './routes/userRoutes.js'
import adminRoute from './routes/auth.js'
import catRoute from './routes/category.js'
import proRoute from './routes/product.js'
import carts from './routes/cart.js'
import add from './routes/address.js'

const app = express()
const port = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

// CORS Policy
app.use(cors({origin:true}))

// Database Connection
connectDB(DATABASE_URL)

// JSON
app.use(express.json())
app.use("/images", express.static("public/uploads/productPictures"));
// Load Routes
app.use("/api/user", userRoutes)
app.use("/api/user", adminRoute)
app.use("/api/user", catRoute)
app.use("/api/user", proRoute)
app.use("/api/user",carts)
app.use("/api/user",add)

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})