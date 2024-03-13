import { UserDTO } from '../../../../src/domain/DTOs/UserDTO.js';
import { User } from '../../../../src/domain/entities/User.js';

describe('domain > entities > User', () => {
    let instance: User;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    const mockUserDTOData: UserDTO = {
        id: 111,
        name: 'mocked-name',
        lastname: 'mocked-lastname',
        username: 'mocked-username',
        phone: 999888777,
        password: 'mocked-pass',
        created: new Date(),
    };

    beforeEach(() => {
        instance = new User(mockUserDTOData);
    });

    describe('toDTO', () => {
        describe('When getting DTO for User instance', () => {
            test('then it should correct entity serialized data', () => {
                const result: UserDTO = instance.toDTO();
                expect(result).toBeObject();
                expect(result.id).toBe(mockUserDTOData.id);
                expect(result.name).toBe(mockUserDTOData.name);
                expect(result.username).toBe(mockUserDTOData.username);
                expect(result.phone).toBe(mockUserDTOData.phone);
                expect(result.created).toBeDate();
            });
        });
    });
});
