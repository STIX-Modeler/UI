import common from '../definitions/common.json';
import rawDefinition from '../definitions/grouping.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Grouping extends Base  {

    constructor() {
        const definition_extension = {
            "img": "grouping.png",
            "prefix": "grouping--",
            "active": true,
            "relationships": [
                {"type": "group", "target": "identity", "x_embed": "object_refs"},
                {"type": "group", "target": "sighting", "x_embed": "object_refs"},
                {"type": "group", "target": "observed-data", "x_embed": "object_refs"},
                {"type": "group", "target": "indicator", "x_embed": "object_refs"},
                {"type": "group", "target": "malware", "x_embed": "object_refs"},
                {"type": "group", "target": "report", "x_embed": "object_refs"},
                {"type": "group", "target": "attack-pattern", "x_embed": "object_refs"},
                {"type": "group", "target": "threat-actor", "x_embed": "object_refs"},
                {"type": "group", "target": "intrusion-set", "x_embed": "object_refs"},
                {"type": "group", "target": "campaign", "x_embed": "object_refs"},
                {"type": "group", "target": "course-of-action", "x_embed": "object_refs"},
                {"type": "group", "target": "tool", "x_embed": "object_refs"},
                {"type": "group", "target": "vulnerability", "x_embed": "object_refs"},
                {"type": "group", "target": "infrastructure", "x_embed": "object_refs"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["context"].vocab = this.definitions["grouping-context-ov"].enum;
        this.properties["object_refs"].control = "hidden";
    }
}

const singleton = new Grouping();

export default singleton;
