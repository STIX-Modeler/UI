import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import classNames from "classnames";

import csvStyle from "./boolean.scss";

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
        const value = this.props.selected;
        let trueCls = classNames({
            selected: false
        });

        let falseCls = classNames({
            selected: false
        });

        if (value) {
            trueCls = classNames({
                selected: true
            });
        } else {
            falseCls = classNames({
                selected: true
            });
        }

        return (
            <div className="boolean">
                <div className={trueCls} onClick={() => this.props.onClick(this.props.name, true)}>True</div>
                <div className={falseCls} onClick={() => this.props.onClick(this.props.name, false)}>False</div>
            </div>
        )
    }
}
