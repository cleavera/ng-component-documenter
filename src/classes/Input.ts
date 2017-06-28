import { ClassPropertyDefinition, DecoratorDefinition, ExpressionDefinition } from 'ts-type-info';
import { DecoratorNames } from '../const/DecoratorNames';
import { Nullable } from '../interfaces';
import { BaseType } from './BaseType';
import { Type } from './Type';

export class Input {
    public name: string;
    public type: BaseType;

    constructor(property: ClassPropertyDefinition) {
        this.name = Input.getName(property);
        this.type = Type.fromTypeDef(property.type);
        console.log(this.name, this.type.name, this.type.generateValue());
    }

    private static getName(property: ClassPropertyDefinition): string {
        let name: string = property.name;
        const inputDecorator: Nullable<DecoratorDefinition> = this.getInputDecorator(property);

        if (inputDecorator) {
            inputDecorator.arguments.forEach((argument: ExpressionDefinition) => {
                if (argument.text.indexOf('\'') === 0) {
                    name = argument.text.replace(/'/g, '');
                }
            });
        }

        return name;
    }

    private static getInputDecorator(property: ClassPropertyDefinition): Nullable<DecoratorDefinition> {
        let inputDecorator: Nullable<DecoratorDefinition> = null;

        property.decorators.forEach((decorator: DecoratorDefinition) => {
            if (decorator.name === DecoratorNames.INPUT) {
                inputDecorator = decorator;
            }
        });

        return inputDecorator;
    }
}
