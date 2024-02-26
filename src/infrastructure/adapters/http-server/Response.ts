import { URL } from 'node:url';

import express from 'express';

import { IResponse } from '../../../interface-adapters/ports/http-server/IResponse.js';

export class Response extends IResponse {
    private _rawResponse: express.Response;

    constructor(rawResponse: express.Response) {
        super();
        this._rawResponse = rawResponse;
    }

    json(data: object): IResponse {
        this._rawResponse.json(data);
        return this;
    }

    redirect(url: string | URL, code: number) {
        const href = url instanceof URL ? url.href : url;
        this._rawResponse.redirect(code, href);
    }

    setHeader(key: string, value: string): IResponse {
        this._rawResponse.setHeader(key, value);
        return this;
    }

    setContentType(value: string): IResponse {
        this._rawResponse.set('Content-type', value);
        return this;
    }

    status(code: number): IResponse {
        this._rawResponse.status(code);
        return this;
    }

    end(): IResponse {
        this._rawResponse.end();
        return this;
    }

    send(content: unknown): IResponse {
        this._rawResponse.send(content);
        return this;
    }
}
