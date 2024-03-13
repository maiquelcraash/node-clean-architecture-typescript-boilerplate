import { dependencyMap } from '../../../../src/infrastructure/DependencyMap.js';

describe('infrastructure > DependencyMap', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('When importing dependency map', () => {
        test('then should match snapshot', () => {
            expect(Object.fromEntries(dependencyMap)).toMatchSnapshot();
        });
    });
});
