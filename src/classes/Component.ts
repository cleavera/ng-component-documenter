import { ClassDefinition, ClassPropertyDefinition, DecoratorDefinition } from 'ts-type-info';
import { DecoratorNames } from '../const/DecoratorNames';
import { Input } from './Input';
import { Output } from './Output';

export class Component {
    public inputs: Array<Input>;
    public outputs: Array<Output>;

    protected constructor(element: ClassDefinition) {
        this.inputs = [];
        this.outputs = [];

        this.parseAPI(element.properties);
    }

    private parseAPI(properties: Array<ClassPropertyDefinition>) {
        properties.forEach((property: ClassPropertyDefinition) => {
            if (Component.hasInputDecorator(property)) {
                this.inputs.push(new Input(property));
            }

            if (Component.hasOutputDecorator(property)) {
                this.outputs.push(new Output(property));
            }
        });
    }

    public static fromClass(element: ClassDefinition): Component {
        return new Component(element);
    }

    public static isComponent(element: ClassDefinition): boolean {
        let hasComponentDecorator: boolean = false;

        element.decorators.forEach((decorator: DecoratorDefinition) => {
            if (decorator.name === DecoratorNames.COMPONENT) {
                hasComponentDecorator = true;
            }
        });

        return hasComponentDecorator;
    }

    private static hasInputDecorator(property: ClassPropertyDefinition): boolean {
        let hasInputDecorator: boolean = false;

        property.decorators.forEach((decorator: DecoratorDefinition) => {
            if (decorator.name === DecoratorNames.INPUT) {
                hasInputDecorator = true;
            }
        });

        return hasInputDecorator;
    }

    private static hasOutputDecorator(property: ClassPropertyDefinition): boolean {
        let hasOutputDecorator: boolean = false;

        property.decorators.forEach((decorator: DecoratorDefinition) => {
            if (decorator.name === DecoratorNames.OUTPUT) {
                hasOutputDecorator = true;
            }
        });

        return hasOutputDecorator;
    }
}
