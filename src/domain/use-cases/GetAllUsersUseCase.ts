import { User } from '../entities/User.js';
import { IUseCase } from '../ports/IUseCase.js';
import { IUserRepository } from '../ports/repositories/IUserRepository.js';


export class GetAllUsersUseCase implements IUseCase {
    private _userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async execute(): Promise<Array<User>> {
        return await this._userRepository.getAll();
    }
}
