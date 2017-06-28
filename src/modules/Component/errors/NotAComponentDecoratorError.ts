export class NotAComponentDecoratorError extends Error {
    constructor(name: string) {
        super(`The decorator '${name}' is not a component registration decorator`);
    }
}
