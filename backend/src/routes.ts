// importa a dependência ZOD
import {z} from 'zod'
import {prisma} from './lib/prisma'
import { FastifyInstance } from 'fastify'
export async function AppRoutes(server: FastifyInstance){

// rota para consultar todos os produtos no banco de dados
server.get('/products', async () => {
    const products = await prisma.product.findMany()
    return products
})

// rota para consultar os produtos que iniciam a descrição com uma palavra
server.get('/product/:id', async (request) => {

    const idParam = z.object({
        id: z.string()
    })
  
    const {id} = idParam.parse(request.params)
    // faz a consulta no banco de dados
    const product = prisma.product.findFirst({
        where: {
            id 
        }
    })
    return product

})
//cria rota para inserir produto
server.post('/product', async(request)=>{
    const productBody = z.object({
        description: z.string(),
        price: z.number(),
        quantity: z.number(),
        type_price: z.string(),
        massa: z.string(),
        sabor: z.string()
    })
    const {description, price, quantity, type_price, massa, sabor} = productBody.parse(request.body)
    //inserir produto no banco de dados
    const newProduct = prisma.product.create({
        data: {
            description: description,
            price: price, 
            quantity: quantity,
            type_price: type_price,
            massa: massa,
            sabor: sabor,
            created_at: new Date()
        }
    })
    return newProduct
})

// rota para atualizar um produto
server.put('/product/id/:id', async (request)=>{
    const idParam = z.object({
        id: z.string()
    })

    const putBody = z.object({
        description: z.string(),
        quantity: z.number(),
        price: z.number(),
        massa: z.string(),
        sabor: z.string(),
        type_price: z.string()
        
    })

    //recupera dados do frontend com o params
    const {id} = idParam.parse(request.params)
    //recupera dados do frontend com o body
    const {description, quantity, price, type_price, massa, sabor} = putBody.parse(request.body)
    //atualiza o produto no banco de dados
    const productUpdated = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            description,
            quantity,
            price, 
            massa, 
            sabor,
            type_price
        }
    })
    return productUpdated
})

//rota para remover o produto
server.delete('/product/id/:id', async(request)=>{
    const idParam = z.object({
        id: z.string().uuid()
    })
    //recupera dados do frontend com o params
    const {id} = idParam.parse(request.params)
    //remove do banco de dados
    const productRemoved = await prisma.product.delete({
        where: {
            id: id
        }
    })
    return productRemoved
})

server.post('/login', async(request)=>{
    //cria objeto zod para definir esquema de dados frontend
    const loginBody = z.object({
        user: z.string(),
        password: z.string(),
    })
    //recupera dados do frontend
    const {user, password} = loginBody.parse(request.body)
    //inserir produto no banco de dados
    const newLogin = prisma.login.create({
        data: {
            user: user,
            password: password
        }
    })
    return newLogin
})
}
