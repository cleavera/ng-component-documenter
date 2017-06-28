import { TypeDefinition } from 'ts-type-info';

import { BaseType } from './BaseType';

export class BooleanType extends BaseType {
    public generateValue(): boolean {
        return true;
    }

    public static isType(type: TypeDefinition): boolean {
        return type.text === 'boolean';
    }
}
