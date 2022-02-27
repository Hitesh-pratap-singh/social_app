const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsync");

// Create Product -- Admin
exports.createProduct = catchAsync(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  });

//Get all products
exports.getAllProducts = catchAsync(async (req, res) => {
    const products = await Product.find();
  
    res.status(200).json({ success: true, products });
  });

//Update Product -- Admin

exports.updateProduct = catchAsync(async (req, res) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  });

//Delete product - admin
exports.deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  });

//get product detail
exports.getProductDetails = catchAsync(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });
