import { BaseType } from './BaseType';
import { TypeDefinition } from 'ts-type-info';

export class NumberType extends BaseType {
    public generateValue(): number {
        return 3.14159;
    }

    public static isType(type: TypeDefinition): boolean {
        return type.text === 'number';
    }
}
