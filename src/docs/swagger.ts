import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0', // Versi OpenAPI
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API For Coding Test PT SERA || Laudry Iza Fadian',
    },
    server: {
      url: "localhost:8080"
    }
  },
  apis: ['**/docs/schema.yaml'], // Ganti dengan path ke berkas rute Anda
};

const specs = swaggerJsdoc(options);

export default specs;
