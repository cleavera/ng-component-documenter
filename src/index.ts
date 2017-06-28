import * as glob from 'glob';
import * as TsTypeInfo from 'ts-type-info';

import { Component } from './modules/Component';

export function ngComponentDocumenter(globPattern: string): void {
    glob(globPattern, (err: Error, files: Array<string>) => {
        const result: TsTypeInfo.GlobalDefinition = TsTypeInfo.getInfoFromFiles(files);

        result.files.forEach((file: TsTypeInfo.FileDefinition) => {
            file.classes.forEach((element: TsTypeInfo.ClassDefinition) => {
                if (Component.isComponent(element)) {
                    Component.fromClass(element);
                }
            });
        });
    });
}
