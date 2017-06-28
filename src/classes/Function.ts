import { InterfaceMethodDefinition } from 'ts-type-info';
import { ValueGenerator } from '../interfaces/ValueGenerator';
import { BaseType } from './BaseType';
import { Type } from './Type';

export class FunctionType implements ValueGenerator {
    public returnType: BaseType;

    constructor(type: InterfaceMethodDefinition) {
        this.returnType = Type.fromTypeDef(type.returnType);
    }

    public generateValue(): () => any {
        return (): any => this.returnType.generateValue();
    }
}
