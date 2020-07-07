import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import classNames from "classnames";
import Tooltip from "react-tooltip";
import TextArea from "../inputs/TextArea";
import uuid from "uuid";

import confirmTextareaStyle from "./confirmtextarea.scss";

@inject("store")
@observer
export default class ConfirmTextarea extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeInputHandler = this.onChangeInputHandler.bind(this);
        this.onClickAddObjectHandler = this.onClickAddObjectHandler.bind(this);
        this.onClickDeleteHandler = this.onClickDeleteHandler.bind(this);

        this.state = {
            value: ""
        };
    }

    componentDidMount() {

    }

    onChangeInputHandler(event) {
        event.preventDefault();

        this.setState({
            value: event.currentTarget.value
        });
    }

    onClickDeleteHandler(select, idx) {
        this.props.onClickDeletePropertyHandler(select, idx);
    }

    onClickAddObjectHandler() {
        this.props.onClickAddTextHandler(this.props.field, this.state.value);
    }

    render() {
        const field = this.props.field;
        const value = this.props.value ? this.props.value : [];
        const description = this.props.description;
        const rows = [];

        return (
            <div className="ct-container">
                <div className="ct-header">
                    {field}
                    <span data-tip={description} className="material-icons">info</span>
                    <Tooltip />
                </div>
                <div className="ct-body">
                    <div className="ct-block-input">
                        <div className="input">
                            <TextArea value={this.state.value}
                                name={field}
                                onChange={this.onChangeInputHandler} />
                        </div>
                        <div className="add-container">
                            <span onClick={this.onClickAddObjectHandler} className="add material-icons">control_point</span>
                        </div>
                    </div>

                    <div className="ct-output">
                        {value}
                    </div>
                </div>
            </div>
        )
    }
}
