import {
    InterfaceDefinition, InterfaceMethodDefinition, InterfacePropertyDefinition,
    TypeDefinition
} from 'ts-type-info';
import { Dict, Nullable } from '../interfaces';
import { AnyType } from './Any';
import { ArrayType } from './Array';
import { BaseType } from './BaseType';
import { BooleanType } from './Boolean';
import { NumberType } from './Number';
import { StringType } from './String';
import { FunctionType } from './Function';

export class Type extends BaseType {
    public static NativeTypes: Array<typeof BaseType> = [
        AnyType,
        ArrayType,
        BooleanType,
        NumberType,
        StringType
    ];

    public property: Dict<BaseType>;
    public method: Dict<FunctionType>;

    protected constructor(type: TypeDefinition) {
        super(type);
        this.property = {};
        this.method = {};
        this.parseInterface(type);
    }

    public generateValue(): any {
        const out: any = {};

        Object.keys(this.property).forEach((propertyName: string) => {
            out[propertyName] = this.property[propertyName].generateValue();
        });

        Object.keys(this.method).forEach((methodName: string) => {
            out[methodName] = this.method[methodName].generateValue();
        });

        return out;
    }

    private parseInterface(type: TypeDefinition): void {
        type.definitions.forEach((interfaceDefinition: InterfaceDefinition) => {
            interfaceDefinition.properties.forEach((property: InterfacePropertyDefinition) => {
                this.property[property.name] = Type.fromTypeDef(property.type);
            });

            interfaceDefinition.methods.forEach((method: InterfaceMethodDefinition) => {
                this.method[method.name] = new FunctionType(method);
            });
        });
    }

    public static fromTypeDef(type: TypeDefinition): BaseType {
        let out: Nullable<BaseType> = null;

        this.NativeTypes.forEach((NativeType: typeof BaseType): void => {
            if (NativeType.isType(type)) {
                out = new NativeType(type);
            }
        });

        if (!out) {
            out = new Type(type);
        }

        return out;
    }
}
