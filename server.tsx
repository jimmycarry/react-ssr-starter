import * as lodash from 'lodash';
import { Provider } from 'mobx-react';
import * as React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { matchPath } from 'react-router';
import { StaticRouter } from 'react-router-dom';
import { App } from './src/App';
import { appStore } from './src/AppStore';
import { ContainerRoutes as routes } from './src/Routes';
import Template from './template';

export default (() => {
    return (req, res, next) => {
        const matches = lodash.reduce(routes, (result: any[], route) => {
            const match = matchPath(req.url, route);
            console.log('match', match);
            if (match) {
                if (result instanceof Array) {
                    if (route && route.component) {
                        result.push({
                            route,
                            match,
                            promise: route.component['fetchData'] ? route.component['fetchData'](appStore)
                                : Promise.resolve(0)
                        } as any);
                    } else {
                        result.push({
                            route,
                            match,
                            promise: Promise.resolve(0)
                        } as any);
                    }
                }
            }
            return result;
        }, []);
        console.log('matches', matches);
        if (matches.length === 0) {
            res.status(404);
        }
        const promises = matches.map((match) => match['promise']);
        Promise.all(promises).then((data) => {
            const context = {};
            console.log('data', JSON.stringify(data));
            const markup = ReactDOMServer.renderToString(
                <Provider {...appStore}>
                    <StaticRouter location={req.url} context={context}>
                        <App initialData={data} />
                    </StaticRouter>
                </Provider>
            );
            const helmet = Helmet.renderStatic();
            res.status(200).send(
                Template({ markup, helmet, props: data })
            );
            next();
        });
    };
});
