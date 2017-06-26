export interface IAction {
    action(): void;
    label: string;
}

export interface IModal {
    open(): Promise<void>;
}

export interface IMessage {
    message: string;
}

export class Message {
    private _messages: Array<IMessage>;

    add(message: IMessage): void {
        this._messages.push(message);
    };
}
