import { UserDTO } from '../../../domain/DTOs/UserDTO.js';
import { User } from '../../../domain/entities/User.js';
import { IUserRepository } from '../../../domain/ports/repositories/IUserRepository.js';

export class UserRepository extends IUserRepository {
    // this constructor could receive a DB connection to fetch real data rather than the mocked
    private _mockedDB: { getUsers(): Promise<UserDTO[]> };
    constructor(mockedDB: { getUsers(): Promise<UserDTO[]> }) {
        super();
        this._mockedDB = mockedDB;
    }

    async getAll(): Promise<Array<User>> {
        const mockData = await this._mockedDB.getUsers();
        return mockData.map((rawUser) => {
            return new User({
                name: rawUser.name,
                lastname: rawUser.lastname,
                username: rawUser.username,
                password: rawUser.password,
                phone: Number(rawUser.phone),
                created: new Date(rawUser.created),
            });
        });
    }
}
