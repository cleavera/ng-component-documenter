import { BaseType } from './BaseType';
import { TypeDefinition } from 'ts-type-info';

export class StringType extends BaseType {
    public generateValue(): string {
        return 'String value';
    }

    public static isType(type: TypeDefinition): boolean {
        return type.text === 'string';
    }
}
