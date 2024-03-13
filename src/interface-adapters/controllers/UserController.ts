import { IUseCase } from '../../domain/ports/IUseCase.js';
import { GetAllUsersUseCase } from '../../domain/use-cases/GetAllUsersUseCase.js';
import { IRequest } from '../ports/http-server/IRequest.js';
import { IResponse } from '../ports/http-server/IResponse.js';
import { IPresenter } from '../ports/IPresenter.js';

export type UserControllerOptions = {
    getAllUsersUseCase: GetAllUsersUseCase | IUseCase,
    userPresenter: IPresenter
}

export class UserController {
    private _getAllUsersUseCase: GetAllUsersUseCase | IUseCase;
    private _userPresenter: IPresenter;

    constructor({ getAllUsersUseCase, userPresenter }: UserControllerOptions) {
        this._getAllUsersUseCase = getAllUsersUseCase;
        this._userPresenter = userPresenter;
    }

    async getAllUsers(_req: IRequest, res: IResponse): Promise<void> {
        const users = await this._getAllUsersUseCase.execute();
        res.json(this._userPresenter.toPresentJSON(users));
    }
}
