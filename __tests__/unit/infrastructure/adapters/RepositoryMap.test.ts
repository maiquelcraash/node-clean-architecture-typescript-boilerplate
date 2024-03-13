import { repositoryMap } from '../../../../src/infrastructure/RepositoryMap.js';

describe('infrastructure > RepositoryMap', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('When importing repository map', () => {
        test('then should match snapshot', () => {
            expect(Object.fromEntries(repositoryMap)).toMatchSnapshot();
        });
    });
});
