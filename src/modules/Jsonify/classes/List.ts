import { Dict } from '../../../interfaces';

import { Serializable } from '../interfaces/Serializable';

import { Item } from './Item';

export class List implements Serializable {
    public type: string;
    public relationships: Dict<Serializable>;
    public data: Array<Item>;

    constructor(type: string) {
        this.type = type;
        this.data = [];
        this.relationships = {};
    }

    public addData(item: Item): void {
        this.data.push(item);
    }

    public addRelationship(name: string, item: Serializable): void {
        this.relationships[name] = item;
    }

    public serialize(): string {
        return JSON.stringify(this);
    }
}
