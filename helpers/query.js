const query = (featured, company, name, numericFilters) => {
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

   if(numericFilters){
      const operatorMap = {
         '>': '$gt',
         '>=': '$gte',
         '=': '$eq',
         '<': '$lt',
         '<=': '$lte',
      }
      const regEx = /\b(<|>|>=|=|<|<=)\b/g
      let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
      const options = ['price', 'rating']
      filters = filters.split(',').forEach(item => {
         const [fields, operator, value] = item.split('-')

         if(options.includes(fields)){
            queryObject[fields] = {[operator]: Number(value)}
         }
         
      });

   }
   return queryObject;
}


module.exports = query
