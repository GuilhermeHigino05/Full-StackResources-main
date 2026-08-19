import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: "API para disciplina de PFS2",
        description: "Documentação do conjunto de endpoints criados durante as aulas de PFS2"
        
    },
    tags: [
        {
            name: 'Memphis',
            description: 'Depay'
        }
    ],
    host: "localhost:5000"
    
}

const outputFile = './swagger-output.json'
const routes = ["./server.js"];

swaggerAutogen()(outputFile, routes, doc)