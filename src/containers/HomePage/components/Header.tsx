import * as React from 'react';
const styles = require('./index.less');
interface IHeaderProps {
    title?: string ;
}

export class Header extends React.Component<IHeaderProps, {}> {
    render() {
        const { title } = this.props;
        return (
            <div className={styles['header-container']}>
                <div>
                    <img src={require('@src/assets/avatar.jpg')} className={styles['avatar']} />
                </div>
                <p>{title}</p>
            </div>
        );
    }
}
