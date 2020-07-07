import React from 'react';
import {observer, inject} from 'mobx-react';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import dateStyle from './datetime.scss';

export default class DateTime extends React.Component {

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(datetime) {
        this.props.onChange(this.props.name, datetime);
    }

    render() {
        let dts = this.props.selected;

        if (typeof dts === 'string') {
            let dateObj = new Date(dts);
            dts = dateObj;
        }

        return (
            <DatePicker selected={dts} onChange={this.onChange} name={this.props.name} />
        )
    }
}
