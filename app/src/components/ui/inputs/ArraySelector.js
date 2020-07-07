import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import classNames from "classnames";
import Tooltip from "react-tooltip";

import arrStyle from "./arrayselector.scss";

@inject("store")
@observer
export default class ArraySelector extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    onClickHandler(field, value) {
        this.props.onClickHandler(field, value);
    }

    render() {
        const items = this.props.vocab ? this.props.vocab : [];
        const field = this.props.field;
        const value = this.props.value;
        const description = this.props.description;

        let cls = classNames({
            "array-container-item": true
        });

        return (
            <div className="array-container">
                <div className="array-container-header">
                    {field} <span data-tip={description} className="material-icons">info</span>
                </div>
                <div className="array-container-body">
                    {
                        items.map((item, i) => {
                            if (value.indexOf(item) > -1) {
                                cls = classNames({
                                    "array-container-item": true,
                                    "array-container-selected": true
                                });
                            } else {
                                cls = classNames({
                                    "array-container-item": true
                                });
                            }
                            return <div className={cls} key={i} onClick={() => this.onClickHandler(field, item)}>{item}</div>
                        })
                    }
                </div>
            </div>
        )
    }
}
