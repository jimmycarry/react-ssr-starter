import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from '@src/App';
import { Provider } from 'mobx-react';
import { AppStore, Store } from '@src/AppStore';
declare var window: {
    initialState: AppStore;
}
let appStore: AppStore = {

};
for (const key in window.initialState) {
    appStore[key] = new Store[key](window.initialState[key]);
}
ReactDOM.hydrate((
    <Provider {...appStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));
