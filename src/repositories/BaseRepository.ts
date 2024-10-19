import { Database } from 'sqlite'

export class BaseRepository {
  constructor(protected db: Database) { }
}
