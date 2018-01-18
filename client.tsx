
import { Provider } from 'mobx-react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './src/App';
import { IAppStore, Store } from './src/AppStore';

declare var window: {
    initialState: IAppStore;
};

const appStore: IAppStore = {

};
for (const key in window.initialState) {
    if (window.initialState.hasOwnProperty(key)) {
        appStore[key] = new Store[key](window.initialState[key]);
    }

}
ReactDOM.hydrate((
    <Provider {...appStore}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));
