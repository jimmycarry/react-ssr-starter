import * as React from 'react';
import { Helmet } from 'react-helmet';
const styles = require('./homepage.less');

export class HomePage extends React.Component<{}, {}>{
    render() {
        return (
            <div className={styles['container']} >
                <Helmet title={'welcome to our homepage'} />
                This is Home Page
            </div>
        )
    }
}
