import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/domain-name.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class DomainName extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "domain-name--",
            "active": false,
            "relationships": [
                {"type": "resolves-to", "target": "observable", "sub-target": "ipv4-addr", "x_reverse": true, "x_embed": "resolves_to_refs"},
                {"type": "resolves-to", "target": "observable", "sub-target": "ipv6-addr", "x_reverse": true, "x_embed": "resolves_to_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.resolves_to_refs.control = "hidden";
    }
}

const singleton = new DomainName();

export default singleton;
