import React from "react";
import { inject, observer } from "mobx-react";
import Tooltip from "react-tooltip";

import menuStyle from './top-menu.scss';

@observer
export default class TopMenu extends React.Component {

    constructor(props) {
        super(props);
	}

    render() {
        return (
            <div className="top-menu">
                <div className="row">
                    <div data-tip={"Paste JSON"} className="json-paste-btn menu-item-medium" onClick={this.props.onClickShowJsonPasteHandler}>
                        {"{ + }"}
                    </div>

                    <div data-tip={"View JSON"} className="json-btn menu-item-small" onClick={this.props.onClickShowJsonHandler}>
                        {"{ }"}
                    </div>

                    <div data-tip={"Clear JSON"} className="reset-btn menu-item" onClick={this.props.onClickResetHandler}>
                        <span className="i material-icons">refresh</span> Reset
                    </div>

                    <Tooltip />
                </div>
            </div>
        )
    }
}
