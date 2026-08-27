import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
        title: "Atividade 2 para a disciplina de PFS2",
        description: "Documentação do conjunto de endpoints criados durante a atividade de Programação Fullstack 2"
    },
    host: "localhost:5000"
}

const outputFile = "./swagger-output.json";
const routes = ["./server.js"];

swaggerAutogen()(outputFile, routes, doc);