import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IAction, IModal, Message } from './interfaces';

@Component({
    selector: 'my-component',
    template: `
        <section>
            <h1>My component</h1>
            
            <p>Hello world</p>
        </section>    
    `
})
export class MyComponent implements OnInit {
    @Input()
    public action: IAction;

    @Input()
    public actions: Array<IAction>;

    @Input()
    public complexArray: [string, number, any];

    @Input('anInput')
    public input: any;

    @Input()
    public stringInput: string;

    @Input()
    public multiStringInput: Array<string>;

    @Input()
    public set myProperty(value: string) {
        this._myProperty = value;
    }

    @Output()
    public output: EventEmitter<void>;

    @Output('anOutput')
    public outputAction: EventEmitter<IAction>;

    public property: string;

    private _modal: IModal;
    private _messages: Message;
    private _myProperty: string;

    constructor(@Inject('myService') modal: IModal, message: Message) {
        this._modal = modal;
        this._messages = message;
    }

    public ngOnInit(): void {
        this._messages.add(this.input);
    }
}
