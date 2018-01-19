import { ContainerRoutes } from '@src/Routes';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router-dom';

require('./index.less');

interface IAppProps {
    initialData?: any[];
}

export class App extends React.Component<IAppProps, {}> {
    render() {
        console.log(this.props);
        return (
            <div className='react-app'>
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
                <Switch>
                    {
                        ContainerRoutes.map((item, index) => {
                            const routeProps = {
                                initialData: this.props.initialData ? this.props.initialData[index] : undefined
                            };
                            return <Route {...item} key={index} {...routeProps} />;
                        })
                    }
                </Switch>
            </div>

        );
    }
}
