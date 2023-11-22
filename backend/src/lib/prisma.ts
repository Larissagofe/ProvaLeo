//BANCO DE DADOS
// importa a dependência prisma
import {PrismaClient} from '@prisma/client'
// cria o objeto prisma
export const prisma = new PrismaClient() // orm para conectar com o banco
