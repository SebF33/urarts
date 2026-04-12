import { CompiledQuery, DatabaseConnection, Driver, QueryResult } from "kysely";
import { DatabaseSync, type SQLInputValue } from "node:sqlite";

export class SqliteDriver implements Driver {
  readonly #connectionMutex = new ConnectionMutex();

  #db?: DatabaseSync;
  #connection?: DatabaseConnection;

  path?: string;

  constructor(path: string) {
    this.path = path;
  }

  init(): Promise<void> {
    this.#db = new DatabaseSync(this.path!);
    this.#connection = new SqliteConnection(this.#db);
    return Promise.resolve();
  }

  async acquireConnection(): Promise<DatabaseConnection> {
    await this.#connectionMutex.lock();
    return this.#connection!;
  }

  async beginTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("begin"));
  }

  async commitTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("commit"));
  }

  async rollbackTransaction(connection: DatabaseConnection): Promise<void> {
    await connection.executeQuery(CompiledQuery.raw("rollback"));
  }

  releaseConnection(): Promise<void> {
    this.#connectionMutex.unlock();
    return Promise.resolve();
  }

  destroy(): Promise<void> {
    this.#db?.close();
    return Promise.resolve();
  }
}

class SqliteConnection implements DatabaseConnection {
  readonly #db: DatabaseSync;

  constructor(db: DatabaseSync) {
    this.#db = db;
  }

  executeQuery<O>(compiledQuery: CompiledQuery): Promise<QueryResult<O>> {
    const { sql, parameters } = compiledQuery;
    const stmt = this.#db.prepare(sql);

    return Promise.resolve({
      rows: stmt.all(...toSqliteParams(parameters)) as unknown as O[],
    });
  }

  async *streamQuery<O>(
    compiledQuery: CompiledQuery,
  ): AsyncGenerator<O, void, unknown> {
    const { sql, parameters } = compiledQuery;
    const stmt = this.#db.prepare(sql);

    for (const row of stmt.iterate(...toSqliteParams(parameters))) {
      yield row as unknown as O;
    }
  }
}

function toSqliteParams(parameters: readonly unknown[]): SQLInputValue[] {
  return parameters as SQLInputValue[];
}

class ConnectionMutex {
  #promise?: Promise<void>;
  #resolve?: () => void;

  async lock(): Promise<void> {
    while (this.#promise) {
      await this.#promise;
    }

    this.#promise = new Promise((resolve) => {
      this.#resolve = resolve;
    });
  }

  unlock(): void {
    const resolve = this.#resolve;

    this.#promise = undefined;
    this.#resolve = undefined;

    resolve?.();
  }
}
