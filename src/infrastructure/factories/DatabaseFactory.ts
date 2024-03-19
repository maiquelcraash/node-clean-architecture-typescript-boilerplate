import { IDatabase } from '../../interface-adapters/ports/IDatabase.js';

let instance: FakeDB | undefined = undefined;

export class DatabaseFactory {
    static getInstance(options: object): IDatabase {
        if (!instance) {
            instance = new FakeDB(options);
        }

        return instance;
    }
}

class FakeDB extends IDatabase {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(_options: object) {
        super();
    }
};
