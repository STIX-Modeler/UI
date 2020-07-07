import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/email-message.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class EmailMessage extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "email-message--",
            "active": false,
            "relationships": [
                {"type": "from", "target": "observable", "sub-target": "email-addr", "x_embed": "from_ref"},
                {"type": "from", "target": "email-addr", "x_embed": "from_ref"},
                {"type": "to", "target": "observable", "sub-target": "email-addr", "x_embed": "to_refs"},
                {"type": "to", "target": "email-addr", "x_embed": "to_refs"},
                {"type": "cc", "target": "observable", "sub-target": "email-addr", "x_embed": "cc_refs"},
                {"type": "cc", "target": "email-addr", "x_embed": "cc_refs"},
                {"type": "bcc", "target": "observable", "sub-target": "email-addr", "x_embed": "bcc_refs"},
                {"type": "bcc", "target": "email-addr", "x_embed": "bcc_refs"},
                {"type": "sender", "target": "observable", "sub-target": "email-addr", "x_embed": "sender_ref"},
                {"type": "sender", "target": "email-addr", "x_embed": "sender_ref"},
                {"type": "raw", "target": "observable", "sub-target": "artifact", "x_embed": "raw_email_ref"},
                {"type": "raw", "target": "artifact", "x_embed": "raw_email_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.date.type = "dts";
        this.properties.additional_header_fields.value = {};

        this.properties.from_ref.control = "hidden";
        this.properties.sender_ref.control = "hidden";
        this.properties.to_refs.control = "hidden";
        this.properties.cc_refs.control = "hidden";
        this.properties.bcc_refs.control = "hidden";
        this.properties.raw_email_ref.control = "hidden";
        this.properties.additional_header_fields.control = "genericobject";
    }
}

const singleton = new EmailMessage();

export default singleton;
