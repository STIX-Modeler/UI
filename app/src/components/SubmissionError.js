import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import Panel from "./ui/panel/Panel";
import Button from "./ui/button/Button";

import seStyle from './submission-error.scss';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../imgs', false, /\.(png|jpe?g|svg)$/));

@observer
export default class SubmissionError extends React.Component {

    constructor(props) {
        super(props);
	}

    render() {
        let error = this.props.error.length ? this.props.error : [];
        let errorStructure = {};
        let msg = [];

        this.props.error.map((item, i) => {
            if (!errorStructure.hasOwnProperty(item.node)) {
                errorStructure[item.node] = {};
                errorStructure[item.node]["details"] = [];
                errorStructure[item.node]["img"] = item.img;
                errorStructure[item.node]["details"].push({
                    msg: item.msg,
                    property: item.property
                });
            } else {
                errorStructure[item.node]["details"].push({
                    msg: item.msg,
                    property: item.property
                });
            }
        });


        for (let item in errorStructure) {
            let details = [];

            if (errorStructure[item].details) {
                errorStructure[item].details.map((detail) => {
                    details.push(
                        <div key={detail.property} className="row"><span>{detail.property}:</span> {detail.msg}</div>
                    )
                });

                msg.push(
                    <div key={item}>
                        <div className="header"><img src={images[errorStructure[item].img].default} width="30" /> {item}</div>
                        <div className="rows-container">
                            {details}
                        </div>
                    </div>
                )
            }
        }


        return (
            <Panel show={this.props.show}
                onClickHideHandler={this.props.onClickHideHandler}>
                    <div className="submission-error">
                        {msg}
                    </div>
            </Panel>
        )
    }
}
