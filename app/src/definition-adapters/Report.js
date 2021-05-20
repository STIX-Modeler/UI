import common from '../definitions/common.json';
import rawDefinition from '../definitions/report.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Report extends Base  {

    constructor() {
        const definition_extension = {
            "img": "report.png",
            "prefix": "report--",
            "active": true,
            "relationships": [
                {"type": "references", "target": "identity", "x_embed": "object_refs"},
                {"type": "references", "target": "sighting", "x_embed": "object_refs"},
                {"type": "references", "target": "observed-data", "x_embed": "object_refs"},
                {"type": "references", "target": "indicator", "x_embed": "object_refs"},
                {"type": "references", "target": "vulnerability", "x_embed": "object_refs"},
                {"type": "references", "target": "malware", "x_embed": "object_refs"},
                {"type": "references", "target": "report", "x_embed": "object_refs"},
                {"type": "references", "target": "attack-pattern", "x_embed": "object_refs"},
                {"type": "references", "target": "threat-actor", "x_embed": "object_refs"},
                {"type": "references", "target": "intrusion-set", "x_embed": "object_refs"},
                {"type": "references", "target": "campaign", "x_embed": "object_refs"},
                {"type": "references", "target": "course-of-action", "x_embed": "object_refs"},
                {"type": "references", "target": "tool", "x_embed": "object_refs"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["object_refs"].control = "hidden";
        this.properties["report_types"].vocab = this.definitions["report-type-ov"].enum;
    }
}

const singleton = new Report();

export default singleton;
