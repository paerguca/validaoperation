'use strict'

import validationService from './validation'

const operacionService = {}

operacionService.search = function () {
  //const type = 'operacion'

  return validationService.get('/operaciones', {
    //params: { q }
  })
  .then(res => res.data)
}

operacionService.save = function (operacion) {
  //const type = 'operacion'
  //console.log(operacion)
  
  return validationService.post('/operaciones', operacion)
  .then(res => res.data)
}

export default operacionService