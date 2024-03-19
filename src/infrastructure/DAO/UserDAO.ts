import { UserDTO } from '../../domain/DTOs/UserDTO.js';
import { IDatabase } from '../../interface-adapters/ports/IDatabase.js';

export class UserDAO {
    // @ts-expect-error rather than use a real DB, we'll use mocked data
    private _db: IDatabase;
    constructor(db: IDatabase) {
        this._db = db;
    }

    async getUsers(): Promise<Array<UserDTO>> {
        return [
            {
                id: 1,
                name: 'John',
                lastname: 'Doe',
                username: 'johndoe9999',
                password: 'randompassword123',
                phone: 999999888,
                created: new Date('2024-03-24'),
            },
            {
                id: 2,
                name: 'Marie',
                lastname: 'Foe',
                username: 'mariefoe8888',
                password: 'randompassword321',
                phone: 999888777,
                created: new Date('2023-09-01'),
            },
            {
                id: 3,
                name: 'Felix',
                lastname: 'Montero',
                username: '123felixblabla',
                password: 'passissomethingsecret',
                phone: 999999888,
                created: new Date('2022-03-17'),
            },
            {
                id: 4,
                name: 'Jair',
                lastname: 'Bolsonaro',
                username: 'pior_presidente_da_história',
                password: 'matou700k',
                phone: 666666666,
                created: new Date('2018-10-30'),
            },
            {
                id: 5,
                name: 'Max',
                lastname: 'Ticson',
                username: 'best_max03',
                password: 'randompassABCD',
                phone: 123456789,
                created: new Date('2024-01-06'),
            },
        ];
    }
}
