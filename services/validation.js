'use strict'

import trae from 'trae'
import configService from './config'

const validationService = trae.create({
  baseUrl: configService.apiUrl,
  bodyType: 'json',
  mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

export default validationService