const query = (featured, company, name) => {
  const queryObject = {}

   if(featured){
      queryObject.featured = featured === 'true' ? true : false 
   }

   if(company){
      queryObject.company = company
   }

   if(name){
      queryObject.name = { $regex: name, $options: 'i'}
   }
   return queryObject;
}


module.exports = query
