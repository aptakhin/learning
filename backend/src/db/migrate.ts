import * as path from 'node:path'
import { promises as fs } from 'node:fs'
import { Kysely, Migrator, PostgresDialect, FileMigrationProvider } from 'kysely'
import { Pool } from 'pg'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function migrateToLatest() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new Pool({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'postgres',
        database: process.env.DB_NAME || 'learning',
      }),
    }),
  })

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations'),
    }),
  })

  const { error, results } = await migrator.migrateToLatest()

  results?.forEach((it) => {
    if (it.status === 'Success') {
      // eslint-disable-next-line no-console
      console.log(`Migration "${it.migrationName}" was executed successfully`)
    } else if (it.status === 'Error') {
      // eslint-disable-next-line no-console
      console.error(`Failed to execute migration "${it.migrationName}"`)
    }
  })

  if (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to migrate')
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(1)
  }

  await db.destroy()
}

void migrateToLatest()
