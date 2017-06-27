import { ClassDefinition, ClassPropertyDefinition, DecoratorDefinition } from 'ts-type-info';
import { DecoratorNames } from '../const/DecoratorNames';
import { NotAComponentError } from '../errors/NotAComponentError';
import { Input } from './Input';
import { Output } from './Output';
import { Nullable } from '../interfaces/Nullable';

export class Component {
    public inputs: Array<Input>;
    public outputs: Array<Output>;

    protected constructor(element: ClassDefinition) {
        this.inputs = [];
        this.outputs = [];

        this.parseAPI(element.properties);
    }

    public static fromClass(element: ClassDefinition): Component {
        if (!this.isComponent(element)) {
            throw new NotAComponentError(element.name);
        }

        return new Component(element);
    }

    public static isComponent(element: ClassDefinition): boolean {
        return !!this.getComponentDecorator(element);
    }

    private static getComponentDecorator(element: ClassDefinition): Nullable<DecoratorDefinition> {
        let componentDecorator: Nullable<DecoratorDefinition> = null;

        element.decorators.forEach((decorator: DecoratorDefinition) => {
            if (decorator.name === DecoratorNames.COMPONENT) {
                componentDecorator = decorator;
            }
        });

        return componentDecorator;
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

    private parseAPI(properties: Array<ClassPropertyDefinition>): void {
        properties.forEach((property: ClassPropertyDefinition) => {
            if (Component.hasInputDecorator(property)) {
                this.inputs.push(new Input(property));
            }

            if (Component.hasOutputDecorator(property)) {
                this.outputs.push(new Output(property));
            }
        });
    }
}
