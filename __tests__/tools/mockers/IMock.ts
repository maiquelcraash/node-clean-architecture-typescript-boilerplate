export interface IMock {
    /**
     * Mock the dependency
     * @return {void}
     */
    mock(): void;

    /**
     * Resets the mock
     * @return {void}
     */
    reset(): void;
}
