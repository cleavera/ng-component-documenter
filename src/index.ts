import * as fs from 'fs';
import * as glob from 'glob';
import * as TsTypeInfo from 'ts-type-info';

import { Component } from './modules/Component';
import { TreeFactory } from './modules/Jsonify';
import { Log } from './modules/Logger';

const dir: string = 'docs';

export function ngComponentDocumenter(globPattern: string): void {
    Log(`Looking for files`);
    glob(globPattern, (err: Error, files: Array<string>) => {
        Log(`${files.length} files found`);
        Log(`Compiling project`);
        const result: TsTypeInfo.GlobalDefinition = TsTypeInfo.getInfoFromFiles(files);
        Log(`Project compiled`);

        result.files.forEach((file: TsTypeInfo.FileDefinition) => {
            Log(`Parsing ${file.fileName}`);
            file.classes.forEach((element: TsTypeInfo.ClassDefinition) => {
                if (Component.isComponent(element)) {
                    const component: Component = Component.fromClass(element);

                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }

                    fs.writeFileSync(`${dir}/${component.selector}.json`, TreeFactory.parseTree(component, 'component').serialize());
                }
            });
        });
    });
}
