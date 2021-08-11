import express from 'express'
// @ts-ignore
import * as swaggerUI from 'swagger-ui-express'

const app = express()
const swaggerDocumnet = require('../../swagger.json')
const PORT = process.env.PORT || 3002

app.use('', swaggerUI.serve, swaggerUI.setup(swaggerDocumnet))

const run = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error(err)
  }
}

run()
