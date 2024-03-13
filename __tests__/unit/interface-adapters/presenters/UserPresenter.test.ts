import { User } from '../../../../src/domain/entities/User.js';
import { UserPresenter } from '../../../../src/interface-adapters/presenters/UserPresenter.js';

describe('src > interface-adapters > presenters > UserPresenter', () => {
    let instance: UserPresenter;

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
        instance = new UserPresenter();
    });

    describe('toPresentJSON', () => {
        describe('When presenting user as JSON', () => {
            test('then should keep only relevant object shape', () => {
                expect(instance.toPresentJSON(mockUsers)).toEqual([
                    {
                        id: 1,
                        name: 'mock-user1 last name',
                        phone: 12123,
                        username: 'username',
                    },
                    {
                        id: 2,
                        name: 'mock-user2 last name',
                        phone: 4444,
                        username: 'username',
                    },
                ]);
            });
        });
    });

    describe('toPresentHTML', () => {
        test('should throw not implemented', () => {
            expect(() => instance.toPresentHTML('mock-data')).toThrow('Not implemented yet');
        });
    });

    describe('toPresentText', () => {
        test('should throw not implemented', () => {
            expect(() => instance.toPresentText('mock-data')).toThrow('Not implemented yet');
        });
    });

    describe('toPresentXML', () => {
        test('should throw not implemented', () => {
            expect(() => instance.toPresentXML('mock-data')).toThrow('Not implemented yet');
        });
    });
});
