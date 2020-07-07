import _cloneDeep from 'lodash/cloneDeep';
import deepmerge from 'deepmerge';

import {Base} from './Base';

class Observable extends Base  {

    constructor() {
        const definition_extension = {
            "img": "observable.png",
            "prefix": "observable--",
            "active": true,
            "relationships": [],
            properties: {
                "id": {},
                type: {
                    enum: [
                        "observable"
                    ]
                },
                "confidence": {},
                "spec_version": {
                    "value": ""
                },
                labels: {},
                created_by_ref: {},
                lang: {},
                object_marking_refs: {},
                granular_markings: {}

            }

        }

        const common = {
            required: [],
            properties: {}
        }

        super(common, definition_extension);
    }
}

const singleton = new Observable();

export default singleton;
