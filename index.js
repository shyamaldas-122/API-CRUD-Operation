import 'dotenv/config'
import {
  createProduct,
  getAllProduct,
  getProduct,
  replaceProduct,
  updateProduct,
  deleteProduct,
} from "./controller/product.js";
import fs from "fs";
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';

import morgan from "morgan";
const server = express();
const productRouter = express.Router();

import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db connection
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  // console.log(process.env.MONGO_URL);
  console.log('Database Connected');
}


//bodyParser
server.use(cors());
server.use(express.json());
server.use(morgan("default"));
// server.use(express.static("public"));
server.use(express.static("dist"));
server.use("/", productRouter); //-> setting productRouter on server
server.use('*',(req,res)=>{
  // res.sendFile(__dirname+'/dist/index.html')
  res.sendFile(path.resolve(__dirname,'dist','index.html'))

}) // /add, /update -> if we don't find any path in server, it means it will be found in react application, which is index.html, load index.html

// MVC -> Model-view-controller
// const createProduct=(req, res) => {
//   console.log(req.body);
//   products.push(req.body);
//   res.status(201).json(req.body);
// }
// const getAllProduct=(req, res) => {
//   res.json(products);
// }
// const getProduct=(req, res) => {
//   const id = +req.params.id;
//   const product = products.find(p=>p.id===id)
//   res.json(product);
// }
// const replaceProduct=(req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex(p=>p.id===id)
//   products.splice(productIndex,1,{id:id,...req.body})
//   res.status(201).json();
// }
// const updateProduct=(req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex(p=>p.id===id)
//   const product = products[productIndex];
//   products.splice(productIndex,1,{...product,...req.body})
//   res.status(201).json();
// }
// const deleteProduct=(req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex(p=>p.id===id)
//   const product = products[productIndex];
//   products.splice(productIndex,1)
//   res.status(201).json(product);
// }

// //Create POST /products     C R U D
// server.post("/products", createProduct);

// // Read GET /products
// server.get("/products", getAllProduct);

// // Read GET /products/:id
// server.get("/products/:id", getProduct);

// // Update PUT /products/:id
// server.put("/products/:id", replaceProduct);

// // Update PATCH /products/:id
// server.patch("/products/:id", updateProduct);

// // Delete DELETE /products/:id
// server.delete("/products/:id", deleteProduct);

productRouter
  .post("/products", createProduct)
  .get("/products", getAllProduct)
  .get("/products/:id", getProduct)
  .put("/products/:id", replaceProduct)
  .patch("/products/:id", updateProduct)
  .delete("/products/:id", deleteProduct);

server.listen(8080, () => {
  console.log("server started");
});
