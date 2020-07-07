import common from '../definitions/observable-common.json';
import rawDefinition from '../definitions/software.json';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Software extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "software--",
            "active": false,
            "relationships": []
        }

        let def = deepmerge(definition_extension, rawDefinition);

        super(common, def);

        this.properties.languages.control = "csv";
    }
}

const singleton = new Software();

export default singleton;
