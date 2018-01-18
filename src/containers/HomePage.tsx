import { IHomePageProps } from '@src/model/home-page/Store';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
const styles = require('./homepage.less');
const logo = require('../assets/logo.svg');

interface IProps {
    HomePage: IHomePageProps;
}

@inject('HomePage')
@observer
export class HomePage extends React.Component<IProps, {}> {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        // this.props.HomePage.changeTitle();
    }
    render() {
        return (

            <div className={styles['container']} >
                <Helmet
                    title={this.props.HomePage.title}
                    link={[
                        { rel: 'shortcut icon', href: require('../assets/favicon.ico') }
                    ]}

                />
                {this.props.HomePage.title}
                <img src={logo} />
            </div>

        );
    }
}
