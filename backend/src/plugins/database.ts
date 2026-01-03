import fp from 'fastify-plugin'
import { Kysely, PostgresDialect } from 'kysely'
import { Pool } from 'pg'
import type { Database } from '../db/types.js'

export interface DatabasePluginOptions {
  host?: string
  port?: number
  user?: string
  password?: string
  database?: string
}

declare module 'fastify' {
  interface FastifyInstance {
    db: Kysely<Database>
  }
}

export default fp<DatabasePluginOptions>(async (fastify, opts) => {
  const db = new Kysely<Database>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: opts.host || process.env.DB_HOST || 'localhost',
        port: opts.port || parseInt(process.env.DB_PORT || '5432'),
        user: opts.user || process.env.DB_USER || 'postgres',
        password: opts.password || process.env.DB_PASSWORD || 'postgres',
        database: opts.database || process.env.DB_NAME || 'learning',
      }),
    }),
  })

  fastify.decorate('db', db)

  fastify.addHook('onClose', async (instance) => {
    await instance.db.destroy()
  })
}, {
  name: 'database-plugin'
})
