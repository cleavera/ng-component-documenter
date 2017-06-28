export class NotAComponentError extends Error {
    constructor(className: string) {
        super(`${className} is not a component`);
    }
}
