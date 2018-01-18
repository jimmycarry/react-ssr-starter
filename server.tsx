import { Provider } from 'mobx-react';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { StaticRouter } from 'react-router-dom';
import { App } from './src/App';
import { appStore } from './src/AppStore';
import Template from './template';

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
        const helmet = Helmet.renderStatic();
        res.status(200).send(
            Template({ markup, helmet })
        );
        next();
    };
});
