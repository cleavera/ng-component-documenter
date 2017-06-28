import { TypeDefinition } from 'ts-type-info';

import { BaseType } from './BaseType';
import { Type } from './Type';

export class ArrayType extends BaseType {
    public types: Array<BaseType>;

    constructor(type: TypeDefinition) {
        super(type);

        this.types = [];
        if (type.arrayElementType) {
            this.types.push(Type.fromTypeDef(type.arrayElementType));
        } else {
            type.typeArguments.forEach((arrayItemType: TypeDefinition) => {
                this.types.push(Type.fromTypeDef(arrayItemType));
            });
        }
    }

    public generateValue(): Array<any> {
        const out: Array<any> = [];

        this.types.forEach((type: BaseType) => {
            out.push(type.generateValue());
        });

        return out;
    }

    public static isType(type: TypeDefinition): boolean {
        return type.isArrayType() || type.typeArguments.length > 1;
    }
}
