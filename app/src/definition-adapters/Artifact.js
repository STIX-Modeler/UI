import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/artifact.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Artifact extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "artifact--",
            "active": false,
            "relationships": [
                {"type": "raw", "target": "observable", "sub-target": "artifact", "x_reverse": true, "x_embed": "raw_email_ref"},
                {"type": "content", "target": "observable", "sub-target": "file", "x_reverse": true, "x_embed": "content_ref"},
                {"type": "contains", "target": "observable", "sub-target": "file", "x_reverse": true, "x_embed": "contains_refs"},
                {"type": "src-payload", "target": "observable", "sub-target": "network-traffic", "x_reverse": true, "x_exclusive": true, "x_embed": "src_payload_ref"},
                {"type": "dst-payload", "target": "observable", "sub-target": "network-traffic", "x_reverse": true, "x_exclusive": true, "x_embed": "dst_payload_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.payload_bin.type = "string";
        this.properties.url.type = "string";
        this.properties.encryption_algorithm.type = "string";

        this.properties.hashes.value = {};

        this.properties.hashes.control = "genericobject";

    }
}

const singleton = new Artifact();

export default singleton;
