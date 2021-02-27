import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async():Promise<Connection> => {
    const getOptionsDefault = await getConnectionOptions()

    return createConnection(Object.assign(getOptionsDefault, {
        database: process.env.NODE_ENV === "test" ? "api_typescript_test" : getOptionsDefault.database
    }))
    
}


