export function Log(...msg: Array<string>): void {
    console.log.apply(console, msg);
}
