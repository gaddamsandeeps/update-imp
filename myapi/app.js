'use strict';

var SwaggerExpress = require('swagger-express-mw');
var SwaggerUi = require('swagger-tools/middleware/swagger-ui');
var path = require('path');
var app = require('express')();
var express = require('express');
module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  var swaggerUIDocsPath = path.join(__dirname, 'public');
  //Setup swaggerUI middleware
 app.use(SwaggerUi(swaggerExpress.runner.swagger, {
 	swaggerUiDir : swaggerUIDocsPath,
 	apiDocs: '/api-docs',
  swaggerUi: '/docs'
 }));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 9999;
  app.listen(port);
  console.log('Swagger started on port '+port);
  console.log('Swagger UI started on http://localhost:'+port+"/docs");
});
