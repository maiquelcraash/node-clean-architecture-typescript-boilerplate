import { IAdapter } from '../../domain/ports/IAdapter.js';
import { IPort } from '../../domain/ports/IPort.js';
import { IRepository } from '../../domain/ports/repositories/IRepository.js';

export abstract class IDependencyInjection extends IPort {
    abstract resolveAdapterConstructor<Type extends IAdapter>(port: IPort): new () => Type;
    abstract resolveAdapterStatic<Type extends IAdapter>(port: IPort): Type;
    abstract resolveRepository<Type extends IRepository>(repositoryAbstract: IRepository): Type;
}
