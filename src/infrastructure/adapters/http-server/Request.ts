import express from 'express';

import { IAdapter } from '../../../domain/ports/IAdapter.js';
import { IRequest } from '../../../interface-adapters/ports/http-server/IRequest.js';

export class Request extends IRequest implements IAdapter {
    private _rawRequest: express.Request;

    constructor(rawRequest: express.Request) {
        super();
        this._rawRequest = rawRequest;
    }

    getParams(): Record<string, unknown> {
        return this._rawRequest.params;
    }

    getBody(): Record<string, unknown> {
        return this._rawRequest.body;
    }

    getQuery(): Record<string, unknown> {
        return this._rawRequest.query;
    }

    getMethod(): string {
        return this._rawRequest.method;
    }

    getIp(): string | undefined {
        return this._rawRequest.ip;
    }
}
