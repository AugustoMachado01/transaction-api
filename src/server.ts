import fastify from 'fastify'

import { PrismaClient } from '@prisma/client'

// import {} from 'prisma'

const app = fastify()

app.get('/hello', () => {
  return 'hello world'
})

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server Running!')
})
