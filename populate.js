require('dotenv').config()

const connectDB = require('./db/connect')
const Product = require('./models/product')

const jsonProducts = require('./products.json')

const start = async() => {
   try{
      console.log('Connecting ....')
      await connectDB(process.env.MONGO_URI)
      console.log('Connected')

      console.log('Preparing enviroment ....')
      await Product.deleteMany()
      console.log('Enviroment completed ....')

      console.log('Crianting populate')
      await Product.create(jsonProducts)
      console.log('Populate')
      console.log('Success')
      process.exit(0)
   }catch(error){
      console.log(error)
      process.exit(1)
   }
}


start()