import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import path from "path";
import productRoutes from "./routes/product.route.js";

const app =express();
dotenv.config();
const PORT = process.env.PORT || 3000;

//variable to the absolute path of the directory containing the current file.
const __dirname = path.resolve();
//middldeware---------------------------------------------
app.use(express.json()); // allows us to access json data in req.body 
app.use('/api/products/',productRoutes);  // routes
 
// deployment---------------------------------------------
if(process.env.NODE_ENV === 'production') { 
//if it is in production mode ..then below code serves static files from the frontend/build directory. 
   app.use(express.static(path.join(__dirname, '/frontend/dist')));
   // * -means this route will match any incoming request that hasn't already been matched by other routes.(routes other than api/products)
   //res.sendFile serves the index.html file located in the frontend/build directory.
   //resolve means to construct an absolute path by resolving a sequence of path segments.

   app.get('*', (req, res) => {   
         res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
   })
}

// -------------------------------------------------------
console.log(process.env.MONGO_URI);
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on http://localhost:3000/`);
});
