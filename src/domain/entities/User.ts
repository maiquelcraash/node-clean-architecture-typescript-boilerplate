import { UserDTO } from '../DTOs/UserDTO.js';
import { IEntity } from '../ports/IEntity.js';

export class User implements IEntity {
    private id: number;
    private name: string;
    private lastname: string;
    private username: string;
    private password: string;
    private phone: number;
    private created: Date;

    constructor(userData: UserDTO) {
        this.id = userData.id;
        this.name = userData.name;
        this.lastname = userData.lastname;
        this.username = userData.username;
        this.password = userData.password;
        this.phone = userData.phone;
        this.created = userData.created;
    }

    toDTO(): UserDTO {
        return {
            id: this.id,
            name: this.name,
            lastname: this.lastname,
            username: this.username,
            password: this.password,
            phone: this.phone,
            created: this.created,
        };
    }
}
