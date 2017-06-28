import { TypeDefinition } from 'ts-type-info';

export class BaseType {
    public name: string;

    protected constructor(type: TypeDefinition) {
        this.name = type.text;
    }

    public generateValue(): any {
        return null;
    }

    public static isType(type: TypeDefinition): boolean {
        return type === type;
    }
}