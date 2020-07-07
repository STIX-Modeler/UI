import common from '../definitions/common.json';
import rawDefinition from '../definitions/sighting.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Sighting extends Base  {

    constructor() {
        const definition_extension = {
            "img": "sighting.png",
            "prefix": "sighting--",
            "active": true,
            "relationships": [
                {"type": "sighting-of", "target": "indicator", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "sighting-of", "target": "malware", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "sighting-of", "target": "threat-actor", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "sighting-of", "target": "attack-pattern", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "sighting-of", "target": "campaign", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "sighting-of", "target": "tool", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "sighting-of", "target": "vulnerability", "x_exclusive": true, "x_embed": "sighting_of_ref"},
                {"type": "observed", "target": "observed-data", "x_embed": "observed_data_refs"},
                {"type": "created-by", "target": "identity", "x_exclusive": true, "x_embed": "created_by_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["sighting_of_ref"].control = "hidden";
        this.properties["observed_data_refs"].control = "hidden";
        this.properties["where_sighted_refs"].control = "hidden";

        this.properties["count"].control = "slider";
    }
}

const singleton = new Sighting();

export default singleton;
