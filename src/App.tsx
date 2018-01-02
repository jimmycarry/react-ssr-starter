import * as React from 'react';

import { Switch, Route } from 'react-router-dom';

import { HomePage } from './containers/HomePage';
import { AboutPage } from '@src/containers/AboutPage';
import { Menu } from '@src/Menu';
import { Helmet } from 'react-helmet';

export class App extends React.Component<{}, {}>{
    render() {
        return (
            <div>
                <h1>Hello Server Side</h1>
                <Helmet
					htmlAttributes={{lang: "en", amp: undefined}} // amp takes no value
					titleTemplate="%s | React App"
					titleAttributes={{itemprop: "name", lang: "en"}}
					meta={[
                        { name: "description", content: "Server side rendering example" },
                        { name: "viewport", content: "width=device-width, initial-scale=1" },
                    ]}
                    link={
                        process.env.NODE_ENV === 'production' ? [{ href: "/static/styles.css", rel: "stylesheet" }] : undefined
                    }
				/>
                <Menu/>
                <Switch>
                    <Route exact path='/' component={HomePage}></Route>
                    <Route path='/about' component={AboutPage}></Route>
                </Switch>
            </div>
        );
    }
}
