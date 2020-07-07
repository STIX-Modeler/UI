import React, { Component } from 'react';
import {toJS} from 'mobx';
import {observer, inject} from 'mobx-react';
import { hot } from 'react-hot-loader/root';
import {withRouter, Route, NavLink, useParams} from "react-router-dom";
import LazyRoute from "lazy-route";

import defaultStyle from "./app.scss";

import Canvas from './components/Canvas';

@withRouter
@inject("store")
@observer
class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="content">
                <Route
                    exact
                    path={'/'}
                    render={(props) =>
                        <Canvas {...props}/>}
                />

            </div>
        )
    }
}

export default hot(App);
