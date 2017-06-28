import { ClassPropertyDefinition, DecoratorDefinition, ExpressionDefinition } from 'ts-type-info';

import { Nullable } from '../../../interfaces';

import { BaseType, Type } from '../../Type';

import { DecoratorNames } from '../constants';

export class Input {
    public name: string;
    public type: BaseType;

    constructor(property: ClassPropertyDefinition) {
        this.name = Input.getName(property);
        this.type = Type.fromTypeDef(property.type);
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
