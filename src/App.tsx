import { Menu } from '@src/Menu';
import { ContainerRoutes } from '@src/Routes';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <h1>Hello Server Side</h1>
                <Helmet
                    htmlAttributes={{ lang: 'en', amp: undefined }} // amp takes no value
                    titleTemplate='%s | React App'
                    titleAttributes={{ itemprop: 'name', lang: 'en' }}
                    meta={[
                        { name: 'description', content: 'Server side rendering example' },
                        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
                    ]}
                    link={
                        process.env.NODE_ENV === 'production' ?
                            [{ href: '/static/styles.css', rel: 'stylesheet' }]
                            : undefined
                    }
                />
                <Menu />
                <Switch>
                    {
                        ContainerRoutes.map((item, index) => {
                            return <Route {...item} key={index} />;
                        })
                    }
                </Switch>
            </div>

        );
    }
}
