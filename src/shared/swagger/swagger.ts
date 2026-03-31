import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'PeliValoración API',
            version: '1.0.0',
            description: 'API para la calificación de peliculas y series con la persona mas especial de tu vida',
            contact: {
                name: 'Jahdiel'
            },
            servers: [
                {
                    url: 'http://localhost:3003/api',
                    description: 'Local server'
                }
            ]
        }
    },
    apis: ['./src/shared/swagger/*.yml']
};

const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;