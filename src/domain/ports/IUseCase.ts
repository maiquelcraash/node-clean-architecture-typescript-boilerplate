import { IPort } from "./IPort.js";

export interface IUseCase extends IPort {
    execute(): unknown
}
