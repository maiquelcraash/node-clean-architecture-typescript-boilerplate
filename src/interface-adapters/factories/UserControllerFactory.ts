import { IUserRepository } from '../../domain/ports/repositories/IUserRepository.js';
import { GetAllUsersUseCase } from '../../domain/use-cases/GetAllUsersUseCase.js';
import { UserController } from '../controllers/UserController.js';
import { IDependencyInjection } from '../ports/IDependencyInjection.js';
import { UserPresenter } from '../presenters/UserPresenter.js';

/**
 * Creates a UserController instance using the provided dependency injection.
 * @param {IDependencyInjection} dependencyInjection - The dependency injection container.
 * @return {UserController} - The created UserController instance.
 */
export function factoryUserController(dependencyInjection: IDependencyInjection) {
    const userRepository = dependencyInjection.resolveRepository<IUserRepository>(IUserRepository);
    const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);

    return new UserController({
        getAllUsersUseCase: getAllUsersUseCase,
        userPresenter: new UserPresenter(),
    });
}
