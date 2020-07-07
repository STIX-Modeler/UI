import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import textStyle from './button.scss';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onClickHandler = this.onClickHandler.bind(this);
    }

    onClickHandler() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    render() {
        const clickHandler = this.props.disabled ? undefined : this.onClickHandler;
        const classMap = {
            def: true,
            disabled: this.props.disabled,
        };
        if (this.props.cls) {
            classMap[this.props.cls] = true;
        }
        const classes = classNames(classMap);
        return (
            <div>
                <button className={classes} onClick={clickHandler} >
                    {this.props.children} {this.props.text}
                </button>
            </div>
        )
    }
}

Button.propTypes = {
    cls: PropTypes.string,
    disabled: PropTypes.bool,
    onClick: PropTypes.func
};
