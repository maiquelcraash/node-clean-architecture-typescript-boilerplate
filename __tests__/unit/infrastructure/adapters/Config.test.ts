import { Config } from '../../../../src/infrastructure/adapters/Config.js';

describe('infrastructure > adapters > Config', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('When importing config', () => {
        // just testing avoid accidental changing of config
        test('then should match snapshot', () => {
            expect({...Config}).toMatchSnapshot();
        });
    });
});
