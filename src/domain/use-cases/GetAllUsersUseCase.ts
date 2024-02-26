import { BaseUseCase } from './BaseUseCase.js';
import { User } from '../entities/User.js';
import { IUserRepository } from '../ports/repositories/IUserRepository.js';


export class GetAllUsersUseCase implements BaseUseCase {
    private _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async execute(): Promise<Array<User>> {
        return await this._userRepository.getAll();
    }
}
