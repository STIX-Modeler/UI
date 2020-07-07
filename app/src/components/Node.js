import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PropTypes from "prop-types";
import classNames from "classnames";

import nodeStyle from './node.scss';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../imgs', false, /\.(png|jpe?g|svg)$/));

@observer
export default class Node extends React.Component {

    constructor(props) {
        super(props);

        this.onDragStartHandler = this.onDragStartHandler.bind(this);
        this.onDragOverHandler = this.onDragOverHandler.bind(this);
        this.onDropHandler = this.onDropHandler.bind(this);
        this.onDragEndHandler = this.onDragEndHandler.bind(this);
        this.onDragLeaveHandler = this.onDragLeaveHandler.bind(this);
	}

    onClickHandler(node) {
        this.props.onClickHandler(node);
    }

    onDragStartHandler(event) {
        event.dataTransfer.setData("node", JSON.stringify(this.props.n));
        this.props.onDragStartHandler(event);
    }

    onDragEndHandler(event) {
        this.props.onDragEndHandler(event);
    }

    onDragOverHandler(event) {
        event.preventDefault();
        this.props.onDragOverNodeHandler(this.props.n);
    }

    onDropHandler(event) {
        event.preventDefault();
        this.props.onDropOnNodeHandler(this.props.n);
        this.props.resetBorders();
        event.stopPropagation();
    }

    onDragLeaveHandler(event) {
        this.props.resetBorders();
    }

    render() {
        const node = this.props.n;
        let hide = true;

        const cls = classNames({
            node: true,
            'hide-node': hide
        });

        let display = node.id.split("--")[0];

        if (node.properties.name && node.properties.name.value) {
            display = node.properties.name.value;
        }

        return (
            <div id={node.id}
                className={cls}
                draggable="true"
                onClick={() => this.onClickHandler(node)}
                onDragStart={this.onDragStartHandler}
                onDragEnd={this.onDragEndHandler}
                onDragOver={this.onDragOverHandler}
                onDrop={this.onDropHandler}
                onDragLeave={this.onDragLeaveHandler}>
                    <img src={images[node.img].default} draggable="false" /> {display}
            </div>
        )
    }
}
