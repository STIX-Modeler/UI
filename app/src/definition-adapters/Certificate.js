import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/x509-certificate.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Certificate extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "x509-certificate--",
            "active": false,
            "relationships": []
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.hashes.value = {};
        this.properties.hashes.control = "genericobject";

        this.properties.x509_v3_extensions.type = "string";

    }
}

const singleton = new Certificate();

export default singleton;
