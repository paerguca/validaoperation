'use strict'

const path = require('path')

module.exports = {

  outputDir: path.resolve(__dirname, '../valida-api/public'),

  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000'
      }
    }
  }
}