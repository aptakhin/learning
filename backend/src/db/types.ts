import { ColumnType, Generated, Insertable, Selectable, Updateable } from 'kysely'

export interface Database {
  entities: EntitiesTable
}

export interface EntitiesTable {
  id: Generated<string>
  kind: string
  version: string
  data: ColumnType<Record<string, unknown>, Record<string, unknown>, Record<string, unknown>>
  created_at: ColumnType<string, string | undefined, never>
  updated_at: ColumnType<string, string | undefined, string>
}

export type Entity = Selectable<EntitiesTable>
export type NewEntity = Insertable<EntitiesTable>
export type EntityUpdate = Updateable<EntitiesTable>
