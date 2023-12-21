import mongoose from 'mongoose';
import Product from '../model/product.js';

// Create
const createProduct=async(req, res) => {
//   <------------------ setting hard code value --------------------->
//   const product=new Product();
//   product.title="PhoneX";
//   product.price=9999;
//   product.rating=5,
//   product.description="The new phone of Apple.";
//   await product.save()

//   <------------------ setting dynamic value --------------------->
  try{
    const product=new Product(req.body);
    const data=await product.save()
    console.log("data=",data);
    res.status(201).json(data);
  }
  catch(error){
    res.status(400).json(error);
    console.log("Error in creating a new product");
  }

}
  // Read all products
  const getAllProduct=async(req, res) => {
    const products=await Product.find()
    res.json(products);
  }
  // Get by ID
  const getProduct=async(req, res) => {
    const id = req.params.id;
    const products=await Product.findById(id)
    res.json(products);
  }
  // Replace
  const replaceProduct=async(req, res) => {
    const id = req.params.id;
    try{
    const doc=await Product.findOneAndReplace({_id:id},req.body,{new:true})
    res.status(201).json(doc);
    }
    catch(error){
      res.status(400).json(error);
      console.log("Error in replacing a product");
    }
  }
  // Update
  const updateProduct=async(req, res) => {
    const id = req.params.id;
    try{
    const doc=await Product.findOneAndUpdate({_id:id},req.body,{new:true})
    res.status(201).json(doc);
    }
    catch(error){
      res.status(400).json(error);
      console.log("Error in replacing a product");
    }
  }
  // Delete
  const deleteProduct=async(req, res) => {
    const id = req.params.id;
    try{
    const doc=await Product.findOneAndDelete({_id:id})
    res.status(201).json(doc);
    }
    catch(error){
      res.status(400).json(error);
      console.log("Error in replacing a product");
    }
  }

export{createProduct,getAllProduct,getProduct,replaceProduct,updateProduct,deleteProduct}  