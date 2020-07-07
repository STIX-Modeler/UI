import common from '../definitions/common.json';
import rawDefinition from '../definitions/marking-definition.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class MarkingDefinitionRed extends Base  {

    constructor() {
        const definition_extension = {
            "img": "tlp-red.png",
            "prefix": "marking-definition--",
            "active": true,
            "relationships": [
                {"type": "applies-to", "target": "indicator", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "malware", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "malware-analysis", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "campaign", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "threat-actor", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "infrastructure", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "intrusion-set", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "tool", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "sighting", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "observed-data", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "report", "x_reverse": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "course-of-action", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "vulnerability", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "grouping", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "attack-pattern", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "location", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "note", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "opinion", "x_exclusive": true, "x_embed": "object_marking_refs"},
                {"type": "applies-to", "target": "identity", "x_exclusive": true, "x_embed": "object_marking_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.definition = {
            "tlp": "red"
        };

        this.properties["definition"].control = "hidden";
    }
}

const singleton = new MarkingDefinitionRed();

export default singleton;
