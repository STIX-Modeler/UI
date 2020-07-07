import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/network-traffic.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class NetworkTraffic extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "network-traffic--",
            "active": false,
            "relationships": [
                {"type": "src-payload", "target": "observable", "sub-target": "artifact", "x_exclusive": true, "x_embed": "src_payload_ref"},
                {"type": "src-payload", "target": "artifact", "x_exclusive": true, "x_embed": "src_payload_ref"},
                {"type": "dst-payload", "target": "observable", "sub-target": "artifact", "x_exclusive": true, "x_embed": "dst_payload_ref"},
                {"type": "dst-payload", "target": "artifact", "x_exclusive": true, "x_embed": "dst_payload_ref"},
                {"type": "encapsulates", "target": "observable", "sub-target": "network-traffic", "x_embed": "encapsulates_refs"},
                {"type": "encapsulates", "target": "network-traffic", "x_embed": "encapsulates_refs"},
                {"type": "encapsulated-by", "target": "observable", "sub-target": "network-traffic", "x_exclusive": true, "x_embed": "encapsulated_ref"},
                {"type": "encapsulated-by", "target": "network-traffic", "x_exclusive": true, "x_embed": "encapsulated_ref"},
                {"type": "opened-connections", "target": "observable", "sub-target": "process", "x_reverse": true, "x_embed": "opened_connection_refs"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.ipfix.value = {};

        this.properties.src_payload_ref.control = "hidden";
        this.properties.dst_payload_ref.control = "hidden";
        this.properties.encapsulates_refs.control = "hidden";
        this.properties.encapsulated_by_ref.control = "hidden";
        this.properties.protocols.control = "csv";

        this.properties.ipfix.control = "genericobject";

        this.properties.src_port.type = "string";
        this.properties.dst_port.type = "string";

        this.properties.src_byte_count.type = "string";
        this.properties.dst_byte_count.type = "string";
        this.properties.src_packets.type = "string";
        this.properties.dst_packets.type = "string";
    }
}

const singleton = new NetworkTraffic();

export default singleton;
