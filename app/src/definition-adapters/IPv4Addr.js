import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/ipv4-addr.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class IPv4Addr extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "ipv4-addr--",
            "active": false,
            "relationships": [
                {"type": "belongs-to", "target": "autonomous-system", "x_embed": "belongs_to_refs"},
                {"type": "belongs-to", "target": "observable", "sub-target": "autonomous-system", "x_embed": "belongs_to_refs"},
                {"type": "resolves-to", "target": "mac-addr", "x_embed": "resolves_to_refs"},
                {"type": "resolves-to", "target": "observable", "sub-target": "mac-addr", "x_embed": "resolves_to_refs"},
                {"type": "resolves-to", "target": "domain-name", "x_embed": "resolves_to_refs"},
                {"type": "resolves-to", "target": "observable", "sub-target": "domain-name", "x_embed": "resolves_to_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.resolves_to_refs.control = "hidden";
        this.properties.belongs_to_refs.control = "hidden";
    }
}

const singleton = new IPv4Addr();

export default singleton;
