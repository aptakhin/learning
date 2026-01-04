import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import Fastify from 'fastify'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import databasePlugin from '../../plugins/database.js'
import entitiesRoutes from './index.js'

describe('Entities API', () => {
  const app = Fastify().withTypeProvider<TypeBoxTypeProvider>()
  let entityId: string

  beforeAll(async () => {
    await app.register(databasePlugin)
    app.register(entitiesRoutes, { prefix: '/entities' })
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('GET /entities', () => {
    it('should return an array of entities', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/entities'
      })

      expect(response.statusCode).toBe(200)
      expect(Array.isArray(response.json())).toBe(true)
    })
  })

  describe('POST /entities', () => {
    it('should create a new entity with valid data', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/entities',
        payload: {
          kind: 'freelearning.org/Project',
          version: '1.0.0',
          data: { name: 'Test Project', description: 'A test project' }
        }
      })

      expect(response.statusCode).toBe(201)
      const body = response.json()
      expect(body).toHaveProperty('id')
      expect(body.kind).toBe('freelearning.org/Project')
      expect(body.version).toBe('1.0.0')
      expect(body.data).toEqual({ name: 'Test Project', description: 'A test project' })
      expect(body).toHaveProperty('created_at')
      expect(body).toHaveProperty('updated_at')

      entityId = body.id
    })

    it('should reject invalid kind format', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/entities',
        payload: {
          kind: 'invalid-format',
          version: '1.0.0',
          data: {}
        }
      })

      expect(response.statusCode).toBe(400)
    })

    it('should reject invalid version format', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/entities',
        payload: {
          kind: 'freelearning.org/Project',
          version: 'not-semver',
          data: {}
        }
      })

      expect(response.statusCode).toBe(400)
    })

    it('should reject missing required fields', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/entities',
        payload: {
          kind: 'freelearning.org/Project'
        }
      })

      expect(response.statusCode).toBe(400)
    })
  })

  describe('PUT /entities/:id', () => {
    it('should update an existing entity', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {
          version: '1.1.0',
          data: { name: 'Updated Test Project', description: 'Updated description' }
        }
      })

      expect(response.statusCode).toBe(200)
      const body = response.json()
      expect(body.id).toBe(entityId)
      expect(body.version).toBe('1.1.0')
      expect(body.data).toEqual({ name: 'Updated Test Project', description: 'Updated description' })
      expect(body.updated_at).not.toBe(body.created_at)
    })

    it('should update only specified fields', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {
          version: '1.2.0'
        }
      })

      expect(response.statusCode).toBe(200)
      const body = response.json()
      expect(body.version).toBe('1.2.0')
      expect(body.data).toEqual({ name: 'Updated Test Project', description: 'Updated description' })
    })

    it('should return 404 for non-existent entity', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: '/entities/00000000-0000-0000-0000-000000000000',
        payload: { version: '1.0.0' }
      })

      expect(response.statusCode).toBe(404)
      expect(response.json()).toHaveProperty('error')
    })

    it('should return 400 when no fields provided', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {}
      })

      expect(response.statusCode).toBe(400)
      expect(response.json()).toHaveProperty('error', 'No fields to update')
    })

    it('should reject invalid kind format', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {
          kind: 'invalid-format'
        }
      })

      expect(response.statusCode).toBe(400)
    })

    it('should reject invalid version format', async () => {
      const response = await app.inject({
        method: 'PUT',
        url: `/entities/${entityId}`,
        payload: {
          version: 'invalid'
        }
      })

      expect(response.statusCode).toBe(400)
    })
  })
})
