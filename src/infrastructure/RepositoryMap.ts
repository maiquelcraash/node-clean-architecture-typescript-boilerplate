import { UserRepository } from './adapters/repositories/UserRepository.js';
import { UserDAO } from './DAO/UserDAO.js';
import { DatabaseFactory } from './factories/DatabaseFactory.js';
import { IRepository } from '../domain/ports/repositories/IRepository.js';
import { IUserRepository } from '../domain/ports/repositories/IUserRepository.js';

/**
 * Mocked database object for fetching user data.
 */
const database = DatabaseFactory.getInstance({
    connectionURL: 'db://my-db',
    port: 1234,
    dbName: 'myDB',
});

export const repositoryMap: Map<IRepository, IRepository> = new Map([
    [IUserRepository, new UserRepository(new UserDAO(database))],
]);
