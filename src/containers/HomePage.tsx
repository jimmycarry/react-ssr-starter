import * as React from 'react';
import { Helmet } from 'react-helmet';
const styles = require('./homepage.less');
const logo = require('../assets/logo.svg');

export class HomePage extends React.Component<{}, {}>{
    render() {
        return (
            <div className={styles['container']} >
                <Helmet
                    title={'welcome to our homepage'}
                    link={[
                        { rel: "shortcut icon", href: require('../assets/favicon.ico') }
                    ]}
                />
                This is Home Page Hello
                <img src={logo} />
            </div>
        )
    }
}
