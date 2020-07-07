import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import classNames from "classnames";

import growlStyle from './growl.scss';

@observer
export default class Growl extends React.Component {

    constructor(props) {
        super(props);
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
            growl: true,
            'hide-mask': !this.props.show
        });

        if (this.props.timer) {
            this.props.timer();
        }

        return (
            <div className={cls}>
                <div className="panel">
                    {this.props.message}
                </div>
            </div>
        )
    }
}
