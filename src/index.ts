import * as TsTypeInfo from 'ts-type-info';
import { Component } from './classes/Component';
import { Nullable } from './interfaces/Nullable';

const result = TsTypeInfo.getInfoFromFiles(['example/component.ts']);

result.files.forEach((file) => {
    file.classes.forEach((element) => {
        if (Component.isComponent(element)) {
            console.log(Component.fromClass(element));
        }
    });
});
