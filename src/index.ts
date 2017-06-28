import * as TsTypeInfo from 'ts-type-info';
import { Component } from './modules/Component';

const result: TsTypeInfo.GlobalDefinition = TsTypeInfo.getInfoFromFiles(['example/component.ts']);

result.files.forEach((file: TsTypeInfo.FileDefinition) => {
    file.classes.forEach((element: TsTypeInfo.ClassDefinition) => {
        if (Component.isComponent(element)) {
            Component.fromClass(element);
        }
    });
});
