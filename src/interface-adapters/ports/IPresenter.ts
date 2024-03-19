import { IPort } from "../../domain/ports/IPort.js";

export abstract class IPresenter extends IPort {
    /**
     * Converts an array of User objects to JSON format.
     * Use this method to present the data in correct shape
     * @param {unknown} data - An array of User objects to be converted.
     * @return {object} - The converted JSON object.
     */
    abstract toPresentJSON(data: unknown): object;

    /**
     * Converts the given data into HTML for presentation.
     * Useful for Server Side Rendering
     * @param {unknown} data - The data to be converted into HTML.
     * @returns {string} - The HTML string representing the data.
     */
    abstract toPresentHTML(data: unknown): string;

    abstract toPresentXML(data: unknown): string;

    abstract toPresentText(data: unknown): string;
}
