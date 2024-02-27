import { User } from '../../../../src/domain/entities/User.js';
import { IUserRepository } from '../../../../src/domain/ports/repositories/IUserRepository.js';
import { GetAllUsersUseCase } from '../../../../src/domain/use-cases/GetAllUsersUseCase.js';

describe('domain > use-cases > GetAllUsersUseCase', () => {
    let userRepositoryMock: IUserRepository, useCaseInstance: GetAllUsersUseCase;

    const usersMock = [
        new User({
            id: 1,
            name: 'John',
            lastname: 'Doe',
            username: 'johndoe',
            password: 'password123',
            phone: 1234567890,
            created: new Date(),
        }),
        new User({
            id: 2,
            name: 'Jane',
            lastname: 'Doe',
            username: 'janedoe',
            password: 'password123',
            phone: 8987654321,
            created: new Date(),
        }),
    ];

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        userRepositoryMock = { getAll: jest.fn().mockResolvedValue(usersMock) };
        useCaseInstance = new GetAllUsersUseCase(userRepositoryMock);
    });


    describe('execute', () => {
        describe('When executing use-case', () => {
            test('then should use UserRepository to get all users', async () => {
                const result = await useCaseInstance.execute();
                expect(result).toEqual(usersMock);
                expect(userRepositoryMock.getAll).toHaveBeenCalled();
            });
        });
    });
});
