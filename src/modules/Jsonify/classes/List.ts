import { isFunction, isNull, isUndefined } from 'lodash';

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
        let out: string = '{';

        Object.keys(this).forEach((key: string) => {
            if (isFunction(this[key]) || isNull(this[key]) || isUndefined(this[key])) {
                return;
            }

            if (isFunction(this[key].serialize)) {
                out += `"${key}": ${this[key].serialize()},`;
            } else if (key === 'data') {
                out += `"${key}": [`;

                this[key].forEach((datum: Item) => {
                    out += `${datum.serialize()},`;
                });

                out += '],';
            } else {
                out += `"${key}": ${JSON.stringify(this[key])},`;
            }
        });

        out += '}';

        return out.replace(/,]/g, ']');
    }
}
