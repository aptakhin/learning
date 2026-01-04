import { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { CreateEntitySchema, UpdateEntitySchema, EntitySchema } from '../../schemas/entity.js'

const entities: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>()

  server.get(
    '/',
    {
      schema: {
        description: 'Get all entities',
        tags: ['entities'],
        response: {
          200: Type.Array(EntitySchema),
        },
      },
    },
    async function (_request, _reply) {
      const results = await this.db
        .selectFrom('entities')
        .selectAll()
        .orderBy('created_at', 'desc')
        .execute()

      return results
    }
  )

  server.get(
    '/:id',
    {
      schema: {
        description: 'Get a single entity by ID',
        tags: ['entities'],
        params: Type.Object({
          id: Type.String({ format: 'uuid' }),
        }),
        response: {
          200: EntitySchema,
          404: Type.Object({
            error: Type.String(),
          }),
        },
      },
    },
    async function (request, reply) {
      const entity = await this.db
        .selectFrom('entities')
        .selectAll()
        .where('id', '=', request.params.id)
        .executeTakeFirst()

      if (!entity) {
        return reply.code(404).send({ error: 'Entity not found' })
      }

      return entity
    }
  )

  server.post(
    '/',
    {
      schema: {
        description: 'Create a new entity',
        tags: ['entities'],
        body: CreateEntitySchema,
        response: {
          201: EntitySchema,
        },
      },
    },
    async function (request, reply) {
      const entity = await this.db
        .insertInto('entities')
        .values({
          kind: request.body.kind,
          version: request.body.version,
          data: request.body.data,
        })
        .returningAll()
        .executeTakeFirstOrThrow()

      reply.code(201)
      return entity
    }
  )

  registerUpdateRoute(server)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function registerUpdateRoute(server: any) {
  server.put(
    '/:id',
    {
      schema: {
        description: 'Update an entity',
        tags: ['entities'],
        params: Type.Object({
          id: Type.String({ format: 'uuid' }),
        }),
        body: UpdateEntitySchema,
        response: {
          200: EntitySchema,
          400: Type.Object({
            error: Type.String(),
          }),
          404: Type.Object({
            error: Type.String(),
          }),
        },
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function (request: any, reply: any) {
      const updateData: Record<string, unknown> = {}

      if (request.body.kind !== undefined) {
        updateData.kind = request.body.kind
      }
      if (request.body.version !== undefined) {
        updateData.version = request.body.version
      }
      if (request.body.data !== undefined) {
        updateData.data = request.body.data
      }

      if (Object.keys(updateData).length === 0) {
        return reply.code(400).send({ error: 'No fields to update' })
      }

      const entity = await this.db
        .updateTable('entities')
        .set(updateData as never)
        .where('id', '=', request.params.id)
        .returningAll()
        .executeTakeFirst()

      if (!entity) {
        return reply.code(404).send({ error: 'Entity not found' })
      }

      return entity
    }
  )
}

export default entities
