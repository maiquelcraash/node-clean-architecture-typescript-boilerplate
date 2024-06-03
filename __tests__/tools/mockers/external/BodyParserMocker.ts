import { BaseMocker } from '../BaseMocker.js';
import { IMock } from '../IMock.js';

class BodyParserMock extends BaseMocker implements IMock {
    constructor() {
        super();
        this.fn = {
            json: jest.fn(),
            urlencoded: jest.fn(),
        };
    }

    /**
     * @override
     */
    mock(): void {
        jest.mock('body-parser', () => {
            return {
                json: this.fn.json,
                urlencoded: this.fn.urlencoded,
            };
        });
    }
}

const bodyParserMock = new BodyParserMock();
bodyParserMock.mock();
export default bodyParserMock;
