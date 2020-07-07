import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/email-addr.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class EmailAddr extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "email-addr--",
            "active": false,
            "relationships": [
                {"type": "from", "target": "observable", "sub-target": "email-message", "x_reverse": true, "x_embed": "from_ref"},
                {"type": "to", "target": "observable", "sub-target": "email-message", "x_reverse": true, "x_embed": "to_refs"},
                {"type": "cc", "target": "observable", "sub-target": "email-message", "x_reverse": true, "x_embed": "cc_refs"},
                {"type": "bcc", "target": "observable", "sub-target": "email-message", "x_reverse": true, "x_embed": "bcc_refs"},
                {"type": "sender", "target": "observable", "sub-target": "email-message", "x_reverse": true, "x_embed": "sender_ref"},
                {"type": "addr-belongs-to", "target": "observable", "sub-target": "user-account", "x_embed": "belongs_to_ref"},
                {"type": "addr-belongs-to", "target": "user-account", "x_embed": "belongs_to_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.belongs_to_ref.control = "hidden";
    }
}

const singleton = new EmailAddr();

export default singleton;
