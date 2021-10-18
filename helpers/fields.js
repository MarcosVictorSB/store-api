const selectFields = (result, fields) => {
   if(fields){
      const fieldsList = fields.split(',').join(' ')
      result = result.select(fieldsList)
   }
   return result
}

module.exports = selectFields
