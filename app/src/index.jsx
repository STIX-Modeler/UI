import React from 'react';
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { HashRouter } from "react-router-dom";
import stores from "./stores/Stores";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";
import App from './App.jsx';

const store = stores.inject({
    appStore: stores.appStore
});

const renderApp = () => {
	render(
        <AppContainer>
    		<Provider store={store}>
                <HashRouter>
    			    <App />
                </HashRouter>
    		</Provider>
        </AppContainer>,
		document.getElementById("app")
	);
};

renderApp();
