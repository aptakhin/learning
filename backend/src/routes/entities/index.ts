import { FastifyPluginAsync } from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { Type } from '@sinclair/typebox'
import { CreateEntitySchema, UpdateEntitySchema, EntitySchema } from '../../schemas/entity.js'

const entities: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const server = fastify.withTypeProvider<TypeBoxTypeProvider>()

  server.get('/', {
    schema: {
      description: 'Get all entities',
      tags: ['entities'],
      response: {
        200: Type.Array(EntitySchema)
      }
    }
  }, async function (request, reply) {
    const results = await this.db
      .selectFrom('entities')
      .selectAll()
      .orderBy('created_at', 'desc')
      .execute()

    return results
  })

  server.post('/', {
    schema: {
      description: 'Create a new entity',
      tags: ['entities'],
      body: CreateEntitySchema,
      response: {
        201: EntitySchema
      }
    }
  }, async function (request, reply) {
    const entity = await this.db
      .insertInto('entities')
      .values({
        kind: request.body.kind,
        version: request.body.version,
        data: request.body.data
      })
      .returningAll()
      .executeTakeFirstOrThrow()

    reply.code(201)
    return entity
  })

  server.put('/:id', {
    schema: {
      description: 'Update an entity',
      tags: ['entities'],
      params: Type.Object({
        id: Type.String({ format: 'uuid' })
      }),
      body: UpdateEntitySchema,
      response: {
        200: EntitySchema,
        400: Type.Object({
          error: Type.String()
        }),
        404: Type.Object({
          error: Type.String()
        })
      }
    }
  }, async function (request, reply) {
    const updateData: any = {}

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
      .set(updateData)
      .where('id', '=', request.params.id)
      .returningAll()
      .executeTakeFirst()

    if (!entity) {
      return reply.code(404).send({ error: 'Entity not found' })
    }

    return entity
  })
}

export default entities
