import { IAdapter } from '../../interface-adapters/ports/IAdapter.js';
import { IDependencyInjection } from '../../interface-adapters/ports/IDependencyInjection.js';
import { IPort } from '../../interface-adapters/ports/IPort.js';

export class DependencyInjection extends IDependencyInjection implements IAdapter {
    _dependencyMapping: Map<IPort, IAdapter>;

    /**
     * @param {Map} dependencyMapping
     */
    constructor(dependencyMapping: Map<IPort, IAdapter>) {
        super();
        this._dependencyMapping = dependencyMapping;
    }

    /**
     * Resolves an adapter for the given port
     * @param {IPort} port - The port for which to resolve the adapter.
     * @returns {new () => IAdapter} - The resolved adapter constructor.
     * @throws {Error} - If no adapter is found for the given port.
     */
    resolveConstructor<Type>(port: IPort): new () => Type {
        const adapter = this._resolve(port);
        return adapter as new () => Type;
    }

    /**
     * Resolves the adapter for the given port.
     * @param {IPort} port - The port to resolve the adapter for.
     * @returns {Type} - The resolved adapter static class.
     * @throws {Error} - If no adapter is found for the port.
     */
    resolveStatic<Type>(port: IPort): Type {
        const adapter = this._resolve(port);
        return adapter as Type;
    }

    private _resolve(port: IPort): IAdapter {
        const adapter = this._dependencyMapping.get(port);
        if (!adapter) throw new Error(`No adapter found for port ${port}`);
        return adapter;
    }
}
