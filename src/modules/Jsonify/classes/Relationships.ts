import { isFunction, isNull, isUndefined } from 'lodash';

import { Dict } from '../../../interfaces';

import { Serializable } from '../interfaces';

export class Relationships implements Serializable {
    public relationships: Dict<Serializable>;
    public type: string = 'Relationship';

    constructor() {
        this.relationships = {};
    }

    public add(name: string, value: Serializable): void {
        this.relationships[name] = value;
    }

    public serialize(): string {
        let out: string = '{';

        Object.keys(this.relationships).forEach((key: string) => {
            if (isFunction(this.relationships[key]) || isNull(this.relationships[key]) || isUndefined(this.relationships[key])) {
                return;
            }

            if (isFunction(this.relationships[key].serialize)) {
                out += `"${key}": ${this.relationships[key].serialize()},`;
            } else {
                out += `"${key}": ${JSON.stringify(this.relationships[key])},`;
            }
        });

        out += '}';

        return out;
    }
}
