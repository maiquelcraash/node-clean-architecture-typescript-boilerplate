import { IAdapter } from '../../../../src/domain/ports/IAdapter.js';
import { DependencyInjection } from '../../../../src/infrastructure/adapters/DependencyInjection.js';

describe('infrastructure > adapters > DependencyInjection', () => {
    class mockAdapter1Static implements IAdapter {
        static test = 'mock';
    };

    class mockAdapter2 implements IAdapter {
    };

    class mockAdapter3 implements IAdapter {
    };

    const mockDependencyMap = new Map([
        ['dep1-port', mockAdapter1Static],
        ['dep2-port', mockAdapter2],
        ['dep3-port', mockAdapter3],
    ]);

    const mockRepositoryMap = new Map([
        ['rep1-port', 'rep1-adapter'],
        ['rep2-port', 'rep2-adapter'],
        ['rep3-port', 'rep3-adapter'],
    ]);

    let instance: DependencyInjection;

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        instance = new DependencyInjection(mockDependencyMap, mockRepositoryMap);
    });

    describe('constructor', () => {
        describe('When building an instance', () => {
            test('then should add mappings as internal props', () => {
                expect(instance['_dependencyMapping']).toEqual(mockDependencyMap);
                expect(instance['_repositoryMapping']).toEqual(mockRepositoryMap);
            });
        });
    });

    describe('resolveAdapterConstructor', () => {
        describe('When resolving the adapter for a constructor class', () => {
            test('then should return the adapter as constructor', () => {
                const adapter = instance.resolveAdapterConstructor<mockAdapter2>('dep2-port');
                expect(adapter).toEqual(mockAdapter2);
            });
        });

        describe('When trying to resolve invalid adapter', () => {
            test('then should throw error', () => {
                expect(() => instance.resolveAdapterConstructor('invalid')).toThrow('No adapter found for port invalid');
            });
        });
    });

    describe('resolveAdapterStatic', () => {
        describe('When resolving the adapter for a static class', () => {
            test('then should return the adapter as static', () => {
                const adapter = instance.resolveAdapterStatic<mockAdapter1Static>('dep1-port');
                expect(adapter).toEqual(mockAdapter1Static);
                // @ts-expect-error static mock prop
                expect(adapter.test).toEqual('mock');
            });
        });

        describe('When trying to resolve invalid adapter', () => {
            test('then should throw error', () => {
                expect(() => instance.resolveAdapterStatic('invalid')).toThrow('No adapter found for port invalid');
            });
        });
    });

    describe('resolveRepository', () => {
        describe('When resolving the adapter for a repository', () => {
            test('then should return the adapter', () => {
                const adapter = instance.resolveRepository('rep1-port');
                expect(adapter).toEqual('rep1-adapter');
            });
        });

        describe('When trying to resolve invalid adapter', () => {
            test('then should throw error', () => {
                expect(() => instance.resolveRepository('invalid')).toThrow('No repository adapter found for port invalid');
            });
        });
    });
});
