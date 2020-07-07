import common from '../definitions/common.json';
import rawDefinition from '../definitions/observed-data.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class ObservedData extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observed-data.png",
            "prefix": "observed-data--",
            "active": true,
            "relationships": [
                {"type": "observed-artifact", "target": "observable", "sub-target": "artifact", "x_embed": "object_refs"},
                {"type": "observed-autonomous-system", "target": "observable", "sub-target": "autonomous-system", "x_embed": "object_refs"},
                {"type": "observed-directory", "target": "observable", "sub-target": "directory", "x_embed": "object_refs"},
                {"type": "observed-domain", "target": "observable", "sub-target": "domain-name", "x_embed": "object_refs"},
                {"type": "observed-ipv4-addr", "target": "observable", "sub-target": "ipv4-addr", "x_embed": "object_refs"},
                {"type": "observed-ipv6-addr", "target": "observable", "sub-target": "ipv6-addr", "x_embed": "object_refs"},
                {"type": "observed-email-msg", "target": "observable", "sub-target": "email-message", "x_embed": "object_refs"},
                {"type": "observed-email-addr", "target": "observable", "sub-target": "email-addr", "x_embed": "object_refs"},
                {"type": "observed-file", "target": "observable", "sub-target": "file", "x_embed": "object_refs"},
                {"type": "observed-mac-addr", "target": "observable", "sub-target": "mac-addr", "x_embed": "object_refs"},
                {"type": "observed-mutex", "target": "observable", "sub-target": "mutex", "x_embed": "object_refs"},
                {"type": "observed-network-traffic", "target": "observable", "sub-target": "network-traffic", "x_embed": "object_refs"},
                {"type": "observed-process", "target": "observable", "sub-target": "process", "x_embed": "object_refs"},
                {"type": "observed-software", "target": "observable", "sub-target": "software", "x_embed": "object_refs"},
                {"type": "observed-url", "target": "observable", "sub-target": "url", "x_embed": "object_refs"},
                {"type": "observed-user-account", "target": "observable", "sub-target": "user-account", "x_embed": "object_refs"},
                {"type": "observed-win-reg-key", "target": "observable", "sub-target": "windows-registry-key", "x_embed": "object_refs"},
                {"type": "observed-x509-cert", "target": "observable", "sub-target": "x509-certificate", "x_embed": "object_refs"},
                {"type": "observed-artifact", "target": "artifact", "x_embed": "object_refs"},
                {"type": "observed-autonomous-system", "target": "autonomous-system", "x_embed": "object_refs"},
                {"type": "observed-directory", "target": "directory", "x_embed": "object_refs"},
                {"type": "observed-domain", "target": "domain-name", "x_embed": "object_refs"},
                {"type": "observed-ipv4-addr", "target": "ipv4-addr", "x_embed": "object_refs"},
                {"type": "observed-ipv6-addr", "target": "ipv6-addr", "x_embed": "object_refs"},
                {"type": "observed-email-msg", "target": "email-message", "x_embed": "object_refs"},
                {"type": "observed-email-addr", "target": "email-addr", "x_embed": "object_refs"},
                {"type": "observed-file", "target": "file", "x_embed": "object_refs"},
                {"type": "observed-mac-addr", "target": "mac-addr", "x_embed": "object_refs"},
                {"type": "observed-mutex", "target": "mutex", "x_embed": "object_refs"},
                {"type": "observed-network-traffic", "target": "network-traffic", "x_embed": "object_refs"},
                {"type": "observed-process", "target": "process", "x_embed": "object_refs"},
                {"type": "observed-software", "target": "software", "x_embed": "object_refs"},
                {"type": "observed-url", "target": "url", "x_embed": "object_refs"},
                {"type": "observed-user-account", "target": "user-account", "x_embed": "object_refs"},
                {"type": "observed-win-reg-key", "target": "windows-registry-key", "x_embed": "object_refs"},
                {"type": "observed-x509-cert", "target": "x509-certificate", "x_embed": "object_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties["number_observed"].control = "slider";
        this.properties["object_refs"].control = "hidden";
        this.properties["objects"].control = "hidden";
    }
}

const singleton = new ObservedData();

export default singleton;
