import { RouteProps } from 'react-router-dom';
import { HomePage } from '@src/containers/HomePage';
import { AboutPage } from '@src/containers/AboutPage';

export const ContainerRoutes: Array<RouteProps> = [
    {
        component: HomePage,
        path: '/',
        exact: true,
    },
    {
        component: AboutPage,
        path: '/about',
    }
];
