import deepmerge from "deepmerge";
import moment from "moment";
import uuidv4 from "uuid";

const SPEC_VERSION = 2.1;

export class Base {

    constructor(common, def) {
        const commonProps = common.properties;
        let defProps = {};
        const dateFields = [
            "first_seen",
            "last_seen",
            "first_observed",
            "last_observed",
            "modified",
            "updated",
            "created",
            "valid_from",
            "valid_until",
            "submitted",
            "analysis_started",
            "analysis_ended",
            "published",
            "ctime",
            "atime",
            "mtime",
            "date",
            "account_created",
            "account_expires",
            "credential_last_changed",
            "account_first_login",
            "account_last_login",
            "modified_time",
            "validity_not_before",
            "validity_not_after",
            "start",
            "end"
        ];
        const defaultValue = (type) => {
            let def;

            switch (type) {
                case "string":
                    def = "";
                    break;
                case "dts":
                    def = moment().format();
                    break;
                case "integer":
                    def = 0;
                    break;
                case "array":
                    def = []
                    break;
                case "object":
                    def = {}
                    break;
                case "boolean":
                    def = false
                    break;
            }

            return def;
        }

        common.required.map(item => {
            if (commonProps[item]) {
                commonProps[item].required = true;
            }
        });

        if (def.allOf) {
            def.allOf.map(item => {
                if (item.hasOwnProperty("properties")) {
                    defProps = item.properties;
                }
            });
        } else {
            defProps = def.properties;
        }

        if (def.required) {
            def.required.map(item => {
                if (defProps[item]) {
                    defProps[item].required = true;
                }
            });
        }

        for (const item in def) {
            this[item] = def[item];
        }

        const mergedProps = deepmerge(commonProps, defProps);

        // Start special handling of common object
        // properties.
        for (let prop in mergedProps) {
            // For the sake of the editor, we need to
            // reset the type as dts on fields that require
            // a datetime.
            if (dateFields.indexOf(prop) > -1) {
                mergedProps[prop].type = "dts";
            }
            // Set default blank values based on the prop
            // type.
            if (mergedProps[prop].type) {
                mergedProps[prop].value = defaultValue(mergedProps[prop].type);
            }
        }

        if (mergedProps["type"]) {
            mergedProps["type"].control = "literal";
            if (mergedProps["type"].enum) {
                mergedProps["type"].value = mergedProps["type"].enum[0];
            }
        }

        if (mergedProps["aliases"]) {
            mergedProps["aliases"].control = "csv";
        }

        if (mergedProps["kill_chain_phases"]) {
            mergedProps["kill_chain_phases"].control = "killchain";
            mergedProps["kill_chain_phases"].vocab = [{
                "label": "Lockheed Kill Chain",
                "value": "lockheed-martin-cyber-kill-chain",
                "phases": [{
                    "label": "Reconnaissance",
                    "phase_name": "reconnaissance"
                }, {
                    "label": "Weaponize",
                    "phase_name": "weaponization"
                }, {
                    "label": "Delivery",
                    "phase_name": "delivery"
                }, {
                    "label": "Exploitation",
                    "phase_name": "exploitation"
                }, {
                    "label": "Installation",
                    "phase_name": "installation"
                }, {
                    "label": "Command & Control (C2)",
                    "phase_name": "command-and-control"
                }, {
                    "label": "Actions On Objectives",
                    "phase_name": "actions-on-objectives"
                }]
            }]
        }

        if (mergedProps["external_references"]) {
            mergedProps["external_references"].control = "externalrefs";
        }

        mergedProps["id"].control = "hidden";

        if (mergedProps["confidence"]) {
            mergedProps["confidence"].control = "slider";
        }

        if (mergedProps["description"]) {
            mergedProps["description"].control = "textarea";
        }

        /**
         * These are defaults that are to be set by the TI orchestrator
         */

        mergedProps["spec_version"].value = SPEC_VERSION;
        mergedProps["spec_version"].control = "literal";

        // Setting the label defauts for all the objects here,
        // however, this can be set individually in each objects
        // definition adapter.
        if (mergedProps["labels"]) {
            mergedProps["labels"].vocab = [
                "Lorem",
                "Ipsum"
            ]
        }

        if (mergedProps["extensions"]) {
            mergedProps["extensions"].control = "genericobject";
            mergedProps["extensions"].type = "object";
            mergedProps["extensions"].value = {};
        }

        if (mergedProps["created_by_ref"]) {
            mergedProps["created_by_ref"].value = `identity--${uuidv4()}`
            mergedProps["created_by_ref"].type = "literal";
        }

        if (mergedProps["lang"]) {
            mergedProps["lang"].value = "en";
            mergedProps["lang"].control = "hidden";
        }

        mergedProps["object_marking_refs"].control = "hidden";
        mergedProps["granular_markings"].control = "hidden";

        this.properties = mergedProps;
    }
}
