import { UserDTO } from '../../../../../src/domain/DTOs/UserDTO.js';
import { User } from '../../../../../src/domain/entities/User.js';
import { UserRepository } from '../../../../../src/infrastructure/adapters/repositories/UserRepository.js';

describe('infrastructure > adapters > repositories > UserRepository', () => {
    let instance: UserRepository, DBMock: { getUsers(): Promise<UserDTO[]> }, getUsersMock: jest.Mock;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        getUsersMock = jest.fn().mockReturnValue([
            { id: 1, name: 'mock-user1' },
            { id: 3, name: 'mock-user2' },
        ]);
        DBMock = { getUsers: getUsersMock };
        instance = new UserRepository(DBMock);
    });

    describe('constructor', () => {
        describe('When instantiating a user repository', () => {
            test('then should add correct DAO object as sub property', () => {
                expect(instance['_mockedDB']).toEqual(DBMock);
            });
        });
    });

    describe('getAll', () => {
        describe('When getting all users', () => {
            let result: User[];
            beforeEach(async () => {
                result = await instance.getAll();
            });

            test('then should execute DAO\'s getUsers function', () => {
                expect(instance['_mockedDB'].getUsers).toHaveBeenCalled();
            });

            test('then should return list of users', () => {
                expect(result).toBeArray();
                expect(result[0]).toBeInstanceOf(User);
            });
        });
    });
});
