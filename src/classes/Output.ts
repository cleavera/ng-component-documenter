import { ClassPropertyDefinition, DecoratorDefinition, ExpressionDefinition } from 'ts-type-info';
import { Nullable } from '../interfaces/Nullable';
import { DecoratorNames } from '../const/DecoratorNames';

export class Output {
    public name: string;

    constructor(property: ClassPropertyDefinition) {
        this.name = Output.getName(property);
    }

    private static getName(property: ClassPropertyDefinition): string {
        let name: string = property.name;
        let inputDecorator: Nullable<DecoratorDefinition> = this.getInputDecorator(property);

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
        let inputDecorator: DecoratorDefinition;

        property.decorators.forEach((decorator: DecoratorDefinition) => {
            if (decorator.name === DecoratorNames.OUTPUT) {
                inputDecorator = decorator;
            }
        });

        return inputDecorator;
    }
}
