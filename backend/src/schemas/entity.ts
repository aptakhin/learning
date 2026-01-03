import { Type, Static } from '@sinclair/typebox'

export const EntityDataSchema = Type.Record(Type.String(), Type.Any())

export const EntitySchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  kind: Type.String({
    pattern: '^[a-z0-9.-]+/[A-Z_]+$',
    description: 'Entity kind in format: domain.tld/KIND_NAME',
    examples: ['freelearning.org/PROJECT', 'freelearning.org/TASK']
  }),
  version: Type.String({
    pattern: '^\\d+\\.\\d+\\.\\d+$',
    description: 'Semantic version: major.minor.patch',
    examples: ['1.0.0', '2.1.3']
  }),
  data: EntityDataSchema,
  created_at: Type.String({ format: 'date-time' }),
  updated_at: Type.String({ format: 'date-time' })
})

export const CreateEntitySchema = Type.Object({
  kind: Type.String({
    pattern: '^[a-z0-9.-]+/[A-Z_]+$',
    description: 'Entity kind in format: domain.tld/KIND_NAME',
    examples: ['freelearning.org/PROJECT', 'freelearning.org/TASK']
  }),
  version: Type.String({
    pattern: '^\\d+\\.\\d+\\.\\d+$',
    description: 'Semantic version: major.minor.patch',
    examples: ['1.0.0', '2.1.3']
  }),
  data: EntityDataSchema
})

export const UpdateEntitySchema = Type.Object({
  kind: Type.Optional(Type.String({
    pattern: '^[a-z0-9.-]+/[A-Z_]+$'
  })),
  version: Type.Optional(Type.String({
    pattern: '^\\d+\\.\\d+\\.\\d+$'
  })),
  data: Type.Optional(EntityDataSchema)
})

export type Entity = Static<typeof EntitySchema>
export type CreateEntity = Static<typeof CreateEntitySchema>
export type UpdateEntity = Static<typeof UpdateEntitySchema>
