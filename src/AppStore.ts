import { HomePageStore } from '@src/containers/HomePage/Store';

export interface IAppStore {
    HomePage?: HomePageStore;
}

export const appStore: IAppStore = {
    HomePage: new HomePageStore({})
};

export const Store = {
    HomePage: HomePageStore
};
