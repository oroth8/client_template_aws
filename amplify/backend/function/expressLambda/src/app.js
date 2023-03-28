/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/




const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});


app.use(express.static('../../../../../build'));

// Send main index file for every request
app.get('*', (req, res) => res.sendFile(path.join(__dirname, "../../../../../", '/build/index.html')))

// Start server
const server = app.listen(3000, () => console.log(`Express server listening on port ${ 3000 }`))

// Pretty format port-in-use error
server.on('error', e => {
  if (e.code === 'EADDRINUSE') {
    console.log(`Port ${ 3000 } is already in use!`)
    process.exit(1)
  }
})


module.exports = app
