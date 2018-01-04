import * as React from 'react';
import { Helmet } from 'react-helmet';
import { observer, Provider, inject } from 'mobx-react';
import { HomePageProps } from '@src/model/home-page/Store';
const styles = require('./homepage.less');
const logo = require('../assets/logo.svg');

interface IProps{
    HomePage: HomePageProps;
}

@inject('HomePage')
@observer
export class HomePage extends React.Component<IProps, {}>{
    constructor(props) {
        super(props);
    }
    componentWillMount() {
    }
    render() {
        return (

            <div className={styles['container']} >
                <Helmet
                    title={this.props.HomePage.title}
                    link={[
                        { rel: "shortcut icon", href: require('../assets/favicon.ico') }
                    ]}

                >
                </Helmet>
                {this.props.HomePage.title}
                <img src={logo} />
            </div>

        );
    }
}
