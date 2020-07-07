import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import classNames from "classnames";

import panelStyle from './panel.scss';

@observer
export default class Panel extends React.Component {

    constructor(props) {
        super(props);

        this.onClickHideHandler = this.onClickHideHandler.bind(this);
	}

    onClickHideHandler() {
        if (this.props.onClickHideHandler) {
            this.props.onClickHideHandler();
        } else {
            console.warn("No JSON Viewer close handler");
        }

    }

    onClickPanelHandler(event) {
        event.stopPropagation();
    }

    render() {
        const cls = classNames({
            mask: true,
            'hide-mask': !this.props.show
        });

        return (
            <div className={cls} onClick={this.onClickHideHandler}>
                <div className="panel" onClick={this.onClickPanelHandler}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
