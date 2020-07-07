import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/user-account.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class UserAccount extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "user-account--",
            "active": false,
            "relationships": [
                {"type": "addr-belongs-to", "target": "observable", "sub-target": "email-addr", "x_reverse": true, "x_embed": "belongs_to_ref"},
                {"type": "creator-user", "target": "observable", "sub-target": "process", "x_reverse": true, "x_embed": "creator_user_ref"}
            ]
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);
    }
}

const singleton = new UserAccount();

export default singleton;
