import common from '../definitions/common.json';
import rawDefinition from '../definitions/attack-pattern.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class AttackPattern extends Base  {

    constructor() {
        const definition_extension = {
            "img": "attack-pattern.png",
            "prefix": "attack-pattern--",
            "active": true,
            "relationships": [
                {"type": "targets", "target": "identity"},
                {"type": "targets", "target": "location"},
                {"type": "targets", "target": "vulnerability"},
                {"type": "uses", "target": "malware"},
                {"type": "uses", "target": "tool"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);
    }
}

const singleton = new AttackPattern();

export default singleton;
