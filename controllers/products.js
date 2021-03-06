const Product = require('../models/product')
const query = require('../helpers/query')
const ordenar = require('../helpers/sort')
const selectFields = require('../helpers/fields')

const getAllProductsStatic = async(req, res) => {
   const products = await Product
      .find({})
      .sort('name')    
      .select('name price')
   
   res.status(200).json({ nbHits: products.length, products  })
}

const getAllProducts = async(req, res) => {
   const { featured, company, name, sort, fields, numericFilters } = req.query
   const queryObject = query(featured, company, name, numericFilters)   
   let result = Product.find(queryObject)
   result = ordenar(result, sort)
   result = selectFields(result, fields)   

   const page = Number(req.query.page) || 1
   const limit = Number(req.query.limit) || 10
   const skip = (page -1) * limit;

   result = result.skip(skip).limit(limit)
   const products = await result

   res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
   getAllProducts,
   getAllProductsStatic
}