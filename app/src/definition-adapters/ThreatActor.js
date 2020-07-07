import common from '../definitions/common.json';
import rawDefinition from '../definitions/threat-actor.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class ThreatActor extends Base  {

    constructor() {
        const definition_extension = {
            "img": "threat-actor.png",
            "prefix": "threat-actor--",
            "active": true,
            "relationships": [
                {"type": "attributed-to", "target": "identity"},
                {"type": "impersonates", "target": "identity"},
                {"type": "targets", "target": "identity"},
                {"type": "targets", "target": "vulnerability"},
                {"type": "uses", "target": "attack-pattern"},
                {"type": "uses", "target": "malware"},
                {"type": "uses", "target": "tool"},
                {"type": "uses", "target": "infrastructure"},
                {"type": "compromises", "target": "infrastructure"},
                {"type": "hosts", "target": "infrastructure"},
                {"type": "owns", "target": "infrastructure"},
                {"type": "located-at", "target": "location"},
                {"type": "created-by", "target": "identity", "x_exclusive": true}
            ],
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["sophistication"].control = "stringselector";
        this.properties["resource_level"].control = "stringselector";
        this.properties["primary_motivation"].control = "stringselector";
        this.properties["goals"].control = "csv";
        this.properties["sophistication"].vocab = this.definitions["threat-actor-sophistication-ov"].enum;
        this.properties["resource_level"].vocab = this.definitions["attack-resource-level-ov"].enum;
        this.properties["primary_motivation"].vocab = this.definitions["attack-motivation-ov"].enum;
        this.properties["secondary_motivations"].vocab = this.definitions["attack-motivation-ov"].enum;
        this.properties["personal_motivations"].vocab = this.definitions["attack-motivation-ov"].enum;
        this.properties["roles"].vocab = this.definitions["threat-actor-role-ov"].enum;
        this.properties["threat_actor_types"].vocab = this.definitions["threat-actor-type-ov"].enum;

    }
}

const singleton = new ThreatActor();

export default singleton;
