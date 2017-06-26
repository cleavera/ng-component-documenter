import * as ts from 'typescript';
import * as fs from 'fs';
import { Component } from './classes/Component';

let fileName = './example/component.ts';
const program = ts.createProgram([fileName], {});
let sourceFile = ts.createSourceFile(fileName, fs.readFileSync(fileName).toString(), ts.ScriptTarget.ES2015, true);

delint(sourceFile);
//console.log(ts.SyntaxKind);
function delint(sourceFile) {
    delintNode(sourceFile);

    function delintNode(node) {
        // console.log(node.kind, ts.SyntaxKind[node.kind]);
        if (node.kind === ts.SyntaxKind.ClassDeclaration) {
            let component = new Component(node, program.getTypeChecker());
            // console.log(component);
        }

        ts.forEachChild(node, delintNode);
    }
}