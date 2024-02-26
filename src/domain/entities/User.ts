import { BaseEntity } from './BaseEntity.js';
import { UserDTO } from '../DTOs/UserDTO.js';

export class User implements BaseEntity {
    private name: string;
    private lastname: string;
    private username: string;
    private password: string;
    private phone: number;
    private created: Date;

    constructor(userData: UserDTO) {
        this.name = userData.name;
        this.lastname = userData.lastname;
        this.username = userData.username;
        this.password = userData.password;
        this.phone = userData.phone;
        this.created = userData.created;
    }

    toDTO(): UserDTO {
        const result: UserDTO = {
            name: this.name,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            phone: this.phone,
            created: this.created,
        };
        return result;
    }
}
