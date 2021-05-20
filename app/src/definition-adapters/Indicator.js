import common from '../definitions/common.json';
import rawDefinition from '../definitions/indicator.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Indicator extends Base  {

    constructor() {
        const definition_extension = {
            "img": "indicator.png",
            "prefix": "indicator--",
            "active": true,
            "relationships": [
                {"type": "indicates", "target": "attack-pattern"},
                {"type": "indicates", "target": "campaign"},
                {"type": "indicates", "target": "intrusion-set"},
                {"type": "indicates", "target": "malware"},
                {"type": "indicates", "target": "threat-actor"},
                {"type": "indicates", "target": "tool"},
                {"type": "indicates", "target": "infrastructure"},
                {"type": "based-on", "target": "observed-data"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        // Hoist vocabs onto properties
        this.properties.indicator_types.vocab = this.definitions["indicator-type-ov"].enum;
        this.properties.pattern_type.vocab = this.definitions["pattern-type-ov"].enum;
        this.properties.pattern_type.control = "stringselector";

        this.properties.pattern.control = "confirmtextarea";
    }
}

const singleton = new Indicator();

export default singleton;
