import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import Tooltip from "react-tooltip";
import PropTypes from "prop-types";
import Panel from "./ui/panel/Panel";
import Slider from "./ui/inputs/Slider";
import Text from "./ui/inputs/Text";
import TextArea from "./ui/inputs/TextArea";
import DateTime from "./ui/inputs/DateTime";
import ArraySelector from "./ui/inputs/ArraySelector";
import KillChain from "./ui/complex/KillChain";
import ExternalReferences from "./ui/complex/ExternalReferences";
import CSVInput from "./ui/inputs/CSVInput";
import Boolean from "./ui/inputs/Boolean";
import GenericObject from "./ui/complex/GenericObject";
import ConfirmTextarea from "./ui/complex/ConfirmTextarea";
import uuid from "uuid";

import detailsStyle from './details.scss';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../imgs', false, /\.(png|jpe?g|svg)$/));

@observer
export default class Details extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onChangeDateHandler = this.onChangeDateHandler.bind(this);
	}

    onChangeHandler(event) {
        this.props.onChangeNodeHandler(event);
    }

    onChangeDateHandler(property, datetime) {
        this.props.onChangeDateHandler(property, datetime);
    }

    render() {
        const node = toJS(this.props.node);
        let props = {};
        let img;
        let details = [];

        let deleteIcon = <span className="material-icons">delete_forever</span>;

        if (node.properties) {
            props = node.properties;
            img = <img src={images[node.img].default} width="30" />;
        }

        for (let prop in props) {

            let header = <div className="item-header">{prop}
                    <span data-tip={props[prop].description} className="material-icons">info</span>
                    <Tooltip />
                </div>

            let control = <div className="item" key={prop}>
                {header}
                <div className="item-value">{props[prop].value}</div>
            </div>;
            // If there is no type, we do not want to process. If a "control"
            // is defined, that indicates special handling of the value.
            if (props[prop].type && !props[prop].control) {
                switch (props[prop].type) {
                    case "number":
                    case "string":
                        control = <div className="item" key={prop}>
                            {header}
                            <div className="item-value">
                                <Text name={prop}
                                    value={props[prop].value}
                                    onChange={this.onChangeHandler} />
                            </div>
                        </div>
                        break;
                    case "dts":
                        control = <div className="item" key={prop}>
                            {header}
                            <div className="item-value">
                                <DateTime name={prop}
                                    selected={props[prop].value}
                                    onChange={this.onChangeDateHandler} />
                            </div>
                        </div>
                        break;
                    case "array":
                        control = <ArraySelector vocab={props[prop].vocab}
                                        key={prop}
                                        field={prop}
                                        value={props[prop].value}
                                        description={props[prop].description}
                                        onClickHandler={this.props.onClickArrayHandler} />
                        break;
                    case "boolean":
                        control = <div className="item" key={prop}>
                            {header}
                            <div className="item-value">
                                <Boolean name={prop}
                                    selected={props[prop].value}
                                    onClick={this.props.onClickBooleanHandler} />
                            </div>
                        </div>
                        break
                    case "object":
                        control = <div className="item" key={prop}>
                            {header}

                        </div>
                        break
                }
            }

            switch (props[prop].control) {
                case "hidden":
                    control = "";
                    break;
                case "slider":
                    control = <div className="item slider" key={prop}>
                        {header}
                        <div className="item-value">
                            <Slider value={props[prop].value}
                                field={prop}
                                onChangeHandler={this.props.onChangeSliderHandler} />
                        </div>
                    </div>
                    break;
                case "csv":
                    control = <div className="item" key={prop}>
                        {header}
                        <div className="item-value">
                            <CSVInput key={prop}
                                    name={prop}
                                    value={props[prop].value}
                                    onChangeHandler={this.props.onChangeCSVHandler} />
                        </div>
                    </div>
                    break;
                case "killchain":
                    control = <KillChain vocab={props[prop].vocab}
                                    node={node}
                                    key={prop}
                                    field={prop}
                                    value={props[prop].value}
                                    description={props[prop].description}
                                    onChangeHandler={this.props.onChangePhaseHandler}
                                    onClickRemoveHandler={this.props.onClickRemovePhaseHander} />
                    break;
                case "externalrefs":
                    control = <ExternalReferences node={node}
                                    key={prop}
                                    field={prop}
                                    value={props[prop].value}
                                    description={props[prop].description}
                                    onClickAddObjectHandler={this.props.onClickAddObjectHandler}
                                    onChangeERHandler={this.props.onChangeERHandler}
                                    onClickDeletePropertyHandler={this.props.onClickDeletePropertyHandler} />
                    break;
                case "stringselector":
                    control = <ArraySelector vocab={props[prop].vocab}
                                    key={prop}
                                    field={prop}
                                    value={props[prop].value}
                                    description={props[prop].description}
                                    onClickHandler={this.props.onClickArrayHandler} />
                    break;
                case "textarea":
                    control = <div className="item" key={prop}>
                        {header}
                        <div className="item-value">
                            <TextArea name={prop}
                                value={props[prop].value}
                                onChange={this.onChangeHandler} />
                        </div>
                    </div>
                    break;
                case "genericobject":
                    control = <GenericObject name={prop}
                                value={props[prop].value}
                                description={props[prop].description}
                                key={uuid()}
                                field={prop}
                                onClickAddObjectHandler={this.props.onClickAddGenericObjectHandler}
                                onClickDeleteObjectHandler={this.props.onClickDeleteGenericObjectHandler}
                                onChangeHandler={this.props.onChangeGenericObjectHandler} />
                    break;
                case "confirmtextarea":
                    control = <ConfirmTextarea name={prop}
                                value={props[prop].value}
                                description={props[prop].description}
                                key={uuid()}
                                field={prop}
                                onClickAddTextHandler={this.props.onClickAddTextHandler} />
                    break;

            }

            details.push(
                control
            )
        }

        return (
            <Panel show={this.props.show} onClickHideHandler={this.props.onClickHideHandler}>
                <div className="details">
                    <div className="header">
                        <div className="title">{img} {node.id}</div>
                        <div className="delete" onClick={this.props.onClickDeleteHandler}>{deleteIcon} <span className="text">Delete</span></div>
                    </div>
                    <div className="body">
                        {details}
                    </div>

                    <div className="footer"></div>
                </div>
            </Panel>
        )
    }
}
