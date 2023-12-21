import mongoose from 'mongoose';
const { Schema } = mongoose; // it define how the data will be in particular collection

// Schema -> configuration
const productSchema = new Schema({
    // _id:String,
    // title: String,
    title: {type:String, required:true, unique:true},
    description: String,
    // price: Number,
    price: {type:Number, min:[0,'Wrong price']},
    discountPercentage: {type:Number, min:[0,'Wrong min discount'], max:[50, 'Wrong max discount']},
    // rating: Number,
    rating: {type:Number, min:[0,'Wrong min rating'], max:[5, 'Wrong max rating']},
    // brand: String,
    brand: {type:String, required:true},
    // category: String,
    category: {type:String, required:true},
    // thumbnail: String,
    thumbnail: {type:String, required:true},
    images: [String]
  });

  const Product = mongoose.model('Product', productSchema);  // creating collection name proudct that will follow productSchema configuration
  // with the help of product we can perform C R U D operation

  export default Product;