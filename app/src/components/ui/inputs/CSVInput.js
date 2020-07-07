import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import classNames from "classnames";
import Tooltip from "react-tooltip";
import Text from "./Text";

import csvStyle from "./csvselector.scss";

@inject("store")
@observer
export default class ArraySelector extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    onClickHandler(field, value) {
        this.props.onClickHandler(field, value);
    }

    render() {

        const value = this.props.value.join();

        return (
            <Text name={this.props.name}
                value={value}
                onChange={this.props.onChangeHandler} />
        )
    }
}
