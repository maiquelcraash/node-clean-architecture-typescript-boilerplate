import { User } from '../../domain/entities/User.js';
import { IPresenter } from '../ports/IPresenter.js';

export class UserPresenter implements IPresenter {
    /**
     * In this example we are using the presenter to format the response as needed by the client
     */
    toPresentJSON(data: User[]): object {
        return data.map((user) => {
            const userDTO = user.toDTO();
            return {
                id: userDTO.id,
                name: `${userDTO.name} ${userDTO.lastname}`,
                username: userDTO.username,
                phone: userDTO.phone,
            };
        });
    }

    /**
     * Converts the given data into a HTML string for presentation.
     * Useful for Server Side Rendering
     * @param {unknown} _data - The data to be converted into HTML.
     * @returns {string} - The HTML string representing the data.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toPresentHTML(_data: unknown): string {
        throw 'Not implemented yet';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toPresentText(_data: unknown): string {
        throw 'Not implemented yet';
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toPresentXML(_data: unknown): string {
        throw 'Not implemented yet';
    }
}
