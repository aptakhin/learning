import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import cors from '@fastify/cors'
import dotenv from 'dotenv'
import databasePlugin from './plugins/database.js'
import entitiesRoutes from './routes/entities/index.js'

dotenv.config()

const start = async () => {
  const server = Fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      },
    },
  }).withTypeProvider<TypeBoxTypeProvider>()

  await server.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  await server.register(databasePlugin)

  await server.register(entitiesRoutes, { prefix: '/entities' })

  server.get('/health', async () => {
    return { status: 'ok' }
  })

  try {
    const port = parseInt(process.env.PORT || '8080')
    const host = process.env.HOST || '0.0.0.0'

    await server.listen({ port, host })
    // eslint-disable-next-line no-console
    console.log(`Server listening on http://${host}:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

void start()
