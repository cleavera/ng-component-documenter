import { TypeDefinition } from 'ts-type-info';

import { BaseType } from './BaseType';

export class NumberType extends BaseType {
    public generateValue(): number {
        return 3.14159;
    }

    public static isType(type: TypeDefinition): boolean {
        return type.text === 'number';
    }
}
