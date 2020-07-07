import React from "react";
import { inject, observer } from "mobx-react";
import { toJS } from "mobx";

import RCSlider from "rc-slider/lib/Slider";
import 'rc-slider/assets/index.css'

import textStyle from "./slider.scss";

@inject("store")
@observer
export default class Slider extends React.Component {

    constructor(props) {
        super(props);

        this.onChangeSliderHandler = this.onChangeSliderHandler.bind(this);
    }

    onChangeSliderHandler(value) {
        this.props.onChangeHandler(this.props.field, value);
    }

    render() {
        return (
            <RCSlider className="horizontal-slider"
                value={this.props.value}
                marks={{ 10: 10, 20: 20, 30: 30, 40: 40, 50: 50, 60: 60, 70: 70, 80: 80, 90: 90, 100: 100 }}
                onChange={this.onChangeSliderHandler} />
        )
    }
}
