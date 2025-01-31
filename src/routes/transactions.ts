import { PrismaClient } from '@prisma/client'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'

import { z } from 'zod'
import { checkSessionId } from '../middlewares/check-session-id-exists'

const prisma = new PrismaClient()

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionId] }, async (req, reply) => {
    let transactions

    const { sessionId } = req.cookies
    try {
      transactions = await prisma.transactions.findMany({
        where: { sessionId },
      })
    } catch (error) {
      return reply.status(401).send('Eror in Servidor')
    }

    return reply.status(200).send({ transactions })
  })

  app.get('/:id', { preHandler: [checkSessionId] }, async (req, reply) => {
    const { sessionId } = req.cookies

    const getTransactionParamsSchema = z.object({ id: z.string() })

    const { id } = getTransactionParamsSchema.parse(req.params)

    const transaction = await prisma.transactions.findFirst({
      where: { sessionId, id: Number(id) },
    })

    return reply.status(200).send({ transaction })
  })

  app.get('/summary', { preHandler: [checkSessionId] }, async (req, reply) => {
    const { sessionId } = req.cookies
    let sum = 0
    try {
      const getAllTransactions = await prisma.transactions.findMany({
        where: { sessionId },
      })

      for (const transaction of getAllTransactions) {
        sum += transaction.amount
      }
    } catch (error) {
      reply.status(402).send({ message: 'Error in Servidor', error })
    }

    reply.status(200).send({ message: 'Soma feito com sucesso', summary: sum })
  })

  app.post('/', async (req, reply) => {
    const createTransactionsBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionsBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // days
      })
    }

    try {
      await prisma.transactions.create({
        data: {
          title,
          amount: type === 'credit' ? amount : amount * -1,
          sessionId,
        },
      })
    } catch (error) {
      return reply.status(401).send('Eror in servidor')
    }

    return reply.status(201).send('Create width success')
  })
}
