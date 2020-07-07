import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/file.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class File extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "file--",
            "active": false,
            "relationships": [
                {"type": "content", "target": "observable", "sub-target": "artifact", "x_embed": "content_ref"},
                {"type": "content", "target": "artifact", "x_embed": "content_ref"},
                {"type": "parent-directory", "target": "observable", "sub-target": "directory", "x_embed": "parent_directory_ref"},
                {"type": "parent-directory", "target": "directory", "x_embed": "parent_directory_ref"},
                {"type": "contains", "target": "observable", "sub-target": "artifact", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "directory", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "domain-name", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "ipv4-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "ipv6-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "email-message", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "email-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "file", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "mac-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "mutex", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "url", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "user-account", "x_embed": "contains_refs"},
                {"type": "contains", "target": "observable", "sub-target": "windows-registry-key", "x_embed": "contains_refs"},
                {"type": "contains", "target": "artifact", "x_embed": "contains_refs"},
                {"type": "contains", "target": "directory", "x_embed": "contains_refs"},
                {"type": "contains", "target": "domain-name", "x_embed": "contains_refs"},
                {"type": "contains", "target": "ipv4-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "ipv6-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "email-message", "x_embed": "contains_refs"},
                {"type": "contains", "target": "email-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "file", "x_embed": "contains_refs"},
                {"type": "contains", "target": "mac-addr", "x_embed": "contains_refs"},
                {"type": "contains", "target": "mutex", "x_embed": "contains_refs"},
                {"type": "contains", "target": "url", "x_embed": "contains_refs"},
                {"type": "contains", "target": "user-account", "x_embed": "contains_refs"},
                {"type": "contains", "target": "windows-registry-key", "x_embed": "contains_refs"},
                {"type": "image", "target": "observable", "sub-target": "file", "x_reverse": true, "x_exclusive": true, "x_embed": "image_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);
        this.properties.hashes.value = {};

        this.properties.content_ref.control = "hidden";
        this.properties.parent_directory_ref.control = "hidden";
        this.properties.contains_refs.control = "hidden";
        this.properties.hashes.control = "genericobject";

        this.properties.magic_number_hex.type = "string";
        this.properties.size.type = "string";
    }
}

const singleton = new File();

export default singleton;
