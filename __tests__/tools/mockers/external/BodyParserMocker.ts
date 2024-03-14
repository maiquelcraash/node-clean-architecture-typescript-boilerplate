import { IMock } from '../IMock.js';

class BodyParserMock implements IMock {
    public fn: { json: jest.Mock, urlencoded: jest.Mock, };

    constructor() {
        this.fn = {
            json: jest.fn(),
            urlencoded: jest.fn(),
        };
    }

    mock(): void {
        jest.mock('body-parser', () => {
            return {
                json: this.fn.json,
                urlencoded: this.fn.urlencoded,
            };
        });
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

const bodyParserMock = new BodyParserMock();
bodyParserMock.mock();
export default bodyParserMock;
