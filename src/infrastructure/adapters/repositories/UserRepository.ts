import { UserDTO } from '../../../domain/DTOs/UserDTO.js';
import { User } from '../../../domain/entities/User.js';
import { IAdapter } from '../../../domain/ports/IAdapter.js';
import { IUserRepository } from '../../../domain/ports/repositories/IUserRepository.js';

type fakeDBType = { getUsers(): Promise<UserDTO[]> };

export class UserRepository extends IUserRepository implements IAdapter {
    private _mockedDB: fakeDBType;

    constructor(mockedDB: fakeDBType) {
        super();
        this._mockedDB = mockedDB;
    }

    async getAll(): Promise<Array<User>> {
        const mockData = await this._mockedDB.getUsers();
        return mockData.map((rawUser) => new User(rawUser));
    }
}
