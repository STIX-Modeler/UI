import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/mac-addr.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class MacAddr extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "mac-addr--",
            "active": false,
            "relationships": [
                {"type": "resolves-to", "target": "observable", "sub-target": "ipv4-addr", "x_reverse": true, "x_embed": "resolves_to_refs"},
                {"type": "resolves-to", "target": "observable", "sub-target": "ipv6-addr", "x_reverse": true, "x_embed": "resolves_to_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);


    }
}

const singleton = new MacAddr();

export default singleton;
