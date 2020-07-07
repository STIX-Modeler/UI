import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/mutex.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Mutex extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "mutex--",
            "active": false,
            "relationships": [
                {"type": "contains", "target": "observable", "sub-target": "file", "x_reverse": true, "x_embed": "contains_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);
    }
}

const singleton = new Mutex();

export default singleton;
