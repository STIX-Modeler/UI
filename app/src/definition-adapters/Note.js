import common from '../definitions/common.json';
import rawDefinition from '../definitions/note.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Note extends Base  {

    constructor() {
        const definition_extension = {
            "img": "note.png",
            "prefix": "note--",
            "active": true,
            "relationships": [
                {"type": "note", "target": "indicator", "x_embed": "object_refs"},
                {"type": "note", "target": "malware", "x_embed": "object_refs"},
                {"type": "note", "target": "campaign", "x_embed": "object_refs"},
                {"type": "note", "target": "threat-actor", "x_embed": "object_refs"},
                {"type": "note", "target": "infrastructure", "x_embed": "object_refs"},
                {"type": "note", "target": "intrusion-set", "x_embed": "object_refs"},
                {"type": "note", "target": "tool", "x_embed": "object_refs"},
                {"type": "note", "target": "sighting", "x_embed": "object_refs"},
                {"type": "note", "target": "observed-data", "x_embed": "object_refs"},
                {"type": "note", "target": "report", "x_embed": "object_refs"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["authors"].control = "csv";
        this.properties["object_refs"].control = "hidden";
        this.properties["content"].control = "textarea";
    }
}

const singleton = new Note();

export default singleton;
