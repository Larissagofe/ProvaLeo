// importa a dependência fastify
import Fastify from 'fastify'
// cria o objeto fastify
const server = Fastify() // dependencia para criar um servidor

// CORS cross origen resource sharing - conecta duas origens
import cors from '@fastify/cors'

//importar rotas
import { AppRoutes } from './routes'

//registra cors
server.register(cors)
//registra rotas no servidor
server.register(AppRoutes)

// vamos criar nossa primeira rota 
// vamos usar o verbo GET - consulta
server.get('/hello', () => {
    return 'Boa noite, hoje tem jogo do Golden State'
})

// vamos subir o servidor
server.listen({
    port: 3333
})
.then (() => {
    console.log('HTTP Server running and listening on port 3333')
})