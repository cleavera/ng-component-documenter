export interface IAction {
    label: string;
    action(): void;
}

export interface IModal {
    open(): Promise<void>;
}

export interface IMessage {
    message: string;
}

export class Message {
    private _messages: Array<IMessage>;

    public add(message: IMessage): void {
        this._messages.push(message);
    };

    public get(): Array<IMessage> {
        return this._messages;
    }
}
