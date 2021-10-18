const Product = require('../models/product')
const query = require('../helpers/query')
const ordenar = require('../helpers/sort')
const selectFields = require('../helpers/fields')

const getAllProductsStatic = async(req, res) => {
   const products = await Product.find({})    
   
   res.status(200).json({ nbHits: products.length, products  })
}

const getAllProducts = async(req, res) => {
   const { featured, company, name, sort, fields } = req.query
   const queryObject = query(featured, company, name)
   
   let result = Product.find(queryObject)
   result = ordenar(result, sort)
   result = selectFields(result, fields)   

   const products = await result

   res.status(200).json({ nbHits: products.length, products })
}

module.exports = {
   getAllProducts,
   getAllProductsStatic
}