import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import classNames from "classnames";
import Tooltip from "react-tooltip";
import Text from "../inputs/Text";
import uuid from "uuid";

import killChainStyle from "./externalreferences.scss";

@inject("store")
@observer
export default class ExternalReferences extends React.Component {

    constructor(props) {
        super(props);

        this.onClickHandler = this.onClickHandler.bind(this);
        this.onChangeERHandler = this.onChangeERHandler.bind(this);
        this.onClickAddHandler = this.onClickAddHandler.bind(this);
        this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);
    }

    componentDidMount() {

    }

    onChangeERHandler(event, value) {
        return undefined;
    }

    onClickAddHandler(input, select, idx) {
        this.props.onChangeERHandler(input.value, select.options[select.selectedIndex].value, idx);
        input.value = "";
    }

    onClickHandler() {
        const property = this.state.property;
        const value = this.state.value;
    }

    onClickDeleteHandler(select, idx) {
        this.props.onClickDeletePropertyHandler(select, idx);
    }

    render() {
        const vocab = this.props.vocab ? this.props.vocab : [];
        const field = this.props.field;
        const value = this.props.value;
        const description = this.props.description;

        const len = value.len;

        return (
            <div className="er-container">
                <div className="er-header">
                    {field}
                    <span data-tip={description} className="material-icons">info</span>
                    <span data-tip="Add an External Reference" onClick={() => this.props.onClickAddObjectHandler(field)} className="add material-icons">control_point</span>
                    <Tooltip />
                </div>
                <div className="er-body">
                    {
                        value.map((p, i) => {
                            return (
                                <ReferenceBlock key={i}
                                    i={i}
                                    kv={p}
                                    onChangeERHandler={this.onChangeERHandler}
                                    onClickAddHandler={this.onClickAddHandler}
                                    onClickDeleteHandler={this.onClickDeleteHandler} />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

const ReferenceBlock = (props) => {
    const blocks = [];
    const idx = props.i;
    const selectID = `select-${props.i}`;
    const inputID = `input-${props.i}`;

    const propValues = [
        "source_name",
        "description",
        "url",
        "hashes",
        "external_id"
    ];

    for (let item in props.kv) {
        let remove = <span onClick={() => props.onClickDeleteHandler(item, props.i)} className="remove material-icons">highlight_off</span>;

        if (item === "source_name") {
            remove = undefined;
        }

        blocks.push(
            <div key={uuid()} className="er-block-row">
                <div>{item}: {props.kv[item]} {remove}</div>
            </div>
        )
    }

    return <div className="er-block">
        <div className="er-block-row">
            <select id={selectID}>
                {
                    propValues.map(prop => {
                        return <option key={uuid()} value={prop}>{prop}</option>
                    })
                }
            </select>
            <Text id={inputID} onChange={props.onChangeERHandler} />
            <span className="add material-icons" onClick={() => props.onClickAddHandler(document.getElementById(inputID), document.getElementById(selectID), props.i)}>control_point</span>
        </div>
        {blocks}
    </div>
}
