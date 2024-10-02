import db from '@db/config/database'
import accountSchema from '@db/schema/account'
import platformSchema from '@db/schema/platform'
import settingSchema from '@db/schema/setting'
import sportsBookSchema from '@db/schema/sportsBook'

interface RecordData {
  [key: string]: string | number | boolean | null
}

class Model {
  private tableName: string

  constructor(tableName: string, schema: string) {
    this.tableName = tableName
    db.prepare(`CREATE TABLE IF NOT EXISTS ${this.tableName} (${schema})`).run()
  }

  count(): number {
    const result = db.prepare(`SELECT COUNT(*) AS count FROM ${this.tableName}`).get()
    return result.count
  }

  findOne(query: RecordData): RecordData | undefined {
    const [key, value] = Object.entries(query)[0]
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE ${key} = ?`).get(value)
  }

  findAll(query: RecordData = {}): RecordData[] {
    const keys = Object.keys(query)
    if (keys.length === 0) {
      return db.prepare(`SELECT * FROM ${this.tableName}`).all()
    }

    const conditions = keys.map((key) => `${key} = ?`).join(' AND ')
    const values = Object.values(query)
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE ${conditions}`).all(...values)
  }

  findById(id: number) {
    return db.prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`).get(id)
  }

  create(data: RecordData) {
    const keys = Object.keys(data).join(', ')
    const values = Object.values(data)
    const placeholders = values.map(() => '?').join(', ')

    db.transaction(() => {
      db.prepare(`INSERT INTO ${this.tableName} (${keys}) VALUES (${placeholders})`).run(...values)
    })()
  }

  insertMany(records: RecordData[]) {
    if (records.length === 0) return

    const keys = Object.keys(records[0]).join(', ')
    const placeholders = records
      .map(
        () =>
          `(${Object.values(records[0])
            .map(() => '?')
            .join(', ')})`
      )
      .join(', ')

    const values = records.flatMap((record) => Object.values(record))

    db.transaction(() => {
      db.prepare(`INSERT INTO ${this.tableName} (${keys}) VALUES ${placeholders}`).run(...values)
    })()
  }

  update(query: RecordData, updates: RecordData) {
    if (Object.keys(query).length === 0) {
      const updateKeys = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(', ')
      const updateValues = Object.values(updates)

      const sql = `UPDATE ${this.tableName} SET ${updateKeys}`
      db.prepare(sql).run(...updateValues)
    } else {
      const queryKeys = Object.keys(query)
        .map((key) => `${key} = ?`)
        .join(' AND ')
      const queryValues = Object.values(query)

      const updateKeys = Object.keys(updates)
        .map((key) => `${key} = ?`)
        .join(', ')
      const updateValues = Object.values(updates)

      const sql = `UPDATE ${this.tableName} SET ${updateKeys} WHERE ${queryKeys}`
      const params = [...updateValues, ...queryValues]

      db.prepare(sql).run(...params)
    }
  }

  delete(query: RecordData) {
    // model.delete({ id: 1 })
    const [key, value] = Object.entries(query)[0]

    db.transaction(() => {
      db.prepare(`DELETE FROM ${this.tableName} WHERE ${key} = ?`).run(value)
    })()
  }
}

export const Account = new Model('account', accountSchema)
export const Platform = new Model('platform', platformSchema)
export const SportsBook = new Model('sportsBook', sportsBookSchema)
export const Setting = new Model('setting', settingSchema)

export default Model
