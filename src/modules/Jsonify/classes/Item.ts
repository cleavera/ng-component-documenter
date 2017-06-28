import { Dict, Nullable } from '../../../interfaces';

import { Serializable } from '../interfaces';

export class Item implements Serializable {
    public type: string;
    public id: Nullable<string>;
    public attributes: Dict<any>;
    public relationships: Dict<Serializable>;

    constructor(type: string, id: Nullable<string>, attributes: Dict<any>) {
        this.type = type;
        this.id = id;
        this.attributes = attributes;
        this.relationships = {};
    }

    public addRelationship(name: string, item: Serializable): void {
        this.relationships[name] = item;
    }

    public serialize(): string {
        return JSON.stringify(this);
    }
}
