export interface ConnectionDatabase {
    connect(): any 
    query(statement: any, params: any): Promise<any>
    close(): Promise<any>
}