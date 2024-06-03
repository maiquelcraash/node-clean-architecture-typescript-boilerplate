import { IMock } from './IMock.js';

export class BaseMocker implements IMock {
    public fn: Record<string, jest.Mock>;

    mock(): void {
        throw 'Not Implemented'
    }

    reset(): void {
        let key: keyof typeof this.fn;
        for (key in this.fn) {
            const func = this.fn[key];
            func.mockClear();
            func.mockReset();
        }
    }
}
