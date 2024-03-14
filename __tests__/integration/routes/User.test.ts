import { TestWebContainer } from '../../tools/TestWebContainer.js';

describe('greeter function', () => {
    const testContainer = new TestWebContainer();

    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    describe('/user', () => {
        describe('GET /', () => {
            test('then should retrieve correct data', async () => {
                const res = await testContainer.request.get('/user');
                expect(res.headers['content-type']).toMatch(/json/);
                expect(res.status).toBe(200);
                expect(res.body).toEqual([
                    {
                        'id': 1,
                        'name': 'John Doe',
                        'phone': 999999888,
                        'username': 'johndoe9999',
                    },
                    {
                        'id': 2,
                        'name': 'Marie Foe',
                        'phone': 999888777,
                        'username': 'mariefoe8888',
                    },
                    {
                        'id': 3,
                        'name': 'Felix Montero',
                        'phone': 999999888,
                        'username': '123felixblabla',
                    },
                    {
                        'id': 4,
                        'name': 'Jair Bolsonaro',
                        'phone': 666666666,
                        'username': 'pior_presidente_da_história',
                    },
                    {
                        'id': 5,
                        'name': 'Max Ticson',
                        'phone': 123456789,
                        'username': 'best_max03',
                    },
                ]);
            });
        });
    });
});
