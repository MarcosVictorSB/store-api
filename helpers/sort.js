const ordenar = (result, sort) => {
   if(sort){
      const sortList = sort.split(',').join(' ')
      result = result.sort(sortList)
   }else{
      result = result.sort('createAt')
   }

   return result
}

module.exports = ordenar
