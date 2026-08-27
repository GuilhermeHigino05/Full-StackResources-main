import { writeFile } from 'fs/promises'

const doc ={
    info: {
        title: 'Crud API imovel',
        description: 'Documentação da API de imóveis',
        version: '1.0.0'
    },
    host: 'localhost:5000',
    basePath: '/',
    schemes: ['http'],
    paths: {
        '/imoveis': {
            get: {
                tags: ['Imóveis'],
                summary: 'Lista todos os imóveis',
                responses: {
                    200: { description: 'Lista de imóveis' },
                    204: { description: 'Nenhum imóvel cadastrado' },
                    500: { description: 'Erro interno do servidor' }
                }
            },
            post: {
                tags: ['Imóveis'],
                summary: 'Cadastra um imóvel',
                parameters: [{
                    name: 'body',
                    in: 'body',
                    required: true,
                    schema: { $ref: '#/definitions/ImovelInput' }
                }],
                responses: {
                    201: { description: 'Imóvel cadastrado' },
                    400: { description: 'Parâmetros incorretos' },
                    500: { description: 'Erro interno do servidor' }
                }
            }
        }
    }

}
const outputFile = './swagger-output.json'

await writeFile(outputFile, `${JSON.stringify({ swagger: '2.0', ...doc }, null, 2)}\n`)