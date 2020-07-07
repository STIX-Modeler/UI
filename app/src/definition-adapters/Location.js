import common from '../definitions/common.json';
import rawDefinition from '../definitions/location.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Location extends Base  {

    constructor() {
        const definition_extension = {
            "img": "location.png",
            "prefix": "location--",
            "active": true,
            "relationships": [
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);
    }
}

const singleton = new Location();

export default singleton;
