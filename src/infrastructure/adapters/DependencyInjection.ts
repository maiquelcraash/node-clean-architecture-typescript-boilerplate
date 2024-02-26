import { IRepository } from '../../domain/ports/repositories/IRepository.js';
import { IAdapter } from '../../interface-adapters/ports/IAdapter.js';
import { IDependencyInjection } from '../../interface-adapters/ports/IDependencyInjection.js';
import { IPort } from '../../interface-adapters/ports/IPort.js';

export class DependencyInjection extends IDependencyInjection implements IAdapter {
    private _dependencyMapping: Map<IPort, IAdapter>;
    private _repositoryMapping: Map<IRepository, IRepository>;

    /**
     * @param {Map<IPort, IAdapter>} dependencyMapping
     * @param {Map<IRepository, IRepository>} repositoryMapping
     */
    constructor(dependencyMapping: Map<IPort, IAdapter>, repositoryMapping: Map<IRepository, IRepository>) {
        super();
        this._dependencyMapping = dependencyMapping;
        this._repositoryMapping = repositoryMapping;
    }

    /**
     * Resolves an adapter for the given port
     * @param {IPort} port - The port for which to resolve the adapter.
     * @returns {new () => IAdapter} - The resolved adapter constructor.
     * @throws {Error} - If no adapter is found for the given port.
     */
    resolveAdapterConstructor<Type>(port: IPort): new () => Type {
        const adapter = this._resolveAdapter(port);
        return adapter as new () => Type;
    }

    /**
     * Resolves the adapter for the given port.
     * @param {IPort} port - The port to resolve the adapter for.
     * @returns {Type} - The resolved adapter static class.
     * @throws {Error} - If no adapter is found for the port.
     */
    resolveAdapterStatic<Type>(port: IPort): Type {
        const adapter = this._resolveAdapter(port);
        return adapter as Type;
    }

    /**
     * Resolves the concrete repository implementation for the given abstract repository.
     * @param {IRepository} repositoryAbstract - The abstract repository to resolve.
     * @return {Type} - The concrete repository implementation.
     */
    resolveRepository<Type>(repositoryAbstract: IRepository): Type {
        const concreteRepository = this._resolveRepository(repositoryAbstract);
        return concreteRepository as Type;
    }

    private _resolveAdapter(port: IPort): IAdapter {
        const adapter = this._dependencyMapping.get(port);
        if (!adapter) throw new Error(`No adapter found for port ${port}`);
        return adapter;
    }

    private _resolveRepository(repoAbstract: IRepository): IRepository {
        const concreteRepository = this._repositoryMapping.get(repoAbstract);
        if (!concreteRepository) throw new Error(`No repository found for ${repoAbstract}`);
        return concreteRepository;
    }
}
