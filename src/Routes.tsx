import { AboutPage } from '@src/containers/AboutPage';
import { HomePage } from '@src/containers/HomePage';
import { RouteProps } from 'react-router-dom';

export const ContainerRoutes: Array<RouteProps> = [
    {
        component: HomePage,
        path: '/',
        exact: true
    },
    {
        component: AboutPage,
        path: '/about'
    }
];
