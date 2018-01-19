import { IAppStore } from '@src/AppStore';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Header} from './components/Header';
import { IHomePageProps } from './Store';
const styles = require('./index.less');

interface IProps {
    HomePage: IHomePageProps;
    initialData: any;
}

@inject('HomePage')
@observer
export class HomePage extends React.Component<IProps, {}> {
    // 服务端预先处理数据的
    static async fetchData(appStore: IAppStore) {
        if (appStore.HomePage) {
            appStore.HomePage.changeTitle();
        }
        return Promise.resolve(null);
    }
    static defaultProps = {
        initialData: typeof window !== 'undefined' ? window['initialProps'] : undefined
    };
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        console.log(this.props);
        // this.props.HomePage.changeTitle();
    }
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (

            <div className={styles['container']} >
                <Helmet
                    title={this.props.HomePage.title}
                    link={[
                        { rel: 'shortcut icon', href: require('@src/assets/favicon.ico') }
                    ]}

                />
                <Header title={this.props.HomePage.title} />
            </div>

        );
    }
}
