import { isFunction, isNull, isUndefined } from 'lodash';

import { Dict, Nullable } from '../../../interfaces';

import { Serializable } from '../interfaces';

import { Relationships } from './Relationships';

export class Item implements Serializable {
    public type: string;
    public id: Nullable<string>;
    public attributes: Dict<any>;
    public relationships: Relationships;

    constructor(type: string, id: Nullable<string>, attributes: Dict<any>) {
        this.type = type;
        this.id = id;
        this.attributes = attributes;
        this.relationships = new Relationships();
    }

    public addRelationship(name: string, item: Serializable): void {
        this.relationships.add(name, item);
    }

    public serialize(): string {
        let out: string = '{';

        Object.keys(this).forEach((key: string) => {
            if (isFunction(this[key]) || isNull(this[key]) || isUndefined(this[key])) {
                return;
            }

            if (isFunction(this[key].serialize)) {
                out += `"${key}": ${this[key].serialize()},`;
            } else {
                out += `"${key}": ${JSON.stringify(this[key])},`;
            }
        });

        out += '}';

        return out.replace(/,}/g, '}');
    }
}
