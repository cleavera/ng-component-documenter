import * as ts from 'typescript';

export class Component {
    public name: string;
    public selector: string;
    public template: string;
    public inputs: Array<string>;

    private _node: ts.ClassDeclaration;
    private _typeChecker: ts.TypeChecker

    constructor(node: ts.ClassDeclaration, typeChecker: ts.TypeChecker) {
        this._node = node;
        this._typeChecker = typeChecker;
        this.name = node.name.text;
        this.inputs = [];

        this._extractComponentDefinition(node.decorators);
        this._extractInputs(node.members);
    }

    private _extractInputs(members: ts.NodeArray<ts.ClassElement>) {
        members.forEach((member: ts.ClassElement) => {
            if (!member.decorators) {
                return;
            }

            member.decorators.forEach((decorator: ts.Decorator) => {
                ts.forEachChild(decorator, (call: ts.CallExpression) => {
                    if (call.expression.getText() === 'Input') {
                        let inputName: string = member.name.getText();

                        call.arguments.forEach((argument: ts.StringLiteral) => {
                            inputName = argument.text;
                        });

                        this.inputs.push(inputName);
                        console.log(inputName);
                        console.log(this._typeChecker.getTypeFromTypeNode((member as ts.PropertyDeclaration).type));
                    }
                });
            });
        });

        console.log(this.inputs);
    }

    private _extractComponentDefinition(decorators: ts.NodeArray<ts.Decorator>) {
        decorators.forEach((decorator: ts.Decorator) => {
            ts.forEachChild(decorator, (call: ts.CallExpression) => {
                if (call.expression.getText() !== 'Component') {
                    return;
                }

                call.arguments.forEach((argument: ts.ObjectLiteralExpression) => {
                    argument.properties.forEach((property: ts.PropertyAssignment) => {
                        let propertyName: string = property.name.getText();

                        if (propertyName === 'selector') {
                            ts.forEachChild(property, (value: ts.StringLiteral | ts.Identifier) => {
                                if (ts.SyntaxKind.StringLiteral === value.kind) {
                                    this.selector = value.text;
                                }
                            })
                        }

                        if (propertyName === 'template') {
                            ts.forEachChild(property, (value: ts.TemplateLiteral | ts.Identifier) => {
                                if (ts.SyntaxKind.FirstTemplateToken === value.kind) {
                                    this.template = value.text;
                                }
                            })
                        }
                    })
                })
            });
        });
    }
}
