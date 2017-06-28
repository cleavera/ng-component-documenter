import { TypeDefinition } from 'ts-type-info';
import { BaseType } from './BaseType';

export class AnyType extends BaseType {
    public generateValue(): string {
        return 'Any value';
    }

    public static isType(type: TypeDefinition): boolean {
        return type.text === 'any';
    }
}
