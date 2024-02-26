export interface IPresenter {
    /**
     * Converts an array of User objects to JSON format.
     * Use this method to present the data in correct shape
     * @param {unknown} data - An array of User objects to be converted.
     * @return {object} - The converted JSON object.
     */
    toPresentJSON(data: unknown): object;

    /**
     * Converts the given data into HTML for presentation.
     * Useful for Server Side Rendering
     * @param {unknown} data - The data to be converted into HTML.
     * @returns {string} - The HTML string representing the data.
     */
    toPresentHTML(data: unknown): string;

    toPresentXML(data: unknown): string;

    toPresentText(data: unknown): string;
}
