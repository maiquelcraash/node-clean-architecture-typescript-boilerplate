import { IPort } from './IPort.js';

export abstract class IDependencyInjection extends IPort {
    abstract resolveConstructor<Type>(port: IPort): new () => Type;
    abstract resolveStatic<Type>(port: IPort): Type;
}
