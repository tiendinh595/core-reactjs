import React from 'react'
import ReactDOM from 'react-dom'
import 'babel-polyfill';
import {Provider} from 'mobx-react'
import App from 'Components/App'
import {
    userStore,
    profileStore,
    authStore,
    commonStore
} from 'Stores'

const stores = {
    userStore,
    profileStore,
    authStore,
    commonStore
};

window._____APP_STATE_____ = stores;

ReactDOM.render(
    <Provider {...stores}>
        <App />
    </Provider>,
    document.getElementById('root')
);