import * as TsTypeInfo from 'ts-type-info';
import { Component } from './classes/Component';
import { Nullable } from './interfaces/Nullable';

const result = TsTypeInfo.getInfoFromFiles(['example/component.ts']);

result.files.forEach((file) => {
    file.classes.forEach((element) => {
        let component: Nullable<Component> = Component.fromClass(element);

        if (component) {
            console.log(component);
        }
    });
});
