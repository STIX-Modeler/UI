import common from '../definitions/common.json';
import rawDefinition from '../definitions/intrusion-set.json';
import _cloneDeep from 'lodash/cloneDeep';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class IntrusionSet extends Base  {

    constructor() {
        const definition_extension = {
            "img": "intrusion-set.png",
            "prefix": "intrusion-set--",
            "active": true,
            "relationships": [
                {"type": "attributed-to", "target": "threat-actor"},
                {"type": "targets", "target": "vulnerability"},
                {"type": "targets", "target": "identity"},
                {"type": "uses", "target": "tool"},
                {"type": "uses", "target": "attack-pattern"},
                {"type": "uses", "target": "malware"},
                {"type": "compromises", "target": "infrastructure"},
                {"type": "hosts", "target": "infrastructure"},
                {"type": "owns", "target": "infrastructure"},
                {"type": "uses", "target": "infrastructure"},
                {"type": "originates-from", "target": "location", "x_exclusive": true},
                {"type": "targets", "target": "location"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["goals"].control = "csv";
        this.properties["primary_motivation"].vocab = _cloneDeep(this.definitions["attack-motivation-ov"].enum);
        this.properties["primary_motivation"].control = "stringselector";
        this.properties["secondary_motivations"].vocab = this.definitions["attack-motivation-ov"].enum;
        this.properties["resource_level"].vocab = _cloneDeep(this.definitions["attack-resource-level-ov"].enum);
        this.properties["resource_level"].control = "stringselector";


    }
}

const singleton = new IntrusionSet();

export default singleton;
