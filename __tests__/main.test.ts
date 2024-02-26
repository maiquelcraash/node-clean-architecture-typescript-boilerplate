describe('greeter function', () => {
    afterEach(() => {
        jest.clearAllMocks();
        jest.restoreAllMocks();
    });

    beforeEach(() => {
        //
    });

    describe('functionName', () => {
        describe('When', () => {
            test('then should', () => {
                expect(1).toBe(1);
            });
        });
    });
});
