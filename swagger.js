const swaggerAutogen = require("swagger-autogen")({ language: "ko" });

const doc = {
  info: {
    title: "rladuddn",
    description: "Description",
  },
  host: "localhost:3000",
  schemas: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
