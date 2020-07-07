import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";
import PropTypes from "prop-types";
import Panel from "./ui/panel/Panel";

import relationshipPickerStyle from './relationship-picker.scss';

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

const images = importAll(require.context('../imgs', false, /\.(png|jpe?g|svg)$/));

@observer
export default class RelationshipPicker extends React.Component {

    constructor(props) {
        super(props);
	}

    onClickSelectRelHandler(relationship) {
        this.props.onClickSelectRelHandler(relationship);
    }

    render() {
        return (
            <Panel show={this.props.show}
                onClickHideHandler={this.props.onClickHideHandler}>
                    <div className="relationship-picker">
                        <div className="header"><img src={images["relationship.png"].default} width="20" /> Possible Relationships</div>
                        <div className="content">
                            {
                                this.props.relationships.map(relationship => {

                                    let src = relationship.source_ref.split("--")[0];
                                    let target = relationship.target_ref.split("--")[0];
                                    let srcImg = `${src}.png`;
                                    let targetImg = `${target}.png`;

                                    if (!images[srcImg]) {
                                        images[srcImg] = {};
                                        images[srcImg].default = "imgs/3536f3f7f55d746d1a9eac4ca5073246.png";
                                    }

                                    if (!images[targetImg]) {
                                        images[targetImg] = {};
                                        images[targetImg].default = "imgs/3536f3f7f55d746d1a9eac4ca5073246.png";
                                    }

                                    if (relationship.subTarget) {
                                        target = relationship.subTarget;
                                    }

                                    return <div className="item" key={relationship.id}
                                        onClick={() => this.onClickSelectRelHandler(relationship)}>
                                             <img className="src-image" src={images[srcImg].default} width="20" /> {src}
                                             <span className="rel-type"> {relationship.relationship_type} </span>
                                              {target} <img className="target-image" src={images[targetImg].default} width="20" />
                                        </div>
                                })
                            }
                        </div>
                    </div>
            </Panel>
        )
    }
}
