import { User } from '../../../../../src/domain/entities/User.js';
import { UserRepository } from '../../../../../src/infrastructure/adapters/repositories/UserRepository.js';
import { UserDAO } from '../../../../../src/infrastructure/DAO/UserDAO.js';
import { DatabaseFactory } from '../../../../../src/infrastructure/factories/DatabaseFactory.js';

describe('infrastructure > adapters > repositories > UserRepository', () => {
    let instance: UserRepository, userDAO: UserDAO;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        userDAO = new UserDAO(DatabaseFactory.getInstance({}));
        userDAO.getUsers = jest.fn().mockReturnValue([
            { id: 1, name: 'mock-user1' },
            { id: 3, name: 'mock-user2' },
        ]);
        instance = new UserRepository(userDAO);
    });

    describe('constructor', () => {
        describe('When instantiating a user repository', () => {
            test('then should add correct DAO object as sub property', () => {
                expect(instance['_userDAO']).toEqual(userDAO);
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
                expect(userDAO.getUsers).toHaveBeenCalled();
            });

            test('then should return list of users', () => {
                expect(result).toBeArray();
                expect(result[0]).toBeInstanceOf(User);
            });
        });
    });
});
