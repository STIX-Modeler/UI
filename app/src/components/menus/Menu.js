import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import MenuItem from "./MenuItem";

import menuStyle from './menu.scss';

@observer
export default class Menu extends React.Component {

    constructor(props) {
        super(props);
	}

    render() {
        return (
            <div className="menu">
                <div className="row">
                    {
                        this.props.objects.map((o, i) => {
                            if (o.active) {
                                return <MenuItem
                                            key={i}
                                            o={o}
                                            onDragStartHandler={this.props.onDragStartHandler}
                                            generateNodeID={this.props.generateNodeID} />
                            }
                        })
                    }
                </div>
            </div>
        )
    }
}
