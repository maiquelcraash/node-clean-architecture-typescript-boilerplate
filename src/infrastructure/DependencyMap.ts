import { Config } from './adapters/Config.js'
import { Router } from './adapters/http-server/Router.js';
import { IRouter } from '../interface-adapters/ports/http-server/IRouter.js';
import { IAdapter } from '../interface-adapters/ports/IAdapter.js';
import { IConfig } from '../interface-adapters/ports/IConfig.js';
import { IPort } from '../interface-adapters/ports/IPort.js';

export const dependencyMap: Map<IPort, IAdapter> = new Map([
    [IConfig, Config],
    [IRouter as IPort, Router as IAdapter],
]);
