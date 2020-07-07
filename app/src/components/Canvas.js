import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PropTypes from "prop-types";
import moment from "moment";
import Menu from "./menus/Menu";
import TopMenu from "./menus/TopMenu";
import Node from "./Node";
import LeaderLine from "leader-line";
import Details from "./Details";
import JsonViewer from "./JsonViewer";
import JsonPaste from "./JsonPaste";
import RelationshipPicker from "./RelationshipPicker";
import Growl from "./ui/growl/Growl";

import canvasStyle from "./canvas.scss";

@inject("store")
@observer
export default class Canvas extends React.Component {

    constructor(props) {
        super(props);

        this.store = this.props.store.appStore;

        this.generateNodeID = this.generateNodeID.bind(this);

        this.onDragStartHandler = this.onDragStartHandler.bind(this);
        this.onDragEndHandler = this.onDragEndHandler.bind(this);
        this.onDragOverHandler = this.onDragOverHandler.bind(this);
        this.onDropHandler = this.onDropHandler.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onDragOverNodeHandler = this.onDragOverNodeHandler.bind(this);
        this.onDropOnNodeHandler = this.onDropOnNodeHandler.bind(this);
        this.onClickShowJsonHandler = this.onClickShowJsonHandler.bind(this);
        this.onClickHideJsonHandler = this.onClickHideJsonHandler.bind(this);
        this.onClickHideRelPickerHandler = this.onClickHideRelPickerHandler.bind(this);
        this.onClickHideDetailsHandler = this.onClickHideDetailsHandler.bind(this);
        this.onClickSelectRelHandler = this.onClickSelectRelHandler.bind(this);
        this.onClickShowGrowlHandler = this.onClickShowGrowlHandler.bind(this);
        this.onChangeNodeHandler = this.onChangeNodeHandler.bind(this);
        this.onChangeDateHandler = this.onChangeDateHandler.bind(this);
        this.onMessageTimerHandler = this.onMessageTimerHandler.bind(this);
        this.onClickArrayHandler = this.onClickArrayHandler.bind(this);
        this.onChangeSliderHandler = this.onChangeSliderHandler.bind(this);
        this.onChangeCSVHandler = this.onChangeCSVHandler.bind(this);
        this.onClickBooleanHandler = this.onClickBooleanHandler.bind(this);
        this.onChangePhaseHandler = this.onChangePhaseHandler.bind(this);
        this.onClickRemovePhaseHander = this.onClickRemovePhaseHander.bind(this);
        this.onClickAddObjectHandler = this.onClickAddObjectHandler.bind(this);
        this.onClickDeletePropertyHandler = this.onClickDeletePropertyHandler.bind(this);
        this.onClickResetHandler = this.onClickResetHandler.bind(this);
        this.onChangeERHandler = this.onChangeERHandler.bind(this);
        this.onChangeGenericObjectHandler = this.onChangeGenericObjectHandler.bind(this);
        this.onClickAddGenericObjectHandler = this.onClickAddGenericObjectHandler.bind(this);
        this.onClickDeleteGenericObjectHandler = this.onClickDeleteGenericObjectHandler.bind(this);
        this.onClickAddTextHandler = this.onClickAddTextHandler.bind(this);
        this.resetBorders = this.resetBorders.bind(this);
        this.onClickHideJsonPasteHandler = this.onClickHideJsonPasteHandler.bind(this);
        this.onClickShowJsonPasteHandler = this.onClickShowJsonPasteHandler.bind(this);
        this.onChangeJSONPasteHandler = this.onChangeJSONPasteHandler.bind(this);
        this.onClickJSONPasteHandler = this.onClickJSONPasteHandler.bind(this);
        this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
    }

    componentWillMount() {
        document.addEventListener("dragover", (e) => {
            this.store.setMousePosition(e);
        }, false);
    }

    componentWillUnmount() {
        document.removeEventListener("dragover", (e) => {
        }, false);
    }

    onClickHandler(node) {
        this.store.showDetails = true;
        this.store.setSelected(node);
    }

    onClickHideDetailsHandler() {
        this.store.showDetails = false;
    }

    onClickHideJsonPasteHandler() {
        this.store.showJSONPaste = false;
    }

    onClickShowJsonPasteHandler() {
        this.store.showJSONPaste = true;
    }

    onClickShowGrowlHandler(message) {
        this.store.growlMessage = message;
        this.store.showGrowl = true;
    }

    transition(id, sticky, random) {
        const canvas = document.getElementById("canvas");
        const node = document.getElementById(id);
        const calculate = (min, max) => {
            return Math.random() * ((max-100) - min) + min;
        };
        const bounds = {
            top: canvas.offsetTop+50,
            bottom: (canvas.offsetTop-50) + canvas.clientHeight,
            left: canvas.offsetLeft+50,
            right: (canvas.offsetLeft-50) + canvas.clientWidth
        };

        if (node) {
            // the first time the node is dropped,
            // we have to do some class manipulation.
            if (!sticky) {
                node.classList.add('show-node');
                node.classList.remove('hide-node');
            }

            let clientX = this.store.mousePosition.clientX;
            let clientY = this.store.mousePosition.clientY;

            if (clientX < bounds.left) {
                clientX = bounds.left + 50;
            } else if (clientX > bounds.right) {
                clientX = bounds.right - 50;
            }

            if (clientY < bounds.top) {
                clientY = bounds.top + 50;
            } else if (clientX > bounds.right) {
                clientY = bounds.bottom - 50;
            }

            if (random) {
                node.style.left = `${calculate(bounds.left, bounds.right)}px`;
                node.style.top = `${calculate(bounds.top, bounds.bottom)}px`;
            } else {
                node.style.left = `${clientX+50}px`;
                node.style.top = `${clientY-50}px`;
            }
        }
    }

    onClickDeleteHandler() {
        this.store.deleteSelectedNode();
    }

    resetBorders() {
        this.store.failedRelationship = undefined;
    }

    onChangeNodeHandler(event) {
        this.store.editNodeValues(event);
    }

    mutateOnEvent(property, value) {
        const event = {
            currentTarget: {
                name: property,
                value: value
            }
        }

        this.onChangeNodeHandler(event);
    }

    onChangeDateHandler(property, datetime) {
        const value = moment(datetime).format()
        this.onChangeNodeHandler(property, value);
    }

    onClickArrayHandler(property, value) {
        this.mutateOnEvent(property, value);
    }

    onChangeSliderHandler(property, value) {
        this.mutateOnEvent(property, value);
    }

    onClickBooleanHandler(property, value) {
        this.mutateOnEvent(property, value);
    }

    onChangePhaseHandler(property, value) {
        this.mutateOnEvent(property, value);
    }

    onClickAddTextHandler(property, value) {
        this.mutateOnEvent(property, value);
    }

    onChangeGenericObjectHandler(property, event) {
        this.mutateOnEvent(property, event.currentTarget.value);
    }

    onClickRemovePhaseHander(property, value) {
        this.store.removeKillChainPhase(value);
    }

    onChangeCSVHandler(event) {
        this.store.editCSVInput(event);
    }

    onClickSelectRelHandler(rel) {
        const persisted = this.store.manuallySelectRelationship(rel);
        // if the node was persisted, we will want to move it
        // to a random place on the screen.
        if (persisted) {
            this.drawEdge(persisted);

            setTimeout(() => {
                this.transition(this.store.dragging.id, false);
            }, 500);
        }
    }

    onClickAddObjectHandler(field) {
        this.store.addDefaultObject(field);
    }

    onClickDeletePropertyHandler(select, idx) {
        this.store.deleteERObjectProperty(select, idx);
    }

    onChangeERHandler(input, select, idx) {
        this.store.changeERValue(input, select, idx);
    }

    generateNodeID(prefix) {
        return this.store.generateNodeID(prefix);
    }

    onClickShowJsonHandler() {
        this.store.showJSON = true;
    }

    onClickHideJsonHandler() {
        this.store.showJSON = false;
    }

    onChangeJSONPasteHandler(event) {
        this.store.pasteBundle = event.currentTarget.value;
    }

    onClickJSONPasteHandler() {
        this.store.loadBundleFromPaste();

        setTimeout(() => {
            this.store.nodes.map(n => {
                this.transition(n.id, false, true);
            });
        }, 200);

        this.store.edges.map(e => {
            this.drawEdge(e);
        });

        this.store.calculateLineDrag();
    }

    onClickHideRelPickerHandler() {
        this.store.showRelPicker = false;
    }

    onDragStartHandler(event) {
        let node = JSON.parse(event.dataTransfer.getData("node"));
        this.store.dragging = node;
    }

    onDragEndHandler(event) {
        this.store.calculateLineDrag();
    }

    // Drag over canvas
    onDragOverHandler(event) {
        event.preventDefault();
    }

    onMessageTimerHandler() {
        setTimeout(() => {
            this.store.showGrowl = false;
        }, 2500);
    }

    // Drop on canvas
    onDropHandler(event) {
        event.preventDefault();

        let node = JSON.parse(event.dataTransfer.getData("node"));

        if (node.properties.type.enum[0] === "observable") {
            this.store.growlMessage = "Observables can only be dropped onto existing STIX objects.";
            this.store.showGrowl = true;
            this.transition(node.id, true);
        } else {
            const persisted = this.store.persistNode(node);
            // if the node was persisted, we will want to move it
            // to a random place on the screen.
            if (persisted) {
                setTimeout(() => {
                    this.transition(node.id, false);
                }, 200);
            } else {
                this.transition(node.id, true);
            }
        }
    }

    //Drag over another node on the screen
    onDragOverNodeHandler(nodeOnScreen) {
        this.store.canRelate(nodeOnScreen);
    }

    //Drop on another node on the screen
    onDropOnNodeHandler(nodeOnScreen) {
        const persisted = this.store.addNodeWithRelationship(nodeOnScreen);

        if (persisted) {
            this.drawEdge(persisted);
        } else {
            setTimeout(() => {
                this.transition(this.store.dragging.id, false);
            }, 200);
        }
    }

    onClickAddGenericObjectHandler(field, o) {
        this.store.addGenericObject(field, o);
    }

    onClickDeleteGenericObjectHandler(field, key) {
        this.store.deleteGenericObject(field, key);
    }

    onClickResetHandler() {
        this.store.reset();
    }

    drawEdge(persisted) {
        let s = persisted.source_ref;
        let t = persisted.target_ref;

        setTimeout(() => {
            this.transition(this.store.dragging.id, false);

            let line = new LeaderLine(
                document.getElementById(s),
                document.getElementById(t)
            )

            let labelProps = LeaderLine.pathLabel(
                persisted.relationship_type, {
                    color: '#484d59',
                    outlineColor: '#484d59',
                    fontWeight: '1px',
                    letterSpacing: '2px',
                    lineOffset: '13px'
                }
            );

            line.setOptions({
                startSocket: 'disc',
                endSocket: 'disc',
                middleLabel: labelProps,
                dash: {
                    animation: false
                }
            });

            this.store.lines.push(line);

        }, 200);
    }

    render() {
        const nodes = this.store.nodes;
        const elements = Array.from(document.getElementsByTagName("svg"));

        // This ensures the edges drawn will not
        // interfere with the slide out panels.
        elements.map(element => {
            element.style.zIndex = "-1";
        });

        return (
            <div id="canvas"
                className="canvas"
                onDragOver={this.onDragOverHandler}
                onDrop={this.onDropHandler}>

                    {
                        nodes.map(n => {
                            return <Node key={n.id}
                                        n={n}
                                        failedRelationship={this.store.failedRelationship}
                                        resetBorders={this.resetBorders}
                                        onClickHandler={this.onClickHandler}
                                        onDragStartHandler={this.onDragStartHandler}
                                        onDragEndHandler={this.onDragEndHandler}
                                        onDragOverNodeHandler={this.onDragOverNodeHandler}
                                        onDropOnNodeHandler={this.onDropOnNodeHandler} />
                        })
                    }

                    <TopMenu onClickShowJsonHandler={this.onClickShowJsonHandler}
                        onClickShowJsonPasteHandler={this.onClickShowJsonPasteHandler}
                        onClickHideJsonHandler={this.onClickHideJsonHandler}
                        onClickResetHandler={this.onClickResetHandler} />

                    <Menu
                        objects={this.store.objects}
                        onDragStartHandler={this.onDragStartHandler}
                        generateNodeID={this.generateNodeID} />

                    <Details show={this.store.showDetails}
                        node={this.store.selected}
                        onClickHideHandler={this.onClickHideDetailsHandler}
                        onChangeNodeHandler={this.onChangeNodeHandler}
                        onChangeDateHandler={this.onChangeDateHandler}
                        onClickArrayHandler={this.onClickArrayHandler}
                        onChangeSliderHandler={this.onChangeSliderHandler}
                        onChangeCSVHandler={this.onChangeCSVHandler}
                        onClickBooleanHandler={this.onClickBooleanHandler}
                        onChangePhaseHandler={this.onChangePhaseHandler}
                        onClickRemovePhaseHander={this.onClickRemovePhaseHander}
                        onClickAddObjectHandler={this.onClickAddObjectHandler}
                        onChangeERHandler={this.onChangeERHandler}
                        onClickDeletePropertyHandler={this.onClickDeletePropertyHandler}
                        onChangeGenericObjectHandler={this.onChangeGenericObjectHandler}
                        onClickAddGenericObjectHandler={this.onClickAddGenericObjectHandler}
                        onClickDeleteGenericObjectHandler={this.onClickDeleteGenericObjectHandler}
                        onClickAddTextHandler={this.onClickAddTextHandler}
                        onClickDeleteHandler={this.onClickDeleteHandler} />

                    <JsonViewer show={this.store.showJSON}
                        json={this.store.bundle}
                        onClickHideHandler={this.onClickHideJsonHandler}
                        onClickShowGrowlHandler={this.onClickShowGrowlHandler} />

                    <JsonPaste show={this.store.showJSONPaste}
                        json={this.store.pasteBundle}
                        onClickHideHandler={this.onClickHideJsonPasteHandler}
                        onChangeJSONPasteHandler={this.onChangeJSONPasteHandler}
                        onClickJSONPasteHandler={this.onClickJSONPasteHandler}
                        value={this.store.pasteBundle} />

                    <RelationshipPicker show={this.store.showRelPicker}
                        relationships={this.store.relationships}
                        onClickHideHandler={this.onClickHideRelPickerHandler}
                        onClickSelectRelHandler={this.onClickSelectRelHandler} />

                    <Growl message={this.store.growlMessage}
                        show={this.store.showGrowl}
                        timer={this.onMessageTimerHandler} />
            </div>
        )
    }
}
