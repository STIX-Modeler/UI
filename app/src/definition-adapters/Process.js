import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/process.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Process extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "process--",
            "active": false,
            "relationships": [
                {"type": "opened-connections", "target": "observable", "sub-target": "network-traffic", "x_embed": "opened_connection_refs"},
                {"type": "opened-connections", "target": "network-traffic", "x_embed": "opened_connection_refs"},
                {"type": "creator-user", "target": "observable", "sub-target": "user-account", "x_embed": "creator_user_ref"},
                {"type": "creator-user", "target": "user-account", "x_embed": "creator_user_ref"},
                {"type": "image", "target": "observable", "sub-target": "file", "x_exclusive": true, "x_embed": "image_ref"},
                {"type": "image", "target": "file", "x_exclusive": true, "x_embed": "image_ref"},
                {"type": "parent-process", "target": "observable", "sub-target": "process", "x_exclusive": true, "x_embed": "parent_ref"},
                {"type": "parent-process", "target": "process", "x_exclusive": true, "x_embed": "parent_ref"},
                {"type": "child-process", "target": "observable", "sub-target": "process", "x_embed": "child_refs"},
                {"type": "child-process", "target": "process", "x_embed": "child_refs"}


            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.environment_variables.value = {};

        this.properties.opened_connection_refs.control = "hidden";
        this.properties.creator_user_ref.control = "hidden";
        this.properties.image_ref.control = "hidden";
        this.properties.parent_ref.control = "hidden";
        this.properties.child_refs.control = "hidden";

        this.properties.environment_variables.control = "genericobject";



    }
}

const singleton = new Process();

export default singleton;
