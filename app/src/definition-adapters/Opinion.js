import common from '../definitions/common.json';
import rawDefinition from '../definitions/opinion.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Opinion extends Base  {

    constructor() {
        const definition_extension = {
            "img": "opinion.png",
            "prefix": "opinion--",
            "active": true,
            "relationships": [
                {"type": "opinion", "target": "indicator", "x_embed": "object_refs"},
                {"type": "opinion", "target": "malware", "x_embed": "object_refs"},
                {"type": "opinion", "target": "campaign", "x_embed": "object_refs"},
                {"type": "opinion", "target": "threat-actor", "x_embed": "object_refs"},
                {"type": "opinion", "target": "infrastructure", "x_embed": "object_refs"},
                {"type": "opinion", "target": "intrusion-set", "x_embed": "object_refs"},
                {"type": "opinion", "target": "tool", "x_embed": "object_refs"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["authors"].control = "csv";
        this.properties["object_refs"].control = "hidden";
        this.properties["explanation"].control = "textarea";
        this.properties["opinion"].control = "textarea";
    }
}

const singleton = new Opinion();

export default singleton;
