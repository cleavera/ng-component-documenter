import * as TsTypeInfo from 'ts-type-info';
import { Component } from './classes/Component';

const result = TsTypeInfo.getInfoFromFiles(['example/component.ts']);

result.files.forEach((file) => {
    file.classes.forEach((element) => {
        if (Component.isComponent(element)) {
            Component.fromClass(element);
        }
    });
});
