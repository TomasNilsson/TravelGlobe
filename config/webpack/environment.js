const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config()

environment.plugins.insert(
  'Environment',
  new webpack.EnvironmentPlugin(process.env)
)

module.exports = environment
