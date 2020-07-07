import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PropTypes from "prop-types";

import menuStyle from "./menu.scss";

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../../imgs', false, /\.(png|jpe?g|svg)$/));

@observer
export default class Menu extends React.Component {

    constructor(props) {
        super(props);

        this.onDragStartHandler = this.onDragStartHandler.bind(this);
	}

    onDragStartHandler(event) {
        const id = this.props.generateNodeID(this.props.o.prefix);
        this.props.o.id = id;
        event.dataTransfer.setData("node", JSON.stringify(this.props.o));

        this.props.onDragStartHandler(event);
    }

    render() {
        const o = this.props.o;

        return (
            <div className="menu-item"
                draggable="true"
                onDragStart={this.onDragStartHandler}>
                    <img src={images[o.img].default} draggable="false" />
            </div>
        )
    }
}
