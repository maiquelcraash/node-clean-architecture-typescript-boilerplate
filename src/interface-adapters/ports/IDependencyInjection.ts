import { IPort } from './IPort.js';
import { IRepository } from '../../domain/ports/repositories/IRepository.js';

export abstract class IDependencyInjection extends IPort {
    abstract resolveAdapterConstructor<Type>(port: IPort): new () => Type;
    abstract resolveAdapterStatic<Type>(port: IPort): Type;
    abstract resolveRepository<Type>(repositoryAbstract: IRepository): Type;
}
