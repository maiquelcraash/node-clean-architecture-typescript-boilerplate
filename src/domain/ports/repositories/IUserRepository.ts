import { IRepository } from './IRepository.js';
import { User } from '../../entities/User.js';

export abstract class IUserRepository extends IRepository {
    /**
     * Retrieves all users.
     * @abstract
     * @return {Array<User>} An array containing all users.
     */
    abstract getAll(): Promise<Array<User>>;
}
