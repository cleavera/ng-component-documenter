import { TypeDefinition } from 'ts-type-info';

import { ValueGenerator } from '../interfaces';

export class BaseType implements ValueGenerator {
    public name: string;
    public example: any;

    protected constructor(type: TypeDefinition) {
        this.name = type.text;
        this.example = JSON.stringify(this.generateValue());
    }

    public generateValue(): any {
        return null;
    }

    public static isType(type: TypeDefinition): boolean {
        return type === type;
    }
}