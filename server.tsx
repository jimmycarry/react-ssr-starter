import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Template from './template';
import { Helmet } from "react-helmet";
import { App } from '@src/App';

export default function serverRenderer({ clientStatus, serverStatus }) {
    return ( req, res, next ) => {
        const context = {};
        const markup = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        );
        const helmet = Helmet.renderStatic()
        res.status(200).send(
            Template({ markup: markup, helmet: helmet }),
        );
    };
}