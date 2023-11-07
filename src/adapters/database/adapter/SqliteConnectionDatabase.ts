import sqlite3 from 'sqlite3';
import { ConnectionDatabase } from "../ConnectionDatabase";

export class SqliteConnectionDatabase implements ConnectionDatabase {

    connection: any;

    constructor() {
        this.connection = new sqlite3.Database(':memory:');
    }

    connect() {
        return this.connection;
    }

    async query(statement: string, params?: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.connection.all(statement, params, (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    async close(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.connection.close((err: Error | null) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    static async initializeDatabase(connection: any): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            connection.run(`
                CREATE TABLE IF NOT EXISTS products (
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    price REAL,
                    status TEXT
                )`, (err: Error | null) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                });
        });
    }
}
