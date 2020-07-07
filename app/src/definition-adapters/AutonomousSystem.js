import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/autonomous-system.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class AutonomousSystem extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "autonomous-system--",
            "active": false,
            "relationships": [
                {"type": "belongs-to", "target": "observable", "sub-target": "ipv4-addr", "x_reverse": true, "x_embed": "belongs_to_refs"},
                {"type": "belongs-to", "target": "observable", "sub-target": "ipv6-addr", "x_reverse": true, "x_embed": "belongs_to_refs"}

            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.number.control = "slider";
    }
}

const singleton = new AutonomousSystem();

export default singleton;
