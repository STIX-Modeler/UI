import common from '../definitions/common.json';
import rawDefinition from '../definitions/campaign.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Campaign extends Base  {

    constructor() {
        const definition_extension = {
            "img": "campaign.png",
            "prefix": "campaign--",
            "active": true,
            "relationships": [
                {"type": "attributed-to", "target": "intrusion-set"},
                {"type": "attributed-to", "target": "threat-actor"},
                {"type": "targets", "target": "identity"},
                {"type": "targets", "target": "vulnerability"},
                {"type": "uses", "target": "attack-pattern"},
                {"type": "uses", "target": "malware"},
                {"type": "uses", "target": "tool"},
                {"type": "compromises", "target": "infrastructure"},
                {"type": "uses", "target": "infrastructure"},
                {"type": "originates-from", "target": "location", "x_exclusive": true},
                {"type": "targets", "target": "location"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);
    }
}

const singleton = new Campaign();

export default singleton;
