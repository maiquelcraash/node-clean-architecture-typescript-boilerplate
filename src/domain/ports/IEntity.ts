import { IPort } from "./IPort.js";

export interface IEntity extends IPort {
    toDTO(): object
}
