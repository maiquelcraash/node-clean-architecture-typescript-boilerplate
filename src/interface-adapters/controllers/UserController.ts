import { GetAllUsersUseCase } from '../../domain/use-cases/GetAllUsersUseCase.js';
import { IRequest } from '../ports/http-server/IRequest.js';
import { IResponse } from '../ports/http-server/IResponse.js';

export class UserController {
    private _getAllUsersUseCase: GetAllUsersUseCase;

    constructor(getAllUsersUseCase: GetAllUsersUseCase) {
        this._getAllUsersUseCase = getAllUsersUseCase;
    }

    async getAllUsers(_req: IRequest, res: IResponse): Promise<void> {
        const users = await this._getAllUsersUseCase.execute();
        res.json(users);
        return;
    }
}
