import { DecoratorDefinition, ExpressionDefinition } from 'ts-type-info';

import { DecoratorNames } from '../constants';
import { NotAComponentDecoratorError } from '../errors';

export class Template {
    public raw: string;

    constructor(template: string) {
        this.raw = template;
    }

    public static fromComponentDecorator(componentDecorator: DecoratorDefinition): Template {
        if (componentDecorator.name !== DecoratorNames.COMPONENT) {
            throw new NotAComponentDecoratorError(componentDecorator.name);
        }

        const templateRegex: RegExp = /^[\s\S]+template: ['"`]([^`]+)['"`][\s\S]+/;
        const arg: ExpressionDefinition = componentDecorator.arguments[0];

        return new Template(arg.text.replace(templateRegex, '$1'));
    }
}
