import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import Panel from "./ui/panel/Panel";
import Button from "./ui/button/Button";


import detailsStyle from './json-viewer.scss';

@observer
export default class JsonViewer extends React.Component {

    constructor(props) {
        super(props);

        this.onClickCopyJSONHandler = this.onClickCopyJSONHandler.bind(this);
	}

    onClickCopyJSONHandler() {
        let me = this;
        let range = document.createRange();
        let message = "JSON Copied to Clipboard";

        range.selectNode(
            document.getElementById("json-content")
        );

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");

        window.getSelection().removeAllRanges();

        this.props.onClickShowGrowlHandler(message);
    }

    render() {
        return (
            <Panel show={this.props.show}
                onClickHideHandler={this.props.onClickHideHandler}>
                    <div className="json-viewer">
                        <pre id="json-content">{JSON.stringify(this.props.json, null, 2)}</pre>

                        <div className="json-controls">
                            <Button cls="def standard json-copy" text="Copy" onClick={this.onClickCopyJSONHandler}>
                                <i className="material-icons">file_copy</i>
                            </Button>
                        </div>
                    </div>
            </Panel>
        )
    }
}
