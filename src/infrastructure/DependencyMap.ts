import { Config } from './adapters/Config.js'
import { Router } from './adapters/http-server/Router.js';
import { IAdapter } from '../domain/ports/IAdapter.js';
import { IPort } from '../domain/ports/IPort.js';
import { IRouter } from '../interface-adapters/ports/http-server/IRouter.js';
import { IConfig } from '../interface-adapters/ports/IConfig.js';

export const dependencyMap: Map<IPort, IAdapter> = new Map([
    [IConfig as IPort, Config as IAdapter],
    [IRouter as IPort, Router as IAdapter],
]);
