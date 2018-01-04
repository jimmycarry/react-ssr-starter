import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import Template from './template';
import { Helmet } from "react-helmet";
import { App } from '@src/App';
import { Provider } from 'mobx-react';
import { appStore } from '@src/AppStore';

export default (() => {
    return (req, res, next) => {
        const context = {};
        const markup = ReactDOMServer.renderToString(
            <Provider {...appStore}>
                <StaticRouter location={req.url} context={context}>
                    <App />
                </StaticRouter>
            </Provider>
        );
        const helmet = Helmet.renderStatic()
        res.status(200).send(
            Template({ markup: markup, helmet: helmet }),
        );
        next();
    }
});
