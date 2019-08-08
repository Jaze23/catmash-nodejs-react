import swaggerJsdoc from "swagger-jsdoc";

const options = {
  swaggerDefinition: {
    // Like the one described here: https://swagger.io/specification/#infoObject
    info: {
      title: "CatMash Rest API",
      version: "1.0.0",
      description: "CatMash Rest API description",
    },
    basePath: "/v1",
  },
  // List of files to be processes. You can also set globs './routes/*.js'
  apis: ["src/api/**/*.controller.ts"],
};

export default swaggerJsdoc(options);
