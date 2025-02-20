import Product from "../models/product.model.js";
import mongoose from "mongoose";
// get route -------------------------------------------------------
export const getProduct= async(req,res)=>{
    try{
    const product= await Product.find({});
res.status(200).json({success:true,data:product}); 
console.log(" GET  --- products are :",product);   
}
catch(error){
    console.error("error ", error.message);
    res.status(500).json({success:false,message:"server error"});
}
}

//post product  -------------------------------------------------------
export const postProduct=async (req, res) => {
    const product = req.body; // Extract product details from request body

    // Validate required fields
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ 
            success: false, 
            message: "Please provide all fields" 
        });
    }

    const newProduct = new Product(product); // Create a new Product instance

    try {
        // Save the product to the database
        await newProduct.save();
        res.status(201).json({ 
            success: true, 
            data: newProduct 
        }); // Respond with success if saved
        console.log(" CREATE   --- product created");
    } catch (error) {
        console.error("Error in Create product:", error.message); // Log the error
        res.status(500).json({ 
            success: false, 
            message: "Server Error" 
        }); // Respond with server error on failure
    }
}
//update  -------------------------------------------------------
export const updateProduct=async(req,res)=>{
    const {id} = req.params;  // destructuring
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"no such ID"});      
    }
    try{
       const updatedProduct= await Product.findByIdAndUpdate(id,product,{new:true});
        res.status(200).json({success:true, data:updatedProduct});
        console.log(" UPDATE   --- product updated");
     }
     catch(error){
     console.error("error: ", error.message);
     res.status(500).json({success:false,message:"server error"});
     }   
}
//delete  -------------------------------------------------------

export const deleteProduct=async(req,res)=>{
    const {id} = req.params;  // destructuring
 try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({success:true, message:"deleted successfully"});
    console.log(" DELETE   --- product deleted");
 }
 catch(error){
 console.error("error: ", error.message);
 res.status(500).json({success:false,message:"product not found"});
 }
 }
//  -------------------------------------------------------