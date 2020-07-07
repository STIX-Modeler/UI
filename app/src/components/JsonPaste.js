import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import Panel from "./ui/panel/Panel";
import Button from "./ui/button/Button";
import TextArea from "./ui/inputs/TextArea";


import detailsStyle from './json-paste.scss';

@observer
export default class JsonPaste extends React.Component {

    constructor(props) {
        super(props);
	}

    render() {
        return (
            <Panel show={this.props.show}
                onClickHideHandler={this.props.onClickHideHandler}>
                    <div className="json-paste">

                        <div className="paste-area">
                            <TextArea onChange={this.props.onChangeJSONPasteHandler} value={this.props.value} />
                        </div>

                        <div className="json-controls">
                            <Button cls="def standard json-copy" text="Load" onClick={this.props.onClickJSONPasteHandler}>
                                <i className="material-icons">add</i>
                            </Button>
                        </div>
                    </div>
            </Panel>
        )
    }
}
