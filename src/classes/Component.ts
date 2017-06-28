import { ClassDefinition, ClassPropertyDefinition, DecoratorDefinition, ExpressionDefinition } from 'ts-type-info';
import { DecoratorNames } from '../const/DecoratorNames';
import { NotAComponentError } from '../errors/NotAComponentError';
import { Nullable } from '../interfaces';
import { Input } from './Input';
import { Output } from './Output';
import { Template } from './Template';

export class Component {
    public inputs: Array<Input>;
    public outputs: Array<Output>;
    public template: Template;
    public selector: string;

    protected constructor(element: ClassDefinition) {
        this.inputs = [];
        this.outputs = [];
        const componentDecorator: Nullable<DecoratorDefinition> = Component.getComponentDecorator(element);

        if (componentDecorator) {
            this.selector = this.getSelector(componentDecorator);
            this.template = Template.fromComponentDecorator(componentDecorator);
        }

        this.parseAPI(element.properties);
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

    private getSelector(componentDecorator: DecoratorDefinition): string {
        const selectorRegex: RegExp = /^[\s\S]+selector: ['"`]([A-z0-9-]+)['"`][\s\S]+$/;

        const arg: ExpressionDefinition = componentDecorator.arguments[0];

        return arg.text.replace(selectorRegex, '$1');
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
}
