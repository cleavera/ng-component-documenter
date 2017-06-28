import * as fs from 'fs';
import * as glob from 'glob';
import * as TsTypeInfo from 'ts-type-info';

import { Component } from './modules/Component';
import { TreeFactory } from './modules/Jsonify/helpers/TreeFactory';

export function ngComponentDocumenter(globPattern: string): void {
    glob(globPattern, (err: Error, files: Array<string>) => {
        const result: TsTypeInfo.GlobalDefinition = TsTypeInfo.getInfoFromFiles(files);

        result.files.forEach((file: TsTypeInfo.FileDefinition) => {
            file.classes.forEach((element: TsTypeInfo.ClassDefinition) => {
                if (Component.isComponent(element)) {
                    fs.writeFileSync('output.json', TreeFactory.parseTree(Component.fromClass(element), 'component').serialize());
                }
            });
        });
    });
}
