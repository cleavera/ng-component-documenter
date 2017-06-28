import { isArray, isObjectLike } from 'lodash';

import { Dict } from '../../../interfaces';

import { Item, List } from '../classes';
import { Serializable } from '../interfaces/Serializable';

export class TreeFactory {
    public static parseTree(item: any, type: string): Item {
        const attributes: Dict<any> = {};
        const relationships: Array<Serializable> = [];

        Object.keys(item).forEach((key: string) => {
            const value: any = item[key];

            if (!isObjectLike(value)) {
                attributes[key] = value;
            } else if (!isArray(value)) {
                relationships.push(TreeFactory.parseTree(value, key));
            } else {
                const list: List = new List(key);

                value.forEach((val: any) => {
                    list.addData(TreeFactory.parseTree(val, key));
                });

                relationships.push(list);
            }
        });

        const parseItem: Item = new Item(type, null, attributes);

        relationships.forEach((relationship) => {
            parseItem.addRelationship(relationship.type, relationship);
        });

        return parseItem;
    }
}