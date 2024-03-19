import { User } from '../../../domain/entities/User.js';
import { IAdapter } from '../../../domain/ports/IAdapter.js';
import { IUserRepository } from '../../../domain/ports/repositories/IUserRepository.js';
import { UserDAO } from '../../DAO/UserDAO.js';

export class UserRepository extends IUserRepository implements IAdapter {
    private _userDAO: UserDAO;

    constructor(userDAO: UserDAO) {
        super();
        this._userDAO = userDAO;
    }

    async getAll(): Promise<Array<User>> {
        const mockData = await this._userDAO.getUsers();
        return mockData.map((rawUser) => new User(rawUser));
    }
}
