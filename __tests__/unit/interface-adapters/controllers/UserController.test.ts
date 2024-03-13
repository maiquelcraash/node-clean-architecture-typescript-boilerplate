import { User } from '../../../../src/domain/entities/User.js';
import { IUseCase } from '../../../../src/domain/ports/IUseCase.js';
import {
    UserController,
    UserControllerOptions,
} from '../../../../src/interface-adapters/controllers/UserController.js';
import { IPresenter } from '../../../../src/interface-adapters/ports/IPresenter.js';

describe('interface-adapters > controllers > UserController', () => {
    let mockControllerOptions: UserControllerOptions, mockGetAllUsersUseCase: IUseCase, mockPresenter: IPresenter,
        instance: UserController;

    const mockUsers: User[] = [
        new User({
            name: 'mock-user1',
            lastname: 'last name',
            id: 1,
            created: new Date(),
            phone: 12123,
            password: 'pass',
            username: 'username',
        }),
        new User({
            name: 'mock-user2',
            lastname: 'last name',
            id: 2,
            created: new Date(),
            phone: 4444,
            password: 'pass',
            username: 'username',
        }),
    ];

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        mockGetAllUsersUseCase = {
            execute: jest.fn().mockResolvedValue(mockUsers),
        };

        // @ts-expect-error mock does not implement hte hole IPresenter
        mockPresenter = {
            toPresentJSON: jest.fn().mockReturnValue({
                users: 'mocked-JSON-presented-users',
            }),
        };

        mockControllerOptions = {
            getAllUsersUseCase: mockGetAllUsersUseCase,
            userPresenter: mockPresenter,
        };
    });

    describe('constructor', () => {
        beforeEach(() => {
            instance = new UserController(mockControllerOptions);
        });

        describe('When creating a controller instance', () => {
            test('then it should instantiate internal properties correctly', () => {
                expect(instance['_getAllUsersUseCase']).toEqual(mockGetAllUsersUseCase);
                expect(instance['_userPresenter']).toEqual(mockPresenter);
            });
        });
    });

    describe('getAllUsers', () => {
        let mockRes: { json: jest.Mock };

        beforeEach(() => {
            mockRes = { json: jest.fn() };
        });

        describe('When successfully getting all users', () => {
            beforeEach(async () => {
                instance = new UserController(mockControllerOptions);
                // @ts-expect-error injecting fake req/res
                await instance.getAllUsers('mock-req', mockRes);
            });

            test('then should execute GetAllUsersUseCase', () => {
                expect(mockGetAllUsersUseCase.execute).toHaveBeenCalled();
            });

            test('then should respond a json using UserPresenter', () => {
                expect(mockPresenter.toPresentJSON).toHaveBeenCalledWith(mockUsers);
                expect(mockPresenter.toPresentJSON).toHaveBeenCalledAfter(mockGetAllUsersUseCase.execute as jest.Mock);
                expect(mockRes.json).toHaveBeenCalledWith({ 'users': 'mocked-JSON-presented-users' });
                expect(mockRes.json).toHaveBeenCalledAfter(mockPresenter.toPresentJSON as jest.Mock);
            });
        });

        describe('When it fails to get all users', () => {
            beforeEach(() => {
                mockGetAllUsersUseCase.execute = jest.fn().mockRejectedValue('mock-get-all-users-error');
                instance = new UserController(mockControllerOptions);
            });

            test('then should throw error and not respond request', async () => {
                // @ts-expect-error injecting fake req/res
                await expect(instance.getAllUsers('mock-req', mockRes)).rejects.toEqual('mock-get-all-users-error');
                expect(mockPresenter.toPresentJSON).not.toHaveBeenCalled();
                expect(mockRes.json).not.toHaveBeenCalled();
            });
        });
    });
});
