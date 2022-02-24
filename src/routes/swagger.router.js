const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const SwaggerDocs = require('../../CompassolisaSwagger.json');

router.use('/api/v1/swagger-docs', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));

module.exports = router;
