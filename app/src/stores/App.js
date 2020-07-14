import { observable, action, toJS } from "mobx";
import { dispatch } from "rfx-core";
import deepmerge from "deepmerge";
import _cloneDeep from "lodash/cloneDeep";
import _merge from "lodash/merge";
import moment from "moment";
import Proxy from "./Proxy";

import uuidv4 from "uuid";

import ap from "../definition-adapters/AttackPattern.js";
import indicator from "../definition-adapters/Indicator.js";
import malware from "../definition-adapters/Malware.js";
import ma from "../definition-adapters/MalwareAnalysis.js";
import sighting from "../definition-adapters/Sighting.js";
import coa from "../definition-adapters/CourseOfAction.js";
import campaign from "../definition-adapters/Campaign.js";
import od from "../definition-adapters/ObservedData.js";
import identity from "../definition-adapters/Identity.js";
import tool from "../definition-adapters/Tool.js";
import report from "../definition-adapters/Report.js";
import vuln from "../definition-adapters/Vulnerability.js";
import grouping from "../definition-adapters/Grouping.js";
import infra from "../definition-adapters/Infrastructure.js";
import is from "../definition-adapters/IntrusionSet.js";
import location from "../definition-adapters/Location.js";
import ta from "../definition-adapters/ThreatActor.js";
import note from "../definition-adapters/Note.js";
import opinion from "../definition-adapters/Opinion.js";
import tlpred from "../definition-adapters/MarkingDefinitionRed.js";
import tlpamber from "../definition-adapters/MarkingDefinitionAmber.js";
import tlpgreen from "../definition-adapters/MarkingDefinitionGreen.js";

import obs from "../definition-adapters/Observable.js";
import artifact from "../definition-adapters/Artifact.js";
import software from "../definition-adapters/Software.js";
import ipv4 from "../definition-adapters/IPv4Addr.js";
import ipv6 from "../definition-adapters/IPv6Addr.js";
import autosys from "../definition-adapters/AutonomousSystem.js";
import dir from "../definition-adapters/Directory.js";
import domain from "../definition-adapters/DomainName.js";
import emailaddr from "../definition-adapters/EmailAddr.js";
import emailmsg from "../definition-adapters/EmailMessage.js";
import file from "../definition-adapters/File.js";
import mac from "../definition-adapters/MacAddr.js";
import mutex from "../definition-adapters/Mutex.js";
import network from "../definition-adapters/NetworkTraffic.js";
import process from "../definition-adapters/Process.js";
import url from "../definition-adapters/Url.js";
import ua from "../definition-adapters/UserAccount.js";
import winregkey from "../definition-adapters/WindowsRegistryKey.js";
import cert from "../definition-adapters/Certificate.js";

const SPEC_VERSION = "2.1";

export default class App {

    @observable showDetails = false;
    @observable showJSON = false;
    @observable showJSONPaste = false;
    @observable showRelPicker = false;
    @observable showGrowl = false;
    @observable showSubmissionError = false;
    @observable growlMessage = "";
    @observable relationships = [];
    @observable dragging = {};
    @observable selected = {};
    @observable bundle = {};
    @observable pasteBundle;
    @observable nodes = [];
    @observable edges = [];
    @observable lines = [];
    @observable failedCollection = [];
    @observable objects = [
        sighting,
        malware,
        ma,
        indicator,
        coa,
        ap,
        od,
        campaign,
        identity,
        tool,
        report,
        vuln,
        grouping,
        infra,
        is,
        location,
        ta,
        note,
        opinion,
        tlpred,
        tlpamber,
        tlpgreen,
        artifact,
        obs,
        software,
        ipv4,
        ipv6,
        autosys,
        dir,
        domain,
        emailaddr,
        emailmsg,
        file,
        mac,
        mutex,
        network,
        process,
        url,
        ua,
        winregkey,
        cert
    ];
    @observable mousePosition = {
        clientX: 0,
        clientY: 0
    }

    constructor() {
        this.bundle.spec_version = SPEC_VERSION;
        this.bundle.id = this.generateNodeID("bundle--");
        this.bundle.type = "bundle";
        this.bundle.objects = [];
    }

    setMousePosition(event) {
        this.mousePosition.clientX = event.clientX;
        this.mousePosition.clientY = event.clientY;
    }

    setSelected(o) {
        this.selected = o;
    }

    showModal() {
        this.modal = true;
    }

    hideModal() {
        this.modal = false;
    }

    generateNodeID(prefix) {
        return `${prefix}${uuidv4()}`;
    }

    addNodeToBundle(node) {
        const props = node.properties;

        const newProps = {
            id: node.id
        };

        for (const prop in props) {
            if (props[prop].type !== undefined) {
                newProps[prop] = props[prop].value;
            }

            if (prop === "definition") {
                newProps[prop] = props[prop];
            }
        }

        this.bundle.objects.push(newProps);
    }

    addRelationshipToBundle(relationship) {

        const assignEmbeddedRelationship = (relationship, key, type) => {
            this.bundle.objects.map(object => {
                if (relationship.x_reverse) {
                    if (object.id === relationship.target_ref) {
                        if (typeof(type) === "string") {
                            object[key] = relationship.source_ref;
                            updateNode(key, relationship.source_ref);
                        } else if (Array.isArray(type)) {
                            object[key].push(relationship.source_ref);
                        }
                    }
                } else {
                    if (object.id === relationship.source_ref) {
                        if (Array.isArray(key)) {
                            key.map(k => {
                                for (let item in object) {
                                    if (item === k) {
                                        if (typeof(object[k]) === "string") {
                                            object[k] = relationship.target_ref;
                                        } else if (Array.isArray(object[k])) {
                                            object[k].push(relationship.target_ref);
                                        } else {
                                            console.warn("No type for relating in addRelationshipToBundle() in App.js")
                                        }
                                    }
                                }
                            });
                        } else {
                            if (typeof(type) === "string") {
                                object[key] = relationship.target_ref;
                            } else if (Array.isArray(type)) {
                                object[key].push(relationship.target_ref);
                            }
                        }
                    }
                }
            });
        }

        // The relationship object in the definition adapter
        // should delcare how it is to be stored.
        if (relationship.x_embed) {
            let type = "";

            // If the property is plural, we know it is an array.
            // Otherwise, keep it a string.
            if (relationship.x_embed.indexOf("refs") > -1) {
                type = [];
            }

            assignEmbeddedRelationship(relationship, relationship.x_embed, type);
        } else {
            this.bundle.objects.push(relationship);
        }
    }

    persistNode(node) {
        let nodeExists = false;
        // This will block generic observables
        // from persisting.
        if (node.type) {
            this.nodes.map(n => {
                if (node.id === n.id) {
                    nodeExists = true;
                }
            });

            if (!nodeExists) {
                this.nodes.push(node);
                this.addNodeToBundle(node);
            }

            return !nodeExists;
        }
    }

    removeKillChainPhase(value) {
        let props = this.selected.properties;
        let removeIdx = -1;

        // First we are going to remove the kill chain object
        // from the selected node.
        props.kill_chain_phases.value.map((phase, idx) => {
            if (phase.kill_chain_name === value.kill_chain_name && phase.phase_name === value.phase_name) {
                removeIdx = idx;
            }
        });

        if (removeIdx > -1) {
            props.kill_chain_phases.value.splice(removeIdx, 1);
        }

        // Now we are going to remove the kill chain object
        // from the bundle that is being built.
        this.bundle.objects.map(object => {
            removeIdx = -1;

            if (object.id === this.selected.id) {
                object.kill_chain_phases.map((phase, idx) => {
                    if (phase.kill_chain_name === value.kill_chain_name && phase.phase_name === value.phase_name) {
                        removeIdx = idx;
                    }
                });

                if (removeIdx > -1) {
                    object.kill_chain_phases.splice(removeIdx, 1);
                }
            }
        });
    }

    editNodeValues(event) {
        let props = this.selected.properties;
        let updateProps = {
            id: this.selected.id,
            value: event.currentTarget.value,
            name: event.currentTarget.name
        }

        // Array's clearly need different treatment than strings.
        if (props[updateProps.name].type === "array") {
            let idx;
            // We need to see if this is a push or
            // a splice.
            props[updateProps.name].value.map((prop, i) => {
                if (prop === updateProps.value) {
                    idx = i;
                }
            });
            // If the value exists, we know this is a splice or,
            // remove operation. Otherwise, the user is trying
            // to add a value.
            if (idx > -1) {
                props[updateProps.name].value.splice(idx, 1);
                this.removeNodeArrayValuesInBundle(updateProps);
            } else {
                props[updateProps.name].value.push(updateProps.value);
                this.updateNodeArrayValuesInBundle(updateProps);
            }
        } else if (props[updateProps.name].type === "object") {
            props[updateProps.name].value = updateProps.value;

            try {
                updateProps.value = JSON.parse(updateProps.value);
                this.updateNodeValuesInBundle(updateProps);
            } catch (error) {
                console.warn("not a valid object")
            }
        } else {
            props[updateProps.name].value = updateProps.value;
            this.updateNodeValuesInBundle(updateProps);
        }
    }

    updateNodeValuesInBundle(props) {
        this.bundle.objects.map(object => {
            if (object.id === props.id) {
                object[props.name] = props.value;
            }
        });
    }

    updateNodeArrayValuesInBundle(props) {
        this.bundle.objects.map(object => {
            if (object.id === props.id) {
                object[props.name].push(props.value);
            }
        });
    }

    addGenericObject(field, value) {
        let v = this.selected.properties[field].value;
        v = _merge(v, value);

        this.bundle.objects.map(object => {
            if (object.id === this.selected.id) {
                object[field] = v;
            }
        });
    }

    deleteGenericObject(field, key) {
        let v = this.selected.properties[field].value;

        delete v[key];

        this.bundle.objects.map(object => {
            if (object.id === this.selected.id) {
                object[field] = v;
            }
        });
    }

    /**
     * For editing CSV values we will do both the property
     * and the bundle updates in one function since they
     * are unique in how both are updated.
     */
    editCSVInput(event) {
        let props = this.selected.properties;
        let updateProps = {
            id: this.selected.id,
            value: event.currentTarget.value,
            name: event.currentTarget.name
        }

        props[updateProps.name].value = [];

        updateProps["value"] = updateProps["value"].replace(/, /g, ",");
        updateProps["value"] = updateProps["value"].replace(/ ,/g, ",");

        let newArray = updateProps["value"].split(",");

        if (!updateProps.value.length) {
            newArray = [];
        }

        newArray.map(item => {
            props[updateProps.name].value.push(item);
        });

        if (newArray.length > 0) {
            this.bundle.objects.map(object => {
                if (object.id === updateProps.id) {
                    object[updateProps.name] = [];
                    newArray.map(item => {
                        object[updateProps.name].push(item);
                    });
                }
            });
        } else {
            this.bundle.objects.map(object => {
                if (object.id === updateProps.id) {
                    object[updateProps.name] = [];
                }
            });
        }
    }

    removeNodeArrayValuesInBundle(props) {
        let idx;

        this.bundle.objects.map(object => {
            if (object.id === props.id) {
                object[props.name].map((item, i) => {
                    if (item === props.value) {
                        idx = i;
                    }
                });
            }

            if (idx > -1) {
                object[props.name].splice(idx, 1);
            }
        });
    }

    addDefaultObject(field) {
        const def = {
            "source_name": ""
        };

        this.selected.properties[field].value.push(def);

        this.bundle.objects.map(object => {
            if (object.id === this.selected.id) {
                object[field].push(def);
            }
        });
    }

    changeERValue(input, select, idx) {
        let nodeProp = this.selected.properties["external_references"].value;

        nodeProp[idx][select] = input;

        this.bundle.objects.map(object => {
            if (object.id === this.selected.id) {
                object["external_references"][idx][select] = input;
            }
        });
    }

    deleteERObjectProperty(select, idx) {
        let nodeProp = this.selected.properties["external_references"].value;

        delete nodeProp[idx][select];

        this.bundle.objects.map(object => {
            if (object.id === this.selected.id) {
                delete object["external_references"][idx][select];
            }
        });
    }

    blockDuplicateRelationships(source, target) {
        let alreadyRelated = false;

        this.edges.map(edge => {
            if (edge.source_ref === source && edge.target_ref === target) {
                alreadyRelated = true;
            }
        });

        return alreadyRelated;
    }

    makeRelationship(source, target, relationship) {

        let rel;
        let exclusiveRelationshipDefined = false;
        const alreadyRelated = this.blockDuplicateRelationships(source.id, target.id);

        // Some relationships are exclusive by nature.
        // This bit of code will protect that exclusivity.
        if (relationship.x_exclusive) {
            this.edges.map(edge => {
                if (edge.source_ref === source.id && relationship.type === edge.relationship_type) {
                    exclusiveRelationshipDefined = true;
                }
            });
        }

        if (!alreadyRelated && !exclusiveRelationshipDefined) {

            rel = {
                source_ref: source.id,
                target_ref: target.id,
                relationship_type: relationship.type,
                type: "relationship",
                created: moment(),
                modified: moment(),
                id: this.generateNodeID('relationship--'),
                targetObjectType: relationship.target
            };

            if (relationship["sub-target"]) {
                rel.subTarget = relationship["sub-target"];
            }

            // Identity and Sighting create an interesting relationship
            // in that Identity is the source and Sighting is the target.
            // However, the relationship is stored on the Sighting creating this
            // hybrid reverse scenario in the bundle but visually, it seems
            // normal.
            if (relationship.x_reverse) {
                rel.x_reverse = true;
            }

            if (relationship.x_embed) {
                rel.x_embed = relationship.x_embed;
            }
        }

        return rel;
    }

    canRelate(nodeOnScreen) {
        const nodeOnScreenType = nodeOnScreen.properties.type.enum[0];
        const draggingType = this.dragging.properties.type.enum[0];

        const alredyPushed = (rel, relationship) => {
            let found = false;

            rel.map(r => {
                let t = relationship["sub-target"] ? relationship["sub-target"] : relationship.target;

                if (r.targetObjectType === t && r.relationship_type === relationship.type) {
                    found = true;
                }
            });

            return found;
        }

        let rel = [];

        if (nodeOnScreen.id !== this.dragging.id) {
            nodeOnScreen.relationships.map(relationship => {
                if (relationship.target === draggingType) {
                    let madeRel = this.makeRelationship(nodeOnScreen, this.dragging, relationship);
                    if (madeRel && !alredyPushed(rel, relationship)) {
                        rel.push(madeRel);
                    }
                }
            });

            this.dragging.relationships.map(relationship => {
                if (relationship.target === nodeOnScreenType) {
                    let madeRel = this.makeRelationship(this.dragging, nodeOnScreen, relationship);
                    if (madeRel && !alredyPushed(rel, relationship)) {
                        rel.push(madeRel);
                    }
                }
            });
        }

        if (rel.length === 1) {
            rel = rel[0];
        } else if (rel.length === 0) {
            rel = undefined;
        }

        return rel;
    }

    addNodeWithRelationship(nodeOnScreen) {
        let relationship = this.canRelate(nodeOnScreen);
        const dragging = toJS(this.dragging);

        if (Array.isArray(relationship)) {
            this.relationships = relationship;
            this.showRelPicker = true;
        } else {
            let nodeToPersist = dragging;

            if (relationship) {
                // if the relationship is an observable, we need to swap
                // it out for the specific sub type.
                if (relationship.targetObjectType === "observable") {
                    if (nodeOnScreen.type === "observable") {
                    } else {
                        relationship = this.handleGenericObservable(relationship);
                    }

                } else {
                    this.edges.push(relationship);
                    this.persistNode(nodeToPersist);
                }

                this.addRelationshipToBundle(relationship);
                return relationship;

            } else {
                this.persistNode(nodeToPersist);
                return relationship;
            }
        }
    }

    getNodeByType(type) {
        let node = {};

        this.objects.map(object => {
            if (object.properties.type.enum[0] === type) {
                for (let key in object) {
                    node[key] = object[key];
                }
            }
        });

        return node;
    }

    getNodeById(id) {
        let node;

        this.nodes.map(n => {
            if (n.id === id) {
                node = n;
            }
        });

        return node;
    }

    /**
     * Observables are dragged onto other SDO's as a
     * generic object and transformed after the user selects
     * the specific, targeted observable.
     */
    handleGenericObservable(relationship) {
        let nodeToPersist = this.dragging;
        const newNode = this.getNodeByType(relationship.subTarget);

        newNode.id = this.generateNodeID(newNode.prefix);
        relationship.target_ref = newNode.id;
        nodeToPersist = newNode;

        this.edges.push(relationship);
        this.persistNode(nodeToPersist);
        this.dragging = nodeToPersist;

        return relationship;
    }

    /**
     * When an SDO or Observable can relate to another
     * SDO in more than one way, the user will need to select
     * manually.
     */
    manuallySelectRelationship(relationship) {
        let nodeToPersist = toJS(this.dragging);

        if (relationship.targetObjectType === "observable") {
            relationship = this.handleGenericObservable(relationship);
        } else {
            this.edges.push(relationship);
            this.persistNode(nodeToPersist);
        }

        this.addRelationshipToBundle(relationship);

        this.relationships = [];
        this.showRelPicker = false;

        return relationship;
    }

    createRelationshipFromPaste(key, node, id) {
        let def = this.getNodeByType(node.type);
        let targetExists = false;
        let r;
        let targetType;

        if (id) {
            targetType = id.split("--")[0];
        } else {
            targetType = node[key].split("--")[0];
        }

        this.nodes.map(n => {
            if (node[key] === n.id || id === n.id) {
                targetExists = true;
            }
        });

        if (targetExists) {
            def.relationships.map(relationship => {
                if (relationship.x_embed && (relationship.x_embed === key && relationship.target === targetType)) {
                    r = {
                        source_ref: node.id,
                        target_ref: id ? id : node[key],
                        relationship_type: relationship.type,
                        type: "relationship",
                        created: moment(),
                        modified: moment(),
                        id: this.generateNodeID('relationship--')
                    };
                }
            });
        }

        return r;
    }

    calculateLineDrag() {
        let me = this;

        let i = setInterval(() => {
            me.lines.map((line) => {
                line.position();
            });
        }, 1);

        setTimeout(() => {
            window.clearInterval(i);
        }, 1000);
    }

    loadBundleFromPaste() {
        this.reset();

        try {
            let bundle = JSON.parse(this.pasteBundle);

            // Handle SDO's first.
            bundle.objects.map(o => {
                if (o.type !== "relationship") {

                    let newNode = this.getNodeByType(o.type);
                    newNode.id = o.id;

                    for (let key in newNode.properties) {
                        newNode.properties[key].value = o[key];
                    }

                    this.persistNode(newNode);
                }
            });

            // Handle SRO's and synthetic relationships
            // after SDO's have been loaded.
            bundle.objects.map(o => {
                if (o.type === "relationship") {
                    this.edges.push(o);
                    this.bundle.objects.push(o);
                }

                if (o.type !== "relationship") {
                    for (let key in o) {
                        if ((key.indexOf("_ref") > -1 && o[key].length) && key !== "external_references") {
                            if (Array.isArray(o[key])) {
                                o[key].map(id => {
                                    let rel = this.createRelationshipFromPaste(key, o, id);

                                    if (rel) {
                                        this.edges.push(rel);
                                    }
                                })
                            } else {
                                let rel = this.createRelationshipFromPaste(key, o);

                                if (rel) {
                                    this.edges.push(rel);
                                }
                            }
                        }
                    }
                }
            });

            this.pasteBundle = "";
            this.showJSONPaste = false;

        } catch (e) {
            this.growlMessage = "Incorrect JSON Syntax.";
            this.showGrowl = true;
        }
    }

    deleteSelectedNode() {
        const nodeToDelete = this.selected;
        const removeEdgePositions = [];

        const removeEmbeddedTargetRelFromBundle = (rel, sourceNode, targetNode) => {
            this.bundle.objects.map(o => {
                if (o.id === sourceNode.id) {
                    if (Array.isArray(o[rel.x_embed])) {
                        o[rel.x_embed].map((r, i) => {
                            if (r === nodeToDelete.id) {
                                o[rel.x_embed].splice(i, 1);
                            }
                        });
                    } else {
                        o[rel.x_embed] = "";
                    }
                }
            });
        }

        const removeExternalRelFromBundle = (id) => {
            this.bundle.objects.map((rel, i) => {
                if (rel.id === id) {
                    this.bundle.objects.splice(i, 1);
                }
            });
        }

        let newLines = [];

        // Handle the edges that may be impacted by
        // removing a node.
        this.edges.map((rel, i) => {
            if (rel.source_ref === nodeToDelete.id) {
                let sourceNode = nodeToDelete.id;
                let targetNode = this.getNodeById(rel.target_ref);
                removeEdgePositions.push(i);

                // Need to account for the embedded reference anti-pattern.
                if (rel.x_reverse) {
                    removeEmbeddedTargetRelFromBundle(rel, targetNode, sourceNode);
                }

                removeExternalRelFromBundle(rel.id);

            } else if (rel.target_ref === nodeToDelete.id) {
                let targetNode = nodeToDelete.id;
                let sourceNode = this.getNodeById(rel.source_ref);
                removeEdgePositions.push(i);

                if (rel.x_embed) {
                    if (Array.isArray(sourceNode.properties[rel.x_embed])) {
                        sourceNode.properties[rel.x_embed].map((o, i) => {
                            if (o.id === targetNode) {
                                sourceNode.properties[rel.x_embed].splice(i, 1);
                            }
                        });
                    } else {
                        sourceNode.properties[rel.x_embed] = "";
                    }

                    removeEmbeddedTargetRelFromBundle(rel, sourceNode, targetNode);
                } else {
                    removeExternalRelFromBundle(rel.id);
                }
            }
        });

        for (let i = removeEdgePositions.length; i--;) {
            this.edges.splice(i, 1);
        }

        // Remove line the line SVG and push
        // any objects not being removed into the
        // temp array.
        this.lines.map((line, i) => {
            if (
                line.start.id === nodeToDelete.id ||
                line.end.id === nodeToDelete.id
            ) {
                line.remove();
            } else {
                newLines.push(line);
            }
        });

        this.lines = newLines;

        this.bundle.objects.map((o, i) => {
            if (o.id === nodeToDelete.id) {
                this.bundle.objects.splice(i, 1);
            }
        });

        // Remove the selected node from the nodes object.
        this.nodes.map((node, i) => {
            if (node.id === nodeToDelete.id) {
                this.nodes.splice(i, 1);
            }
        });

        this.showDetails = false;
    }

    validateSubmission() {
        let nodes = this.nodes;

        nodes.map(node => {
            for (let key in node.properties) {
                if (node.required && node.required.indexOf(key) > -1) {
                    // For required refs check the bundle
                    // instead of the node.
                    if (key.indexOf("_refs") > -1) {
                        this.bundle.objects.map(o => {
                            for (let item in o) {
                                if (item === key) {
                                    if (!o[item].length) {
                                        this.failedCollection.push({
                                            node: node.id,
                                            type: node.type,
                                            img: node.img,
                                            property: key,
                                            msg: "Required field, value must be provided."
                                        });
                                    }
                                }
                            }
                        });
                    } else {
                        if (node.properties[key].hasOwnProperty("value")) {
                            if (Array.isArray(node.properties[key].value)) {
                                if (!node.properties[key].value.length) {
                                    this.failedCollection.push({
                                        node: node.id,
                                        type: node.type,
                                        img: node.img,
                                        property: key,
                                        msg: "Required field, value must be provided."
                                    });
                                }
                            } else {
                                if (typeof node.properties[key].value === 'object') {
                                    if (!Object.keys(node.properties[key].value).length) {
                                        this.failedCollection.push({
                                            node: node.id,
                                            type: node.type,
                                            img: node.img,
                                            property: key,
                                            msg: "Required field, value must be provided."
                                        });
                                    }
                                } else {
                                    if (!node.properties[key].value.length) {
                                        this.failedCollection.push({
                                            node: node.id,
                                            type: node.type,
                                            img: node.img,
                                            property: key,
                                            msg: "Required field, value must be provided."
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    submit() {
        this.validateSubmission();

        const pruneRelationshipObjectProperties = (bundle) => {
            let pruneList = [
                "targetObjectType",
                "subTarget"
            ];

            bundle.objects.map(o => {
                if (o.type === "relationship") {
                    for (let key in o) {
                        if (pruneList.indexOf(key) > -1) {
                            delete o[key];
                        }
                    }
                }
            });

            return bundle;
        }


        if (!this.failedCollection.length) {
            let bundle = _cloneDeep(this.bundle);

            bundle.objects.map(o => {
                for (let key in o) {
                    if (Array.isArray(o[key])) {
                        if (!o[key].length) {
                            delete o[key];
                        }
                    } else {
                        if (typeof o[key] === 'object') {
                            if (!Object.keys(o[key]).length) {
                                delete o[key];
                            }
                        } else {
                            if (o[key] && !o[key].length) {
                                delete o[key];
                            }
                        }
                    }
                }
            });

            bundle = pruneRelationshipObjectProperties(bundle);

            /***
            TODO plumb in your API call
            **/
            Proxy.submit(bundle);

        } else {
            this.showSubmissionError = true;
        }
    }

    resetSubmissionError() {
        this.showSubmissionError = false;
        this.failedCollection = [];
    }

    reset() {
        this.showDetails = false;
        this.showJSON = false;
        this.showRelPicker = false;
        this.showGrowl = false;
        this.growlMessage = "";
        this.relationships = [];
        this.dragging = {};
        this.selected = {};
        this.bundle = {};
        this.nodes = [];
        this.edges = [];

        this.bundle.spec_version = SPEC_VERSION;
        this.bundle.id = this.generateNodeID("bundle--");
        this.bundle.type = "bundle";
        this.bundle.objects = [];

        this.lines.map(line => {
            line.remove();
        });

        this.lines = [];
    }
}
