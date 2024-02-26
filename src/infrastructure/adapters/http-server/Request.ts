import express from 'express';

import { IRequest } from '../../../interface-adapters/ports/http-server/IRequest.js';

export class Request extends IRequest {
    private _rawRequest: express.Request;

    constructor(rawRequest: express.Request) {
        super();
        this._rawRequest = rawRequest;
    }

    getParams(): object {
        return this._rawRequest.params;
    }

    getBody(): object {
        return this._rawRequest.body;
    }

    getQuery(): object {
        return this._rawRequest.query;
    }

    getMethod(): string {
        return this._rawRequest.method;
    }

    getIp(): string | undefined {
        return this._rawRequest.ip;
    }
}
